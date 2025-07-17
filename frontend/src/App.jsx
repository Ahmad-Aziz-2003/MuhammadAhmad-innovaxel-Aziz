import React, { useState } from "react";
import UrlForm from "./components/UrlForm";
import UrlList from "./components/UrlList";
import UrlStats from "./components/UrlStats";
import { UrlProvider } from "./context/UrlContext";

function App() {
  const [editingUrl, setEditingUrl] = useState(null);
  const [statsCode, setStatsCode] = useState(null);
  const [refreshList, setRefreshList] = useState(false);

  const handleEdit = (url) => setEditingUrl(url);
  const handleStats = (shortCode) => setStatsCode(shortCode);
  const handleFormSuccess = () => {
    setEditingUrl(null);
    setRefreshList((r) => !r);
  };
  const handleCancelEdit = () => setEditingUrl(null);
  const handleCloseStats = () => setStatsCode(null);

  return (
    <UrlProvider>
      <div className="min-h-screen bg-gray-50 py-8 px-2 md:px-0">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">URL Shortener</h1>
          <UrlForm
            editingUrl={editingUrl}
            onSuccess={handleFormSuccess}
            onCancel={handleCancelEdit}
          />
          <UrlList
            key={refreshList}
            onEdit={handleEdit}
            onShowStats={handleStats}
          />
          {statsCode && (
            <UrlStats shortCode={statsCode} onClose={handleCloseStats} />
          )}
        </div>
      </div>
    </UrlProvider>
  );
}

export default App;
