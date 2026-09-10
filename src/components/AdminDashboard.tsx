import { useState } from 'react';
import { signOut } from '../lib/supabase';
import AdminArticles from './admin/AdminArticles';
import AdminEvents from './admin/AdminEvents';
import AdminExperience from './admin/AdminExperience';
import AdminAbout from './admin/AdminAbout';
import AdminContact from './admin/AdminContact';
import AdminLinks from './admin/AdminLinks';
import './AdminDashboard.css';

interface AdminDashboardProps {
  onLogout: () => void;
}

type Tab = 'articles' | 'events' | 'experience' | 'about' | 'contact' | 'links';

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('articles');
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    try {
      await signOut();
      onLogout();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const tabs: { id: Tab; label: string }[] = [
    { id: 'articles', label: 'Articles' },
    { id: 'events', label: 'Events' },
    { id: 'experience', label: 'Experience' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'links', label: 'Social Links' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-title">
          <h1>Portfolio Admin</h1>
          <p className="version">Content Management System</p>
        </div>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>

      <div className="admin-container">
        <nav className="admin-nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <main className="admin-content">
          {error && (
            <div className="error-banner">
              <span>{error}</span>
              <button onClick={() => setError(null)}>×</button>
            </div>
          )}

          {activeTab === 'articles' && <AdminArticles />}
          {activeTab === 'events' && <AdminEvents />}
          {activeTab === 'experience' && <AdminExperience />}
          {activeTab === 'about' && <AdminAbout />}
          {activeTab === 'contact' && <AdminContact />}
          {activeTab === 'links' && <AdminLinks />}
        </main>
      </div>
    </div>
  );
}
