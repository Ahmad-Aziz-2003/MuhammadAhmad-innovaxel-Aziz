import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const UrlStats = ({ shortCode, onClose }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shortCode) return;
    setLoading(true);
    setError(null);
    setStats(null);
    axios.get(`${API_BASE}/shorten/${shortCode}/stats`)
      .then(res => setStats(res.data))
      .catch(() => setError('Failed to fetch stats'))
      .finally(() => setLoading(false));
  }, [shortCode]);

  if (!shortCode) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        <h3 className="text-lg font-semibold mb-4">URL Statistics</h3>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {stats && (
          <div className="space-y-2">
            <div><span className="font-semibold">Short Code:</span> <span className="font-mono">{stats.shortCode}</span></div>
            <div><span className="font-semibold">Original URL:</span> <span className="break-all">{stats.url}</span></div>
            <div><span className="font-semibold">Created:</span> {new Date(stats.createdAt).toLocaleString()}</div>
            <div><span className="font-semibold">Updated:</span> {new Date(stats.updatedAt).toLocaleString()}</div>
            <div><span className="font-semibold">Access Count:</span> {stats.accessCount}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlStats;
