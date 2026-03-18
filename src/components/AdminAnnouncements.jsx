import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Bell, Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-toastify';
import '../styles/AdminComponents.css';

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: false
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      // Mock data - in real app would fetch from database
      const mockAnnouncements = [
        {
          id: 1,
          title: 'New Fee Schedule Announcement',
          content: 'Effective January 2026, business permit fees have been updated...',
          published: true,
          publishedDate: '2026-03-01'
        },
        {
          id: 2,
          title: 'System Maintenance Notice',
          content: 'The online system will be under maintenance on March 15, 2026...',
          published: true,
          publishedDate: '2026-02-28'
        },
        {
          id: 3,
          title: 'New Business Categories',
          content: 'We have added new business categories to our system...',
          published: false,
          publishedDate: null
        }
      ];
      setAnnouncements(mockAnnouncements);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast.error('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setSelectedAnnouncement(null);
    setFormData({ title: '', content: '', published: false });
    setShowForm(true);
  };

  const handleEdit = (announcement) => {
    setSelectedAnnouncement(announcement);
    setFormData({
      title: announcement.title,
      content: announcement.content,
      published: announcement.published
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (selectedAnnouncement) {
      toast.success('Announcement updated successfully');
    } else {
      toast.success('Announcement created successfully');
    }
    setShowForm(false);
    fetchAnnouncements();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      toast.success('Announcement deleted');
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  const handleTogglePublish = (announcement) => {
    toast.success(
      announcement.published 
        ? 'Announcement unpublished' 
        : 'Announcement published'
    );
    setAnnouncements(announcements.map(a =>
      a.id === announcement.id
        ? { ...a, published: !a.published, publishedDate: !a.published ? new Date().toISOString().split('T')[0] : null }
        : a
    ));
  };

  if (loading) {
    return <div className="loading-spinner">Loading announcements...</div>;
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>Announcements Management</h2>
        <p>Create and manage announcements for the homepage</p>
      </div>

      {/* Control Button */}
      <div className="section-controls">
        <button className="btn-primary" onClick={handleAddNew}>
          <Plus size={18} />
          Create New Announcement
        </button>
      </div>

      {/* Announcements List */}
      <div className="announcements-list">
        {announcements.length > 0 ? (
          announcements.map(announcement => (
            <div key={announcement.id} className="announcement-card">
              <div className="card-header">
                <div className="announcement-title-section">
                  <Bell size={20} />
                  <h3>{announcement.title}</h3>
                </div>
                {announcement.published && (
                  <span className="badge badge-success">Published</span>
                )}
                {!announcement.published && (
                  <span className="badge badge-warning">Draft</span>
                )}
              </div>
              <div className="card-body">
                <p className="announcement-content">{announcement.content}</p>
                {announcement.publishedDate && (
                  <p className="published-date">
                    Published: {new Date(announcement.publishedDate).toLocaleString()}
                  </p>
                )}
              </div>
              <div className="card-footer">
                <div className="action-buttons">
                  <button
                    className="btn-icon"
                    title={announcement.published ? 'Unpublish' : 'Publish'}
                    onClick={() => handleTogglePublish(announcement)}
                  >
                    {announcement.published ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    className="btn-icon"
                    title="Edit"
                    onClick={() => handleEdit(announcement)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="btn-icon danger"
                    title="Delete"
                    onClick={() => handleDelete(announcement.id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>No announcements yet. Create one to get started!</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {selectedAnnouncement ? 'Edit Announcement' : 'Create New Announcement'}
              </h3>
              <button 
                className="btn-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Announcement Title *</label>
                <input
                  type="text"
                  placeholder="Enter announcement title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Content *</label>
                <textarea
                  placeholder="Enter announcement content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="form-control"
                  rows="8"
                />
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({...formData, published: e.target.checked})}
                  />
                  <span>Publish immediately</span>
                </label>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={handleSave}>
                {selectedAnnouncement ? 'Update' : 'Create'} Announcement
              </button>
              <button className="btn-secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
