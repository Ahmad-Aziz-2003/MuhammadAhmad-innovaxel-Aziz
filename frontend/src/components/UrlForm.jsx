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
    <div className="bg-white shadow p-4 rounded mb-6 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          className="border rounded px-3 py-2 focus:outline-none focus:ring"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter long URL"
          required
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {editingUrl ? 'Update' : 'Shorten'}
          </button>
          {editingUrl && (
            <button type="button" className="bg-gray-300 px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
          )}
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
      </form>
    </div>
  );
};

export default UrlForm;
