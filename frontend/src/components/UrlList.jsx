import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const UrlList = ({ onEdit, onShowStats }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visitError, setVisitError] = useState(null);

  const fetchUrls = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/shorten`);
      setUrls(res.data);
    } catch (err) {
      setError('Failed to fetch URLs');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (shortCode) => {
    if (!window.confirm('Delete this short URL?')) return;
    try {
      await axios.delete(`${API_BASE}/shorten/${shortCode}`);
      setUrls(urls.filter((u) => u.shortCode !== shortCode));
    } catch {
      alert('Delete failed');
    }
  };

  const handleVisit = async (shortCode) => {
    setVisitError(null);
    try {
      const res = await axios.get(`${API_BASE}/shorten/${shortCode}`);
      if (res.data && res.data.url) {
        window.open(res.data.url, '_blank');
      } else {
        setVisitError('Original URL not found.');
      }
    } catch (err) {
      setVisitError('Failed to retrieve original URL.');
    }
  };

  if (loading) return <div className="text-center py-4 text-blue-600">Loading...</div>;
  if (error) return <div className="text-blue-600 bg-blue-50 rounded px-2 py-1">{error}</div>;
  if (!urls.length) return <div className="text-gray-400 text-center">No URLs found.</div>;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4 text-blue-600">Your Short URLs</h2>
      {visitError && <div className="text-blue-600 bg-blue-50 rounded px-2 py-1 mb-2">{visitError}</div>}
      <div className="space-y-4">
        {urls.map((url) => (
          <div key={url.shortCode} className="bg-gray-100 border border-gray-200 shadow-sm p-4 rounded-lg flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <div className="font-mono text-base text-blue-600">{url.shortCode}</div>
              <div className="text-xs text-gray-400">Created: {new Date(url.createdAt).toLocaleString()}</div>
            </div>
            <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm" onClick={() => handleVisit(url.shortCode)}>Visit</button>
              <button className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded text-sm" onClick={() => onEdit(url)}>Edit</button>
              <button className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded text-sm" onClick={() => onShowStats(url.shortCode)}>Stats</button>
              <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-blue-600 rounded text-sm" onClick={() => handleDelete(url.shortCode)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlList; 