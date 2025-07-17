import React, { useState } from 'react';
import axios from 'axios';

const UrlStats = () => {
  const [code, setCode] = useState('');
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    const res = await axios.get(`http://localhost:5000/shorten/${code}/stats`);
    setStats(res.data);
  };

  return (
    <div>
      <input placeholder="Enter short code" value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={fetchStats}>Get Stats</button>
      {stats && (
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      )}
    </div>
  );
};

export default UrlStats;
