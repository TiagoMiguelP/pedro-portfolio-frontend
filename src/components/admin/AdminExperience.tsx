import { useState, useEffect } from 'react';
import type { Experience } from '../../lib/api';
import { experiencesService } from '../../lib/api';
import '../admin/AdminCRUD.css';

export default function AdminExperience() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Experience>>({
    position: '',
    location: '',
    description: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    published: false,
  });

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await experiencesService.getAll(false);
      setExperiences(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id);
    setFormData(experience);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      position: '',
      location: '',
      description: '',
      start_date: new Date().toISOString().split('T')[0],
      end_date: '',
      published: false,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.position || !formData.start_date) {
        setError('Position and start date are required');
        return;
      }

      if (editingId) {
        await experiencesService.update(editingId, formData);
      } else {
        await experiencesService.create(formData as Omit<Experience, 'id' | 'created_at' | 'updated_at'>);
      }

      await loadExperiences();
      setShowForm(false);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;
    try {
      await experiencesService.delete(id);
      await loadExperiences();
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading experiences...</div>;

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Experience</h2>
        <button onClick={handleAdd} className="btn-add">
          + New Experience
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-modal">
          <div className="form-card">
            <h3>{editingId ? 'Edit Experience' : 'New Experience'}</h3>

            <div className="form-group">
              <label>Position *</label>
              <input
                type="text"
                value={formData.position || ''}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
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

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                <label>End Date</label>
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
              <th>Position</th>
              <th>Location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((experience) => (
              <tr key={experience.id}>
                <td>{experience.position}</td>
                <td>{experience.location || '-'}</td>
                <td>{new Date(experience.start_date).toLocaleDateString()}</td>
                <td>{experience.end_date ? new Date(experience.end_date).toLocaleDateString() : '-'}</td>
                <td>{experience.published ? '✓' : '○'}</td>
                <td>
                  <button onClick={() => handleEdit(experience)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(experience.id)} className="btn-delete">
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
