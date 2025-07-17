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
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative border border-gray-200">
        <div className="bg-blue-600 rounded-t-lg px-6 py-3 flex items-center justify-between">
          <h3 className="text-white text-lg font-semibold">URL Statistics</h3>
          <button aria-label="Close" className="text-white text-2xl font-bold hover:text-blue-200" onClick={onClose}>&times;</button>
        </div>
        <div className="p-6">
          {loading && <div className="text-blue-600">Loading...</div>}
          {error && <div className="text-blue-600 bg-blue-50 rounded px-2 py-1">{error}</div>}
          {stats && (
            <div className="space-y-2 text-gray-800">
              <div><span className="font-semibold text-blue-600">Short Code:</span> <span className="font-mono">{stats.shortCode}</span></div>
              <div><span className="font-semibold text-blue-600">Original URL:</span> <span className="break-all">{stats.url}</span></div>
              <div><span className="font-semibold text-blue-600">Created:</span> {new Date(stats.createdAt).toLocaleString()}</div>
              <div><span className="font-semibold text-blue-600">Updated:</span> {new Date(stats.updatedAt).toLocaleString()}</div>
              <div><span className="font-semibold text-blue-600">Access Count:</span> {stats.accessCount}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UrlStats;
