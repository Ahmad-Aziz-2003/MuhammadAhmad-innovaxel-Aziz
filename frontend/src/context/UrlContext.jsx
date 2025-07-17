import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const UrlContext = createContext();

export const useUrlContext = () => useContext(UrlContext);

export const UrlProvider = ({ children }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [visitError, setVisitError] = useState(null);

  const fetchUrls = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/shorten`);
      setUrls(res.data);
    } catch (err) {
      setError('Failed to fetch URLs');
    }
    setLoading(false);
  }, []);

  const createUrl = async (url) => {
    setError(null);
    try {
      const res = await axios.post(`${API_BASE}/shorten`, { url });
      setUrls((prev) => [res.data, ...prev]);
      return { success: true, data: res.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
      return { success: false, error: err.response?.data?.message || 'Error occurred' };
    }
  };

  const updateUrl = async (shortCode, url) => {
    setError(null);
    try {
      const res = await axios.put(`${API_BASE}/shorten/${shortCode}`, { url });
      setUrls((prev) => prev.map((u) => (u.shortCode === shortCode ? res.data : u)));
      return { success: true, data: res.data };
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
      return { success: false, error: err.response?.data?.message || 'Error occurred' };
    }
  };

  const deleteUrl = async (shortCode) => {
    try {
      await axios.delete(`${API_BASE}/shorten/${shortCode}`);
      setUrls((prev) => prev.filter((u) => u.shortCode !== shortCode));
    } catch {
      setError('Delete failed');
    }
  };

  const visitUrl = async (shortCode) => {
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

  return (
    <UrlContext.Provider
      value={{
        urls,
        loading,
        error,
        visitError,
        fetchUrls,
        createUrl,
        updateUrl,
        deleteUrl,
        visitUrl,
        setVisitError,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
}; 