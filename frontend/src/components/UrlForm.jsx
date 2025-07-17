import React, { useState, useEffect } from 'react';
import { useUrlContext } from '../context/UrlContext';

const UrlForm = ({ editingUrl, onSuccess, onCancel }) => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const { createUrl, updateUrl, error } = useUrlContext();

  useEffect(() => {
    if (editingUrl) {
      setUrl(editingUrl.url);
      setSuccess(null);
    } else {
      setUrl('');
      setSuccess(null);
    }
  }, [editingUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    let result;
    if (editingUrl) {
      result = await updateUrl(editingUrl.shortCode, url);
      if (result.success) setSuccess('Short URL updated!');
    } else {
      result = await createUrl(url);
      if (result.success) setSuccess('Short URL created!');
    }
    setLoading(false);
    if (result && result.success && onSuccess) onSuccess();
    if (result && result.success) setUrl('');
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
