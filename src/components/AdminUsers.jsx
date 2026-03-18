import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Search, Edit2, Trash2, Shield, RotateCcw } from 'lucide-react';
import { toast } from 'react-toastify';
import '../styles/AdminComponents.css';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'staff',
    office: ''
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Simulating user fetch - in real app would fetch from profiles table
      const mockUsers = [
        { id: '1', fullName: 'Maria Garcia', email: 'maria@bplo.gov.ph', role: 'Super Admin', office: 'BPLO', status: 'active' },
        { id: '2', fullName: 'Juan Santos', email: 'juan@bplo.gov.ph', role: 'BPLO Staff', office: 'BPLO', status: 'active' },
        { id: '3', fullName: 'Rosa Lopez', email: 'rosa@treasurer.gov.ph', role: 'Treasurer', office: 'Treasurers Office', status: 'active' },
        { id: '4', fullName: 'Pedro Reyes', email: 'pedro@sanitary.gov.ph', role: 'Endorsing Office', office: 'Sanitary Office', status: 'active' },
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    setFormData({ fullName: '', email: '', role: 'staff', office: '' });
    setShowAddModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setFormData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      office: user.office
    });
    setShowEditModal(true);
  };

  const handleSaveUser = async () => {
    if (!formData.fullName || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (selectedUser) {
        // Update existing user
        toast.success(`User ${formData.fullName} updated successfully`);
        setShowEditModal(false);
      } else {
        // Add new user
        toast.success(`User ${formData.fullName} added successfully`);
        setShowAddModal(false);
      }
      fetchUsers();
    } catch (error) {
      toast.error('Failed to save user');
    }
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Delete user ${user.fullName}?`)) {
      toast.success(`User ${user.fullName} deleted`);
      setUsers(users.filter(u => u.id !== user.id));
    }
  };

  const handleResetPassword = (user) => {
    toast.success(`Password reset link sent to ${user.email}`);
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Super Admin':
        return 'role-admin';
      case 'BPLO Staff':
        return 'role-staff';
      case 'Treasurer':
        return 'role-treasurer';
      case 'Endorsing Office':
        return 'role-endorsing';
      default:
        return 'role-default';
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading users...</div>;
  }

  return (
    <div className="admin-section">
      <div className="section-header">
        <h2>User Management</h2>
        <p>Manage staff accounts and permissions</p>
      </div>

      {/* Statistics */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Total Users</p>
            <p className="stat-value">{users.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-content">
            <p className="stat-label">Active Users</p>
            <p className="stat-value">{users.filter(u => u.status === 'active').length}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="section-controls">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn-primary" onClick={handleAddUser}>
          <Plus size={18} />
          Add New User
        </button>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Office</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td className="user-name">{user.fullName}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${getRoleColor(user.role)}`}>
                    <Shield size={14} />
                    {user.role}
                  </span>
                </td>
                <td>{user.office}</td>
                <td>
                  <span className="badge badge-success">{user.status}</span>
                </td>
                <td className="actions">
                  <button
                    className="btn-icon"
                    title="Edit"
                    onClick={() => handleEditUser(user)}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="btn-icon"
                    title="Reset Password"
                    onClick={() => handleResetPassword(user)}
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    className="btn-icon danger"
                    title="Delete"
                    onClick={() => handleDeleteUser(user)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New User</h3>
              <button 
                className="btn-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="user@bplo.gov.ph"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="form-control"
                >
                  <option value="super-admin">Super Admin</option>
                  <option value="bplo-staff">BPLO Staff</option>
                  <option value="treasurer">Treasurer</option>
                  <option value="endorsing-office">Endorsing Office</option>
                </select>
              </div>
              <div className="form-group">
                <label>Office/Department *</label>
                <input
                  type="text"
                  placeholder="Enter office name"
                  value={formData.office}
                  onChange={(e) => setFormData({...formData, office: e.target.value})}
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={handleSaveUser}>
                Add User
              </button>
              <button className="btn-secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit User</h3>
              <button 
                className="btn-close"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  placeholder="user@bplo.gov.ph"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Role *</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="form-control"
                >
                  <option value="super-admin">Super Admin</option>
                  <option value="bplo-staff">BPLO Staff</option>
                  <option value="treasurer">Treasurer</option>
                  <option value="endorsing-office">Endorsing Office</option>
                </select>
              </div>
              <div className="form-group">
                <label>Office/Department *</label>
                <input
                  type="text"
                  placeholder="Enter office name"
                  value={formData.office}
                  onChange={(e) => setFormData({...formData, office: e.target.value})}
                  className="form-control"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-primary" onClick={handleSaveUser}>
                Update User
              </button>
              <button className="btn-secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
