const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const gs = require('github-scraper'); // Import the GitHub scraper module
const cors = require('cors'); // Import the CORS module
const app = express();

// Enable CORS for all routes
app.use(cors()); // This will allow all origins. You can configure it to restrict origins if needed.

// Function to extract username from GitHub URL
function extractUsernameFromUrl(githubUrl) {
  const regex = /https:\/\/github\.com\/([a-zA-Z0-9-_]+)/;
  const match = githubUrl.match(regex);
  return match ? match[1] : null;
}




async function scrapeGithub(username) {
    return new Promise((resolve, reject) => {
      gs(username, async (err, data) => {
        if (err) {
          reject({ error: `Error fetching data for user ${username}` });
        } else {
          // Log the data to check the response format
          console.log(`Data for ${username}:`, data);
  
          const repoCount = data.repos || 0;
          const latestRepo = repoCount > 0 ? data.repos[0] : null;
          const latestRepoUrl = latestRepo ? `https://github.com${latestRepo.url}` : 'No repos found';
  
          // Extract pinned repos names from the `pinned` array
          const pinnedRepos = data.pinned ? data.pinned.map(repo => repo.url.split('/').pop()) : [];
  
          // Construct the response in your desired format
          resolve({
            resident: data.name || 'Not available',
            revenue: repoCount,  // Total repositories
            detail: pinnedRepos[0],  // List of pinned repositories
          });
        }
      });
    });
  }
  

// Function to fetch data from the Google Script URL
async function fetchGithubDataFromUrl() {
  const url = "https://script.googleusercontent.com/macros/echo?user_content_key=UjdDWekGMvrt7PZqEcpfkrodn3AxQiUDLnurxQJ__et-EXrQJZO77vjdn7P3sRB_ChM2PecBJUAUHgkpgkxLG8jR4LWq9CJDm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnO7Y0HqfPJ1uvKPAmXx3KYjupmYCDMT-fWSchsxeA8gPFQwRzmcAglSWrChQcC315HC5MIpw9vlYx5yqL-ASxF5jxCNp0_PoHA&lib=M4rKszHCkuylmjzaMTVLOssMngc_g7vfE";
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    return { error: 'Failed to fetch data from the URL' };
  }
}

// Route to handle scraping multiple GitHub URLs and house names, saving the data to a JSON file
app.get('/scrape_multiple_github', async (req, res) => {
  // Fetch data from the Google Script URL
  const dataFromUrl = await fetchGithubDataFromUrl();
  
  // Check if the data is valid
  if (dataFromUrl.error) {
    return res.status(400).json({ error: dataFromUrl.error });
  }
  
  // Extract the GitHub URLs and house names
  const githubData = dataFromUrl.data || [];
  
  if (!githubData.length) {
    return res.status(400).json({ error: 'No GitHub data found in the response' });
  }

  const allUserData = [];

  // Loop through each GitHub URL, extract username and scrape data
  for (const entry of githubData) {
    const githubUrl = entry.url;
    const houseName = entry.house || 'Unknown House';  // Default house name

    if (githubUrl) {
      const username = extractUsernameFromUrl(githubUrl);
      if (username) {
        try {
          const userData = await scrapeGithub(username);
          userData.house = houseName;  // Add house_name to the user's data
          allUserData.push(userData);
        } catch (error) {
          allUserData.push({ error: `Failed to scrape data for user: ${username}` });
        }
      } else {
        allUserData.push({ error: `Invalid GitHub URL: ${githubUrl}` });
      }
    } else {
      allUserData.push({ error: 'GitHub URL is missing' });
    }
  }

  // Generate a filename based on the current date and time
  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '');
  const filePath = path.join(__dirname, `scraped_github_data_${timestamp}.json`);

  // Save the scraped data to a JSON file
  fs.writeFileSync(filePath, JSON.stringify(allUserData, null, 2));

  // Return a response with the file path and scraped data
  res.json({
    message: `Data scraped and saved to ${filePath}`,
    data: allUserData,
  });
});

// Start the server
const port = 3005;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
