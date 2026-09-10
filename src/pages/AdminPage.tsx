import { useState, useEffect } from 'react';
import { getCurrentUser, onAuthStateChange } from '../lib/supabase';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminPage() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current user
    getCurrentUser()
      .then((u) => {
        setUser(u);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });

    // Subscribe to auth changes
    const subscription = onAuthStateChange((u) => {
      setUser(u);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Loading...</h2>
        </div>
      </div>
    );
  }

  return user ? (
    <AdminDashboard
      onLogout={() => {
        setUser(null);
        window.location.href = '/admin';
      }}
    />
  ) : (
    <AdminLogin
      onLoginSuccess={() => {
        window.location.reload();
      }}
    />
  );
}
