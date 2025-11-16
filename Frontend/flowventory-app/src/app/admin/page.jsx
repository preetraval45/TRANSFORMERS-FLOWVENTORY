'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import api from '../../../lib/api';

export default function UserManagement() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    role: 'engineer',
    password: '',
    assigned_pages: []
  });
  const [loading, setLoading] = useState(false);

  const availablePages = [
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'stock', label: 'Stock' },
    { value: 'pick', label: 'Pick' },
    { value: 'shipments', label: 'Shipments' },
    { value: 'inventory', label: 'Inventory' },
    { value: 'admin', label: 'User Management' }
  ];

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.getUsers();
      // Sort by ID descending (newest first)
      const sortedUsers = (response || []).sort((a, b) => b.id - a.id);
      setUsers(sortedUsers);
      setCurrentPage(1); // Reset to first page
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'engineer': return 'bg-blue-100 text-blue-800';
      case 'manager': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%!';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleAddUser = () => {
    setModalMode('add');
    setSelectedUser(null);
    setFormData({
      username: '',
      firstname: '',
      role: 'engineer',
      password: generateRandomPassword(),
      assigned_pages: ['dashboard', 'inventory']
    });
    setShowModal(true);
  };

  const handleEditUser = (userData) => {
    setModalMode('edit');
    setSelectedUser(userData);
    setFormData({
      username: userData.username || '',
      firstname: userData.firstname || userData.firstName || '',
      role: userData.role || 'engineer',
      password: '',
      assigned_pages: userData.assigned_pages || ['dashboard']
    });
    setShowModal(true);
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await api.deleteUser(userId);
      alert('User deleted successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstname || !formData.username) {
      alert('Please fill out all required fields');
      return;
    }

    if (modalMode === 'add' && !formData.password) {
      alert('Please generate a password');
      return;
    }

    try {
      const payload = {
        username: formData.username,
        firstname: formData.firstname,
        role: formData.role,
        assigned_pages: formData.assigned_pages
      };

      if (modalMode === 'add') {
        payload.password = formData.password;
        const response = await api.createUser(payload);
      } else {
        if (formData.password) {
          payload.password = formData.password;
        }
        await api.updateUser(selectedUser.id, payload);
      }

      setShowModal(false);
      setFormData({
        username: '',
        firstname: '',
        role: 'engineer',
        password: '',
        assigned_pages: []
      });
      fetchUsers();
    } catch (error) {
      console.error('Error saving user:', error);
      alert('Error saving user. Please try again.');
    }
  };

  const handlePageToggle = (pageValue) => {
    setFormData(prev => ({
      ...prev,
      assigned_pages: prev.assigned_pages.includes(pageValue)
        ? prev.assigned_pages.filter(p => p !== pageValue)
        : [...prev.assigned_pages, pageValue]
    }));
  };

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                <span className="mr-3">👥</span> User Management
              </h1>
              <p className="text-blue-100 text-lg">Manage system users, roles, and permissions</p>
            </div>
            <button
              onClick={handleAddUser}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              + Add New User
            </button>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-2">📋</span> System Users
            </h2>
            <p className="text-blue-100 mt-1">View and manage all system users</p>
          </div>

          <div className="p-8">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading users...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Assigned Pages
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                          No users found
                        </td>
                      </tr>
                    ) : (
                      users
                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((userData) => (
                        <tr key={userData.id} className="hover:bg-blue-50 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3 shadow-md">
                                <span className="text-white text-sm font-bold">
                                  {(userData.firstname || userData.firstName)?.[0]?.toUpperCase() || 'U'}
                                </span>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900">
                                  {userData.firstname || userData.firstName || 'Unknown'}
                                </div>
                                <div className="text-xs text-gray-500">
                                  @{userData.username}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-3 py-1 text-xs font-bold rounded-full capitalize ${getRoleColor(userData.role)}`}>
                              {userData.role}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-wrap gap-1">
                              {(userData.assigned_pages || ['dashboard']).map(page => (
                                <span key={page} className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded capitalize">
                                  {page}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEditUser(userData)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => handleDeleteUser(userData.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium"
                              >
                                🗑️ Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {users.length > itemsPerPage && (
              <div className="px-8 py-4 flex items-center justify-between border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, users.length)} of {users.length} users
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-medium ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                      Previous
                    </button>
                    <span className="px-4 py-2 text-gray-700 font-medium">
                      Page {currentPage} of {Math.ceil(users.length / itemsPerPage)}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(Math.ceil(users.length / itemsPerPage), prev + 1))}
                      disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
                      className={`px-4 py-2 rounded-lg font-medium ${currentPage === Math.ceil(users.length / itemsPerPage) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>

        {/* Add/Edit User Modal */}
        {showModal && (
          <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-2xl flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  {modalMode === 'add' ? 'Add New User' : 'Edit User'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 text-3xl leading-none font-light"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstname}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstname: e.target.value, username: modalMode === 'add' ? e.target.value.toLowerCase().replace(/\s+/g, '') : prev.username }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                      placeholder="Enter full name"
                      required
                    />
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Username *
                    </label>
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100"
                      placeholder="Enter username"
                      required
                      disabled={modalMode === 'edit'}
                    />
                    {modalMode === 'edit' && (
                      <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
                    )}
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                    >
                      <option value="admin">Admin - Full system access</option>
                      <option value="manager">Manager - Management access</option>
                      <option value="engineer">Engineer - Technical access</option>
                    </select>
                  </div>

                  {/* Assigned Pages */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Assigned Pages
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {availablePages.map(page => (
                        <label key={page.value} className="flex items-center space-x-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.assigned_pages.includes(page.value)}
                            onChange={() => handlePageToggle(page.value)}
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">{page.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {modalMode === 'add' ? 'Generated Password *' : 'New Password (optional)'}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.password}
                        readOnly={modalMode === 'add'}
                        onChange={modalMode === 'edit' ? (e) => setFormData(prev => ({ ...prev, password: e.target.value })) : undefined}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 font-mono text-sm"
                        placeholder={modalMode === 'edit' ? 'Leave blank to keep current password' : ''}
                      />
                      {modalMode === 'add' && (
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, password: generateRandomPassword() }))}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap"
                        >
                          Regenerate
                        </button>
                      )}
                    </div>
                    {modalMode === 'add' && (
                      <p className="text-xs text-amber-600 mt-1">Save this password securely! It won't be shown again.</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    {modalMode === 'add' ? 'Create User' : 'Update User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
