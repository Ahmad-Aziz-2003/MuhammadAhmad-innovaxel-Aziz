import React, { useEffect } from 'react';
import { useUrlContext } from '../context/UrlContext';

const UrlList = ({ onEdit, onShowStats }) => {
  const {
    urls,
    loading,
    error,
    visitError,
    fetchUrls,
    deleteUrl,
    visitUrl,
    setVisitError,
  } = useUrlContext();

  useEffect(() => {
    fetchUrls();
    // Clear visit error on mount
    setVisitError(null);
    // eslint-disable-next-line
  }, []);

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
              <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm" onClick={() => visitUrl(url.shortCode)}>Visit</button>
              <button className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded text-sm" onClick={() => onEdit(url)}>Edit</button>
              <button className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded text-sm" onClick={() => onShowStats(url.shortCode)}>Stats</button>
              <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-blue-600 rounded text-sm" onClick={() => deleteUrl(url.shortCode)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UrlList; 