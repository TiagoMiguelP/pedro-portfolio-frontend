import { useState, useEffect } from 'react';
import type { Article, Author } from '../../lib/api';
import { articlesService } from '../../lib/api';
import '../admin/AdminCRUD.css';

type AuthorFormData = Omit<Author, 'id' | 'order_index'>;
type ArticleFormData = Omit<Partial<Article>, 'authors'> & { authors: AuthorFormData[] };

export default function AdminArticles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: '',
    journal: '',
    pdf_url: '',
    pdf_link: '',
    doi: '',
    date: new Date().toISOString().split('T')[0],
    published: false,
    authors: [],
  });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const data = await articlesService.getAll(false);
      setArticles(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (article: Article) => {
    setEditingId(article.id);
    setFormData({
      ...article,
      authors: article.authors?.map(({ name, link }) => ({ name, link })) || [],
    });
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      journal: '',
      pdf_url: '',
      pdf_link: '',
      doi: '',
      date: new Date().toISOString().split('T')[0],
      published: false,
      authors: [],
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (!formData.title || !formData.date) {
        setError('Title and date are required');
        return;
      }

      const articleData = {
        title: formData.title,
        journal: formData.journal,
        pdf_url: formData.pdf_url,
        pdf_link: formData.pdf_link,
        doi: formData.doi,
        date: formData.date,
        published: formData.published || false,
      };

      if (editingId) {
        await articlesService.update(editingId, articleData, formData.authors);
      } else {
        await articlesService.create(articleData, formData.authors);
      }

      await loadArticles();
      setShowForm(false);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await articlesService.delete(id);
      await loadArticles();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleAddAuthor = () => {
    setFormData({
      ...formData,
      authors: [...(formData.authors || []), { name: '', link: '' }],
    });
  };

  const handleRemoveAuthor = (index: number) => {
    const newAuthors = formData.authors?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, authors: newAuthors });
  };

  const handleAuthorChange = (index: number, field: string, value: string) => {
    const newAuthors = [...(formData.authors || [])];
    newAuthors[index] = { ...newAuthors[index], [field]: value };
    setFormData({ ...formData, authors: newAuthors });
  };

  if (loading) return <div className="loading">Loading articles...</div>;

  return (
    <div className="crud-container">
      <div className="crud-header">
        <h2>Articles</h2>
        <button onClick={handleAdd} className="btn-add">
          + New Article
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-modal">
          <div className="form-card">
            <h3>{editingId ? 'Edit Article' : 'New Article'}</h3>

            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Journal</label>
              <input
                type="text"
                value={formData.journal || ''}
                onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>DOI</label>
              <input
                type="text"
                value={formData.doi || ''}
                onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>PDF Link</label>
              <input
                type="text"
                value={formData.pdf_link || ''}
                onChange={(e) => setFormData({ ...formData, pdf_link: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>PDF URL</label>
              <input
                type="text"
                value={formData.pdf_url || ''}
                onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
              />
            </div>

            <div className="form-section">
              <div className="section-header">
                <h4>Authors</h4>
                <button type="button" onClick={handleAddAuthor} className="btn-small">
                  + Add Author
                </button>
              </div>

              {formData.authors?.map((author, idx) => (
                <div key={idx} className="author-row">
                  <input
                    type="text"
                    placeholder="Author name"
                    value={author.name}
                    onChange={(e) => handleAuthorChange(idx, 'name', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Author link (optional)"
                    value={author.link || ''}
                    onChange={(e) => handleAuthorChange(idx, 'link', e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveAuthor(idx)}
                    className="btn-danger-small"
                  >
                    Remove
                  </button>
                </div>
              ))}
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
              <th>Date</th>
              <th>Journal</th>
              <th>Published</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                <td>{article.title}</td>
                <td>{new Date(article.date).toLocaleDateString()}</td>
                <td>{article.journal || '-'}</td>
                <td>{article.published ? '✓' : '○'}</td>
                <td>
                  <button onClick={() => handleEdit(article)} className="btn-edit">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(article.id)} className="btn-delete">
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
