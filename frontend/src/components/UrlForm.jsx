import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const UrlForm = ({ editingUrl, onSuccess, onCancel }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (editingUrl) {
      setUrl(editingUrl.url);
      setSuccess(null);
      setError(null);
    } else {
      setUrl('');
      setSuccess(null);
      setError(null);
    }
  }, [editingUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      let res;
      if (editingUrl) {
        res = await axios.put(`${API_BASE}/shorten/${editingUrl.shortCode}`, { url });
        setSuccess('Short URL updated!');
      } else {
        res = await axios.post(`${API_BASE}/shorten`, { url });
        setSuccess('Short URL created!');
      }
      setUrl('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-lg mx-auto border border-gray-100">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          className="border border-gray-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-100 text-gray-800 placeholder-gray-400"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL here..."
          required
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition disabled:opacity-50"
            disabled={loading}
          >
            {editingUrl ? 'Update URL' : 'Shorten URL'}
          </button>
          {editingUrl && (
            <button type="button" className="bg-gray-200 text-gray-700 px-5 py-2 rounded hover:bg-gray-300" onClick={onCancel}>Cancel</button>
          )}
        </div>
        {error && <div className="text-sm text-blue-600 bg-blue-50 rounded px-2 py-1">{error}</div>}
        {success && <div className="text-sm text-blue-600 bg-blue-50 rounded px-2 py-1">{success}</div>}
      </form>
    </div>
  );
};

export default UrlForm;
