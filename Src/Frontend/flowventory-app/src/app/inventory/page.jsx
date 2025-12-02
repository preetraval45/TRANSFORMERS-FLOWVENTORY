'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import api from '../../../lib/api';

export default function Inventory() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showDetails, setShowDetails] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({
    description: '',
    quantity: '',
    status: '',
  });
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const fetchInventoryData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/inventory/`);
      const data = await response.json();
      // Sort by ID descending (newest first)
      const sortedData = data.sort((a, b) => b.id - a.id);
      setInventoryData(sortedData);
    } catch (error) {
      console.error('Error fetching inventory data:', error);
      setInventoryData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item, event) => {
    event.stopPropagation(); // don’t trigger row click
    setEditingItem(item);
    setEditForm({
      description: item.description || '',
      quantity: item.quantity || '',
      status: item.status || '',
    });
  };
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSaveEdit = async () => {
    if (!editingItem) return;
  
    const updatedData = {
      ...editingItem,
      description: editForm.description,
      quantity: Number(editForm.quantity),
      status: editForm.status,
    };
  
    try {
      const response = await api.updateInventoryItem(editingItem.id, updatedData);
      console.log('Item updated successfully:', response);
  
      setEditingItem(null);
      await fetchInventoryData();
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };
  const handleDelete = async () => {
    if (!editingItem) return;
  
    const confirmed = confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;
  
    try {
      await api.deleteInventoryItem(editingItem.id);
      console.log("Item deleted successfully");
  
      setEditingItem(null);
      await fetchInventoryData(); 
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.item_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.vendor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || item.status === selectedFilter.toLowerCase().replace('_', ' ');
    return matchesSearch && matchesFilter;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Reset to page 1 when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_inspection': return 'bg-yellow-100 text-yellow-800';
      case 'ready_for_deployment': return 'bg-green-100 text-green-800';
      case 'installed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const sidebarItems = [
    { name: 'Filters', isExpanded: true },
    { name: 'Pending', count: null, isFilter: true },
    { name: 'Received', count: null, isFilter: true },
    { name: 'Delayed', count: null, isFilter: true },
    { name: 'Vendor', isDropdown: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <svg className="absolute left-3 top-3 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Inventory Table */}
          <div className="flex-1">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        SKU
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Zone
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                          Loading inventory...
                        </td>
                      </tr>
                    ) : filteredData.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="px-6 py-4 text-center text-sm text-gray-500">
                          No inventory items found
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {item.sku || item.item_id}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {item.description || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.category || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {item.zone || '-'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.storage_location || `${item.zone}-${item.aisle}-${item.rack}` || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(item.status)}`}>
                              {item.status?.replace(/_/g, ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <div className="flex space-x-2">
                              <button
                                onClick={(event) => { event.stopPropagation(); setShowDetails(item); }}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                              >
                                👁️ View
                              </button>
                              <button
                                onClick={(event) => handleEditClick(item, event)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={(event) => { event.stopPropagation(); setEditingItem(item); handleDelete(); }}
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
            </div>

            {/* Pagination Controls */}
            {!loading && filteredData.length > 0 && (
              <div className="mt-6 flex items-center justify-between bg-white px-6 py-4 border border-gray-200 rounded-lg">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, filteredData.length)}</span> of{' '}
                  <span className="font-medium">{filteredData.length}</span> results
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Previous
                  </button>

                  <div className="flex items-center space-x-1">
                    {[...Array(totalPages)].map((_, index) => {
                      const pageNumber = index + 1;
                      // Show first page, last page, current page, and pages around current
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === pageNumber
                                ? 'bg-blue-600 text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return (
                          <span key={pageNumber} className="px-2 text-gray-500">
                            ...
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Details Modal */}
        {showDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Inventory Detail</h2>
                  <button
                    onClick={() => setShowDetails(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SKU</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" value={showDetails.sku || showDetails.item_id} readOnly />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" value={showDetails.description || '-'} readOnly />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" value={showDetails.category || '-'} readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Vendor</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" value={showDetails.vendor || '-'} readOnly />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-semibold" value={showDetails.quantity} readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(showDetails.status)}`}>
                          {showDetails.status?.replace(/_/g, ' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-3">Warehouse Location</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Zone:</span>
                          <span className="font-medium text-gray-900">{showDetails.zone || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Aisle:</span>
                          <span className="font-medium text-gray-900">{showDetails.aisle || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rack:</span>
                          <span className="font-medium text-gray-900">{showDetails.rack || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shelf:</span>
                          <span className="font-medium text-gray-900">{showDetails.shelf || '-'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bin:</span>
                          <span className="font-medium text-gray-900">{showDetails.bin || '-'}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Barcode</label>
                      <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 font-mono" value={showDetails.barcode || '-'} readOnly />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" value={showDetails.weight || '-'} readOnly />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions</label>
                        <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50" value={showDetails.dimensions || '-'} readOnly />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 rounded-t-2xl flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">
                Edit Inventory Item
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="text-white hover:text-gray-200 text-3xl leading-none font-light"
              >
                ×
              </button>
            </div>
            <div className="p-6">

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={editForm.quantity}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="pending_inspection">Pending inspection</option>
                    <option value="ready_for_deployment">Ready for deployment</option>
                    <option value="installed">Installed</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}