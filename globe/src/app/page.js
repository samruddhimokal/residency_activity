"use client"

import React, { useState, useEffect, memo } from 'react';
import { ChevronDown,ChevronUp,TrendingUp, GitBranch, DollarSign, Users, Award, MessageCircle, Heart, Repeat2, Rotate3dIcon } from 'lucide-react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { constants } from 'buffer';
import GlobeWithArcs from './Prathvi'

  
const HOUSE_COLORS = {
  "Pioneer House": "text-blue-400",
  "Innovator House": "text-purple-400",
  "Creator House": "text-pink-400",
  "Builder House": "text-orange-400",
  "Maker House": "text-green-400",
  "Founder House": "text-indigo-400",
  "Visionary House": "text-red-400"
};
const SAMPLE_TWEETS = [
  "Just launched a new project! 🚀",
"Collaborating on an exciting initiative 🤝",
"Made significant progress today 📈",
"Working on something special ✨",
"Great team meeting today! 💡",
"Exploring new ideas for innovation 🌟",
"Wrapping up a productive week! 🙌",
];

const STATIC_APPLICATIONS = [
  { house: "Pioneer House", value: 523, detail: "Active Applications", change: 12 },
  { house: "Innovator House", value: 1331, detail: "Active Applications", change: -5 },
  { house: "Creator House", value: 481, detail: "Active Applications", change: 8 },
  { house: "Builder House", value: 311, detail: "Active Applications", change: 3 },
  { house: "Maker House", value: 704, detail: "Active Applications", change: -2 },
  { house: "Founder House", value: 831, detail: "Active Applications", change: 6 },
  { house: "Visionary House", value: 1391, detail: "Active Applications", change: 15 }
];





