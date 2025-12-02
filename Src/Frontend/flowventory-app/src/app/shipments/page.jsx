'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Shipments() {
  const { user } = useAuth();
  const [packingSlips, setPackingSlips] = useState([]);
  const [editingSlip, setEditingSlip] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [formData, setFormData] = useState({
    our_name: 'Flowventory',
    our_address: 'University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223',
    bill_to: '',
    ship_to: '',
    invoice_number: '',
    date: new Date().toISOString().split('T')[0],
    due_date: '',
    ship_via: 'FedEx',
    order_number: '',
    qty: '',
    item_type: '',
    item_description: ''
  });

  const shipViaOptions = ['FedEx', 'UPS', 'USPS', 'DHL', 'Local Delivery', 'Will Call'];
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

  useEffect(() => {
    fetchPackingSlips();
  }, []);

  const fetchPackingSlips = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/shipments/`);
      if (response.ok) {
        const data = await response.json();
        // Sort by ID descending (newest first)
        const sortedData = data.sort((a, b) => b.id - a.id);
        setPackingSlips(sortedData);
        setCurrentPage(1); // Reset to first page when data refreshes
      }
    } catch (error) {
      console.error('Error fetching packing slips:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      our_name: formData.our_name,
      our_address: formData.our_address,
      bill_to: formData.bill_to,
      ship_to: formData.ship_to,
      invoice_number: formData.invoice_number,
      invoice_date: formData.date,
      due_date: formData.due_date || null,
      ship_via: formData.ship_via,
      order_number: formData.order_number,
      qty: parseInt(formData.qty),
      item_type: formData.item_type,
      item_desc: formData.item_description
    };

    try {
      const response = await fetch(`${API_BASE_URL}/shipments/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert('Packing slip created successfully!');
        resetForm();
        fetchPackingSlips();
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        alert('Error creating packing slip: ' + (errorData.detail || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error creating packing slip: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      our_name: 'Flowventory',
      our_address: 'University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223',
      bill_to: '',
      ship_to: '',
      invoice_number: '',
      date: new Date().toISOString().split('T')[0],
      due_date: '',
      ship_via: 'FedEx',
      order_number: '',
      qty: '',
      item_type: '',
      item_description: ''
    });
    setEditingSlip(null);
  };

  const handleEdit = async (slip) => {
    setEditingSlip(slip);
    setFormData({
      our_name: slip.our_name,
      our_address: slip.our_address,
      bill_to: slip.bill_to,
      ship_to: slip.ship_to,
      invoice_number: slip.invoice_number,
      date: slip.invoice_date,
      due_date: slip.due_date || '',
      ship_via: slip.ship_via,
      order_number: slip.order_number || '',
      qty: slip.qty,
      item_type: slip.item_type,
      item_description: slip.item_desc
    });
    setShowForm(true);
  };

  const handleView = (slip) => {
    alert(`Viewing: ${slip.invoice_number}\nItem: ${slip.item_desc}\nQty: ${slip.qty}`);
  };

  const handlePrint = (slip) => {
    window.print();
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this packing slip?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/shipments/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        alert('Packing slip deleted successfully');
        fetchPackingSlips();
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <span className="mr-3">📦</span> Packing Slips
          </h1>
          <p className="text-purple-100 text-lg">Create and manage shipment packing slips</p>
        </div>

        {/* Packing Slip Form - Always Visible */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-2">✍️</span> {editingSlip ? 'Edit' : 'Create'} Packing Slip
            </h2>
            <p className="text-purple-100 mt-1">Fill out the form below</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Company Information */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-purple-200">🏢 Our Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                  <input type="text" name="our_name" value={formData.our_name} onChange={handleInputChange} required className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company Address *</label>
                  <textarea name="our_address" value={formData.our_address} onChange={handleInputChange} required rows="2" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200" />
                </div>
              </div>
            </div>

            {/* Billing & Shipping */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-purple-200">📬 Billing & Shipping</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bill To *</label>
                  <textarea name="bill_to" value={formData.bill_to} onChange={handleInputChange} required rows="3" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200" placeholder="Company Name&#10;Address&#10;City, State ZIP" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ship To *</label>
                  <textarea name="ship_to" value={formData.ship_to} onChange={handleInputChange} required rows="3" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200" placeholder="Company Name&#10;Address&#10;City, State ZIP" />
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-purple-200">📝 Order Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice Number *</label>
                  <input type="text" name="invoice_number" value={formData.invoice_number} onChange={handleInputChange} required className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200" placeholder="INV-2024-001" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date</label>
                  <input type="date" name="due_date" value={formData.due_date} onChange={handleInputChange} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ship Via *</label>
                  <select name="ship_via" value={formData.ship_via} onChange={handleInputChange} required className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200">
                    {shipViaOptions.map(option => (<option key={option} value={option}>{option}</option>))}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Order Number</label>
                  <input type="text" name="order_number" value={formData.order_number} onChange={handleInputChange} className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200" placeholder="ORD-2024-001" />
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-purple-200">📦 Item Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity *</label>
                  <input type="number" name="qty" value={formData.qty} onChange={handleInputChange} required min="1" className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200" placeholder="0" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Item Type *</label>
                  <input type="text" name="item_type" value={formData.item_type} onChange={handleInputChange} required className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200" placeholder="e.g., Electronics" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Item Description *</label>
                  <input type="text" name="item_description" value={formData.item_description} onChange={handleInputChange} required className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring focus:ring-purple-200" placeholder="Detailed description" />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center justify-end gap-4 pt-4 border-t-2 border-gray-200">
              {editingSlip && (
                <button type="button" onClick={resetForm} className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-400">Cancel Edit</button>
              )}
              <button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 shadow-xl">
                {editingSlip ? '✓ Update Packing Slip' : '✓ Create Packing Slip'}
              </button>
            </div>
          </form>
        </div>

        {/* Packing Slips Table - Always Below Form */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-2">📋</span> All Packing Slips
            </h2>
            <p className="text-purple-100 mt-1">View, edit, and print packing slips</p>
          </div>

          <div className="p-8">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Invoice Number</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ship To</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Item</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Qty</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ship Via</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {packingSlips.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                        No packing slips found. Create one to get started!
                      </td>
                    </tr>
                  ) : (
                    packingSlips
                      .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                      .map((slip) => (
                      <tr key={slip.id} className="hover:bg-purple-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-purple-600">{slip.invoice_number}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{slip.invoice_date}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{slip.ship_to?.split('\n')[0]}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{slip.item_desc}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{slip.qty}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{slip.ship_via}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex space-x-2">
                            <button onClick={() => handleView(slip)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">👁️ View</button>
                            <button onClick={() => handleEdit(slip)} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium">✏️ Edit</button>
                            <button onClick={() => handlePrint(slip)} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">🖨️ Print</button>
                            <button onClick={() => handleDelete(slip.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-medium">🗑️ Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {packingSlips.length > itemsPerPage && (
              <div className="px-8 py-4 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, packingSlips.length)} of {packingSlips.length} shipments
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
                    Page {currentPage} of {Math.ceil(packingSlips.length / itemsPerPage)}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(Math.ceil(packingSlips.length / itemsPerPage), prev + 1))}
                    disabled={currentPage === Math.ceil(packingSlips.length / itemsPerPage)}
                    className={`px-4 py-2 rounded-lg font-medium ${currentPage === Math.ceil(packingSlips.length / itemsPerPage) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
