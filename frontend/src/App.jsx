import React from 'react';
import UrlForm from './components/UrlForm';
import UrlStats from './components/UrlStats';

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>URL Shortener</h1>
      <UrlForm />
      <UrlStats />
    </div>
  );
}

export default App;