const LeaderboardCard = ({ title, data, showRank = true }) => {
  const [sortedData, setSortedData] = useState([]);
  
  useEffect(() => {
    if (!Array.isArray(data)) {
      console.error('Data is not iterable:', data);
      setSortedData([]); // Fallback to an empty array
      return;
    }
  
    const sortData = () => {
      const newData = [...data].sort((a, b) => {
        const valueA = typeof a.revenue === 'string'
          ? Number(a.revenue.replace(/[^0-9.-]+/g, ""))
          : Number(a.revenue);
        const valueB = typeof b.revenue === 'string'
          ? Number(b.revenue.replace(/[^0-9.-]+/g, ""))
          : Number(b.revenue);
        return valueB - valueA;
      });
      setSortedData(newData);
    };
  
    sortData();
  }, [data]);
  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-8 relative">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-medium text-gray-100">{title}</h2>
        </div>
      </div>
      <div className="grid gap-4 max-h-[470px] overflow-y-auto pr-2" style={{  scrollbarColor: "#000011" }}>
        {sortedData.map((item, index) => (
          <div
            key={item.name}
            className="group flex items-start justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
            style={{ minHeight: '80px' }}
          >
            <div className="flex items-start gap-4">
              {showRank && (
                <div className="text-gray-500 font-mono w-6 pt-1">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
              )}
              <div className="flex-1">
                <div className="font-medium text-gray-100 mb-1">
                  {showRank ? item.resident : item.house}
                </div>
                <div className={`text-sm ${HOUSE_COLORS[item.house]}`}>
                  {showRank ? item.house : item.detail}
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-mono font-semibold text-gray-100 mb-1">
                {typeof item.revenue === 'number' ? `$${item.revenue.toLocaleString()}` : item.revenue}
                {typeof item.change !== 'undefined' && (
                  <span
                    className={`ml-2 text-sm ${item.change > 0 ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {item.change > 0 ? '↑' : '↓'} {Math.abs(item.change)}%
                  </span>
                )}
              </div>
              {showRank && <div className="text-sm text-gray-400">{item.detail}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
LeaderboardCard.displayName = 'LeaderboardCard';

const LeaderboardCard1 = ({ title, data, showRank = true }) => {
  const [sortedData, setSortedData] = useState([]);
  
  useEffect(() => {
    if (!Array.isArray(data)) {
      console.error('Data is not iterable:', data);
      setSortedData([]); // Fallback to an empty array
      return;
    }
  
    const sortData = () => {
      const newData = [...data].sort((a, b) => {
        const valueA = typeof a.revenue === 'string'
          ? Number(a.revenue.replace(/[^0-9.-]+/g, ""))
          : Number(a.revenue);
        const valueB = typeof b.revenue === 'string'
          ? Number(b.revenue.replace(/[^0-9.-]+/g, ""))
          : Number(b.revenue);
        return valueB - valueA;
      });
      setSortedData(newData);
    };
  
    sortData();
  }, [data]);
  return (
    <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-xl p-8 relative">
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-blue-400" />
          <h2 className="text-xl font-medium text-gray-100">{title}</h2>
        </div>
      </div>
      <div className="grid gap-4 max-h-[470px] overflow-y-auto pr-2" style={{  scrollbarColor: "#000011" }}>
        {sortedData.map((item, index) => (
          
          <div 
          
            key={item.name}
            className="group flex items-start justify-between p-3 hover:bg-gray-800/50 rounded-lg transition-colors duration-200"
            style={{ minHeight: '80px' }}
          >
            <div className="flex items-start gap-4">
              {showRank && (
                <div className="text-gray-500 font-mono w-6 pt-1">
                  {(index + 1).toString().padStart(2, '0')}
                </div>
              )}
              <div className="flex-1">
                <div className="font-medium text-gray-100 mb-1">
                  {showRank ? item.resident : item.house}
                </div>
                <div className={`text-sm ${HOUSE_COLORS[item.house]}`}>
                  {showRank ? item.house : item.detail}
                </div>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className="font-mono font-semibold text-gray-100 mb-1">
                {typeof item.revenue === 'number' ? `${item.revenue.toLocaleString()}` : item.revenue}
                {typeof item.change !== 'undefined' && (
                  <span
                    className={`ml-2 text-sm ${item.change > 0 ? 'text-green-400' : 'text-red-400'}`}
                  >
                    {item.change > 0 ? '↑' : '↓'} {Math.abs(item.change)}%
                  </span>
                )}
              </div>
              {showRank && <div className="text-sm text-gray-400">{item.detail}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
LeaderboardCard1.displayName = 'LeaderboardCard1';

const TwitterFeed = memo(() => {
  const tweets = [
    {
      id: 1,
      author: "Ash",
      handle: "@0xAbilash",
      content: "Meeet PixelPal AI",
     
      likes: 11,
      retweets: 2,
      replies: 6
    },
    {
      id: 2,
      author: "Gleb Razgar",
      handle: "@project_gleb",
      content: "Hats off to @_TheResidency for helping bring the hacker house together.",
     
      likes: 47,
      retweets: 5,
      replies: 6
    },
    {
      id: 3,
      author: "Vikrant Patankar",
      handle: "@vikr13nt",
      content: "Playing with hundreds of millions of dollars",
      
      likes: 1,
      retweets: 0,
      replies: 0
    }
  ];

  return (
    <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-8 border border-gray-800">
      <div className="flex items-center gap-3 mb-6">
        <MessageCircle className="h-6 w-6 text-blue-400" />
        <h2 className="text-xl font-medium text-gray-100">Latest Updates</h2>
      </div>
      <div className="space-y-6">
        {tweets.map((tweet) => (
          <div key={tweet.id} className="border-b border-gray-800 pb-6 last:border-0 last:pb-0">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                <span className="text-sm font-bold">{tweet.author[0]}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{tweet.author}</span>
                  <span className="text-gray-500 text-sm">{tweet.handle}</span>
                  <span className="text-gray-500 text-sm">·</span>
                  <span className="text-gray-500 text-sm">{tweet.timestamp}</span>
                </div>
                <p className="mt-2 text-gray-100">{tweet.content}</p>
                <div className="flex items-center gap-6 mt-4">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-400 transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm">{tweet.replies}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-green-400 transition-colors">
                    <Repeat2 className="h-4 w-4" />
                    <span className="text-sm">{tweet.retweets}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-red-400 transition-colors">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">{tweet.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

TwitterFeed.displayName = 'TwitterFeed';

export default function DashboardDemo() {

  const [residences, setResidences] = useState([]);
  const [grants, setGrants] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [house, setHouse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gitData, setGitData] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const links = {
      residents: 'https://script.googleusercontent.com/macros/echo?user_content_key=_Hn7XQ1Tz05t8KFXVgC0XcOv9qqR82x5fPeJhorGztcnQFSeMkm0x3JMUjBAfXDvAd6SGSSdHo8j6g9a5chj0BneMvC-6aSYm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCRfytznPhufLoQ0A_qwCpAWuu2yCiWw02b8C_JplW3M-BaFmpSV9dMvgTYx5Jpj8xtXuny5gyM0ohIgDacCEvpsCbtnK4XfiQ&lib=MHFQDdH3kqbOE-evStmhhjMMngc_g7vfE',
      grants: 'https://script.google.com/macros/s/AKfycbxO6pSArxbJy9hh1lXDqcTQCcoaGr3Xa53UGuUYUWSQQBh-WlI8K2gbHvto5oL0L0yY/exec',
      investments: 'https://script.google.com/macros/s/AKfycbwl-7uKWzTPUNV6btxMrUSj0efWo9-41kVx-3bnpwVopxRXirGwrAJpz9GVID60JuMt3Q/exec',
      houses:"https://script.googleusercontent.com/macros/echo?user_content_key=yawgMUS-uaIkd004IryvhN9GHffMhci-DKAf6R-5_f6lEDiA8y9WtSuJMeyWIHuAvyIX7B14w6gRcIadzZtDL302RlAfwQlpm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnNPEugizz5HSeF_ttZuLgpWwLpxgsEw7rR4meR5_67XptVCgKPgonMioIYdmfER9kIhC2x9LEUuyC_FnVo9zHNE2yrPrPF3qgtz9Jw9Md8uu&lib=MpWCmBbv8BIEZ-C71fGN3YX7dSxyY7qhE",
     git:"http://localhost:3005/scrape_multiple_github"
    };

    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          fetch(links.residents),
          fetch(links.grants),
          fetch(links.investments),
          fetch(links.houses),
          fetch(links.git),
        ]);

        // Check if all responses are ok
        responses.forEach((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch data from one or more links');
          }
        });

        // Parse JSON for all responses
        const data = await Promise.all(responses.map((response) => response.json()));
        

        // Assign the data
        setResidences(data[0]); // Residents data
        setGrants(data[1]);     // Grants data
        setInvestments(data[2]); // Investments data
        setHouse(data[3]); // Revenue data
        setGitData(data[4].data); // Revenue data
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const dataA = Array.isArray(residences.allResidents) ? residences.allResidents : [];
  const dataB = Array.isArray(grants.allResidents) ? grants.allResidents : [];
  const dataC = Array.isArray(investments.allResidents) ? investments.allResidents : [];
  const dataD = Array.isArray(house.allResidents) ? house.allResidents : [];
  
  console.log(gitData)


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const topRevenue = [
    { name: "Alpha Team", house: "Pioneer House", value: "$1,234,567", change: 12, detail: "45 projects" },
    { name: "Beta Squad", house: "Innovator House", value: "$987,654", change: -5, detail: "38 projects" },
    { name: "Gamma Group", house: "Creator House", value: "$876,543", change: 8, detail: "42 projects" },
    { name: "Delta Force", house: "Builder House", value: "$765,432", change: 3, detail: "35 projects" },
    { name: "Epsilon Unit", house: "Maker House", value: "$654,321", change: -2, detail: "31 projects" }
  ];

  const topGrants = [
    { name: "Research X", house: "Visionary House", value: "$300,000", change: 15, detail: "AI Research" },
    { name: "Project Y", house: "Founder House", value: "$450,000", change: 7, detail: "Blockchain" },
    { name: "Initiative Z", house: "Pioneer House", value: "$400,000", change: -3, detail: "Climate Tech" },
    { name: "Program A", house: "Creator House", value: "$350,000", change: 5, detail: "Biotech" },
    { name: "Study B", house: "Innovator House", value: "$500,000", change: 10, detail: "Quantum Computing" }
  
  ];

  const topInvestments = [
    { name: "Venture 1", house: "Builder House", value: "$2,000,000", change: 20, detail: "Series A" },
    { name: "Startup 2", house: "Maker House", value: "$1,500,000", change: -8, detail: "Seed Round" },
    { name: "Company 3", house: "Visionary House", value: "$1,200,000", change: 15, detail: "Series B" },
    { name: "Project 4", house: "Founder House", value: "$900,000", change: 6, detail: "Angel Round" },
    { name: "Enterprise 5", house: "Pioneer House", value: "$800,000", change: -4, detail: "Pre-seed" }
  ];

  const topGitHub = [
    { resident: "Basim Al Harbi", house: "Arcadia",   detail: "commando" },
    { resident: "Paritosh Kulkarni", house: "Arcadia",   detail: "antiaging_app" },
    { resident: "Abilash Senthilkumar", house: "Bangalore",   detail: "InstaAR-Augmented-Reality" },
    { resident: "Pulkit Garg", house: "Bangalore",  detail: "openai-swarm-node" },
    { resident: "Nirbhay Singh Narang", house: "New York",   detail: "InvenTree-iOS" }
  ];

 
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <main className="p-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-medium text-gray-100 mb-2">Global House Activity</h1>
          <p className="text-lg text-gray-400">Real-time performance metrics</p>
        </div>

        {/* <Globe /> */}
        <GlobeWithArcs/>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <LeaderboardCard
            title="Top Revenue"
            icon={<TrendingUp />}
            data={dataA}
          />
          <LeaderboardCard
            title="Top Grants"
            icon={<Award />}
            data={dataB}
          />
          <LeaderboardCard
            title="Top Investments"
            icon={<DollarSign />}
            data={dataC}
          />
          <LeaderboardCard1
                title="Top GitHub Activity"
            icon={<GitBranch />}
            data={gitData}
          />
          <div className="md:col-span-2">
            <LeaderboardCard
              title="Applications by House"
              icon={<Users />}
              data={STATIC_APPLICATIONS}
              showRank={false}
            />
          </div>
          
        </div>
      </main>
    </div>
  );
}























