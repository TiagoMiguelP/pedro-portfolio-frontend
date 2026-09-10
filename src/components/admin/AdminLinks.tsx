import { useState, useEffect } from 'react';
import type { SocialLink } from '../../lib/api';
import { socialLinksService } from '../../lib/api';
import '../admin/AdminCRUD.css';

export default function AdminLinks() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<SocialLink>>({
    name: '',
    url: '',
    icon_url: '',
    order_index: 0,
    published: false,
  });

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      setLoading(true);
      const data = await socialLinksService.getAll(false);
      setLinks(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (link: SocialLink) => {
    setEditingId(link.id);
    setFormData(link);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      url: '',
      icon_url: '',
      order_index: links.length,
      published: false,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.name || !formData.url) {
        setError('Name and URL are required');
        return;
      }

      if (editingId) {
        await socialLinksService.update(editingId, formData);
      } else {
        await socialLinksService.create(formData as Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>);
      }

      await loadLinks();
      setShowForm(false);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this link?')) return;
    try {
      await socialLinksService.delete(id);
      await loadLinks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const newLinks = [...links];
    [newLinks[index - 1].order_index, newLinks[index].order_index] = [
      newLinks[index].order_index,
      newLinks[index - 1].order_index,
    ];
    try {
      await socialLinksService.reorder(
        newLinks.map((l) => ({ id: l.id, order_index: l.order_index }))
      );
      await loadLinks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index === links.length - 1) return;
    const newLinks = [...links];
    [newLinks[index].order_index, newLinks[index + 1].order_index] = [
      newLinks[index + 1].order_index,
      newLinks[index].order_index,
    ];
    try {
      await socialLinksService.reorder(
        newLinks.map((l) => ({ id: l.id, order_index: l.order_index }))
      );
      await loadLinks();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading social links...</div>;

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Social Links</h2>
        <button onClick={handleAdd} className="btn-add">
          + New Link
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-modal">
          <div className="form-card">
            <h3>{editingId ? 'Edit Link' : 'New Social Link'}</h3>

            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., LinkedIn"
              />
            </div>

            <div className="form-group">
              <label>URL *</label>
              <input
                type="url"
                value={formData.url || ''}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div className="form-group">
              <label>Icon URL</label>
              <input
                type="url"
                value={formData.icon_url || ''}
                onChange={(e) => setFormData({ ...formData, icon_url: e.target.value })}
                placeholder="https://example.com/icon.png"
              />
            </div>

            {formData.icon_url && (
              <div className="form-group">
                <label>Preview</label>
                <img
                  src={formData.icon_url}
                  alt="Icon preview"
                  style={{ height: '40px', width: '40px', objectFit: 'contain' }}
                />
              </div>
            )}

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

            <div className="form-actions">
              <button onClick={handleSave} className="btn-primary">
                Save
              </button>
              <button onClick={() => setShowForm(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th>Icon</th>
              <th>Published</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, index) => (
              <tr key={link.id}>
                <td>{link.name}</td>
                <td>
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    {link.url.substring(0, 40)}...
                  </a>
                </td>
                <td>
                  {link.icon_url && (
                    <img
                      src={link.icon_url}
                      alt={link.name}
                      style={{ height: '24px', width: '24px', objectFit: 'contain' }}
                    />
                  )}
                </td>
                <td>{link.published ? '✓' : '○'}</td>
                <td style={{ fontSize: '12px' }}>
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="btn-small"
                    style={{ marginRight: '4px' }}
                  >
                    ↑
                  </button>
                  <button onClick={() => handleMoveDown(index)} disabled={index === links.length - 1} className="btn-small">
                    ↓
                  </button>
                </td>
                <td>
                  <button onClick={() => handleEdit(link)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(link.id)} className="btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
