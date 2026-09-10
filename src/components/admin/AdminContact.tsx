import { useState, useEffect } from 'react';
import type { Contact } from '../../lib/api';
import { contactService } from '../../lib/api';
import '../admin/AdminCRUD.css';

export default function AdminContact() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Contact>>({
    email: '',
    institution: '',
    address: '',
    published: false,
  });

  useEffect(() => {
    loadContact();
  }, []);

  const loadContact = async () => {
    try {
      setLoading(true);
      const data = await contactService.get(false);
      if (data) {
        setContact(data);
        setFormData(data);
      } else {
        setFormData({
          email: '',
          institution: '',
          address: '',
          published: false,
        });
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const saved = await contactService.upsert({
        email: formData.email || '',
        institution: formData.institution || '',
        address: formData.address || '',
        published: formData.published || false,
      });
      setContact(saved);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading contact...</div>;

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Contact</h2>
        <button onClick={handleSave} className="btn-add" disabled={saving}>
          {saving ? 'Saving...' : '✓ Save'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-card" style={{ maxWidth: '600px' }}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="contact@example.com"
          />
        </div>

        <div className="form-group">
          <label>Institution</label>
          <input
            type="text"
            value={formData.institution || ''}
            onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
            placeholder="Your Institution"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            value={formData.address || ''}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            placeholder="Full address"
          />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              checked={formData.published || false}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            />
            Published
          </label>
        </div>

        <div style={{ color: '#999', fontSize: '12px', marginTop: '10px' }}>
          Last updated:{' '}
          {contact ? new Date(contact.updated_at).toLocaleString() : 'Never'}
        </div>
      </div>
    </div>
  );
}
