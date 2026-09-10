import { useState, useEffect } from 'react';
import type { Event } from '../../lib/api';
import { eventsService } from '../../lib/api';
import '../admin/AdminCRUD.css';

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Event>>({
    title: '',
    description: '',
    location: '',
    role: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date().toISOString().split('T')[0],
    published: false,
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await eventsService.getAll(false);
      setEvents(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    setEditingId(event.id);
    setFormData(event);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      location: '',
      role: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date().toISOString().split('T')[0],
      published: false,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.title || !formData.start_date || !formData.end_date) {
        setError('Title, start date, and end date are required');
        return;
      }

      if (editingId) {
        await eventsService.update(editingId, formData);
      } else {
        await eventsService.create(formData as Omit<Event, 'id' | 'created_at' | 'updated_at'>);
      }

      await loadEvents();
      setShowForm(false);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventsService.delete(id);
      await loadEvents();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading events...</div>;

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Events</h2>
        <button onClick={handleAdd} className="btn-add">
          + New Event
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-modal">
          <div className="form-card">
            <h3>{editingId ? 'Edit Event' : 'New Event'}</h3>

            <div className="form-group">
              <label>Title *</label>
              <textarea
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Role</label>
              <input
                type="text"
                value={formData.role || ''}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="event-date-row">
              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="date"
                  value={formData.start_date || ''}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>End Date *</label>
                <input
                  type="date"
                  value={formData.end_date || ''}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                />
              </div>
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
              <th>Title</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Location</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title.substring(0, 50)}...</td>
                <td>{new Date(event.start_date).toLocaleDateString()}</td>
                <td>{new Date(event.end_date).toLocaleDateString()}</td>
                <td>{event.location || '-'}</td>
                <td>{event.published ? '✓' : '○'}</td>
                <td>
                  <button onClick={() => handleEdit(event)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(event.id)} className="btn-delete">
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
