import { useState, useEffect } from 'react';
import type { About } from '../../lib/api';
import { aboutService } from '../../lib/api';
import '../admin/AdminCRUD.css';

export default function AdminAbout() {
  const [about, setAbout] = useState<About | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<any>({
    content: '',
    published: false,
  });

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      setLoading(true);
      const data = await aboutService.get(false);
      if (data) {
        setAbout(data);
        setFormData({
          content: data.content,
          published: data.published,
        });
      } else {
        setFormData({
          content: '',
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
      if (!formData.content) {
        setError('Content is required');
        return;
      }

      setSaving(true);
      const saved = await aboutService.upsert(formData.content, formData.published);
      setAbout(saved);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading about page...</div>;

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>About</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleSave} className="btn-add" disabled={saving}>
            {saving ? 'Saving...' : '✓ Save'}
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-card" style={{ maxWidth: '800px' }}>
        <div className="form-group">
          <label>Content (HTML or Markdown-style) *</label>
          <textarea
            value={formData.content || ''}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            style={{ minHeight: '300px' }}
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
          {about ? new Date(about.updated_at).toLocaleString() : 'Never'}
        </div>
      </div>
    </div>
  );
}
