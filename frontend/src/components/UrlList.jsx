import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const UrlList = ({ onEdit, onShowStats }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const handleCopy = (shortCode) => {
    navigator.clipboard.writeText(`${window.location.origin}/${shortCode}`);
    alert('Short URL copied!');
  };

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!urls.length) return <div className="text-gray-500">No URLs found.</div>;

  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Your Short URLs</h2>
      <div className="space-y-4">
        {urls.map((url) => (
          <div key={url.shortCode} className="bg-white shadow p-4 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <div className="font-mono text-sm text-blue-600">{url.shortCode}</div>
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => window.open(url.url, '_blank')}>Visit</button>
              <button className="px-2 py-1 bg-gray-200 rounded" onClick={() => handleCopy(url.shortCode)}>Copy</button>
              <button className="px-2 py-1 bg-green-500 text-white rounded" onClick={() => onEdit(url)}>Edit</button>
              <button className="px-2 py-1 bg-purple-500 text-white rounded" onClick={() => onShowStats(url.shortCode)}>Stats</button>
              <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(url.shortCode)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlList; 