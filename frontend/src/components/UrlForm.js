import React, { useState } from 'react';
import axios from 'axios';

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/shorten', { url });
    setResult(res.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Enter long URL" />
        <button type="submit">Shorten</button>
      </form>
      {result && (
        <div>
          <p>Short URL Code: <strong>{result.shortCode}</strong></p>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
