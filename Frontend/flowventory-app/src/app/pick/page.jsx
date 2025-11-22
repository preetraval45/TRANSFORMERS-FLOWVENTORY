'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Pick() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [pickQuantity, setPickQuantity] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setMessage({ type: 'error', text: 'Please enter a part number or SKU' });
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/inventory/`);
      const data = await response.json();

      const item = data.find(i =>
        i.item_id?.toLowerCase() === searchTerm.toLowerCase() ||
        i.sku?.toLowerCase() === searchTerm.toLowerCase() ||
        i.barcode?.toLowerCase() === searchTerm.toLowerCase()
      );

      if (item) {
        setSelectedItem(item);
        setMessage({ type: 'success', text: `Found: ${item.description || item.item_id}` });
      } else {
        setSelectedItem(null);
        setMessage({ type: 'error', text: 'Part not found in inventory' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error searching inventory' });
    } finally {
      setLoading(false);
    }
  };

  const handlePick = async (e) => {
    e.preventDefault();

    if (!selectedItem) {
      setMessage({ type: 'error', text: 'Please search for an item first' });
      return;
    }

    const qty = parseInt(pickQuantity);
    if (!qty || qty <= 0) {
      setMessage({ type: 'error', text: 'Please enter a valid quantity' });
      return;
    }

    if (qty > selectedItem.quantity) {
      setMessage({
        type: 'error',
        text: `Insufficient quantity. Available: ${selectedItem.quantity}, Requested: ${qty}`
      });
      return;
    }

    setLoading(true);

    try {
      const updatedItem = {
        ...selectedItem,
        quantity: selectedItem.quantity - qty
      };

      const response = await fetch(`${API_BASE_URL}/inventory/${selectedItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: `Successfully picked ${qty} units. Remaining: ${selectedItem.quantity - qty}`
        });
        setSelectedItem(null);
        setSearchTerm('');
        setPickQuantity('');
      } else {
        setMessage({ type: 'error', text: 'Failed to pick item' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Error connecting to server' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                Pick Parts
              </h1>
              <p className="text-blue-100 text-lg">Remove components from inventory • Safety validated • Audit tracked</p>
            </div>
            <a href="/inventory" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg">
              View Inventory
            </a>
          </div>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg shadow-md ${
            message.type === 'success'
              ? 'bg-green-100 border border-green-400 text-green-800'
              : 'bg-red-100 border border-red-400 text-red-800'
          }`}>
            <div className="flex items-center">
              <span className="mr-2">{message.type === 'success' ? '✓' : '⚠'}</span>
              <span className="font-medium">{message.text}</span>
            </div>
          </div>
        )}

        {/* Pick Form */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              Remove from Inventory
            </h2>
            <p className="text-blue-100 mt-1">Safely remove parts with validation and confirmation</p>
          </div>

          <form onSubmit={handlePick} className="p-8">
            {/* Search Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                Part Identification & Search
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Part Number / SKU / Barcode *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                      placeholder="Enter part number, SKU, or scan barcode"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSearch())}
                    />
                    <button
                      type="button"
                      onClick={handleSearch}
                      disabled={loading}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Selected Item Display */}
            {selectedItem && (
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">📦 Selected Item</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-semibold text-gray-700">Part Number:</span>
                    <p className="text-gray-900 font-medium">{selectedItem.item_id}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">SKU:</span>
                    <p className="text-gray-900 font-medium">{selectedItem.sku || '-'}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Description:</span>
                    <p className="text-gray-900 font-medium">{selectedItem.description || '-'}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Category:</span>
                    <p className="text-gray-900 font-medium">{selectedItem.category || '-'}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Location:</span>
                    <p className="text-gray-900 font-medium">{selectedItem.storage_location || '-'}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Available Quantity:</span>
                    <p className="text-2xl font-bold text-blue-600">{selectedItem.quantity}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quantity Section */}
            {selectedItem && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-blue-200">
                  Pick Quantity
                </h3>
                <div className="max-w-md">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity to Pick *
                  </label>
                  <input
                    type="number"
                    value={pickQuantity}
                    onChange={(e) => setPickQuantity(e.target.value)}
                    required
                    min="1"
                    max={selectedItem.quantity}
                    className="w-full px-4 py-4 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all font-bold text-2xl text-center"
                    placeholder="0"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Maximum available: <span className="font-semibold text-blue-600">{selectedItem.quantity}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t-2 border-gray-200">
              <button
                type="submit"
                disabled={loading || !selectedItem}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
              >
                {loading ? '⏳ Processing...' : '✓ Confirm Pick'}
              </button>
              <button
                type="button"
                onClick={() => window.location.href = '/stock'}
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-xl"
              >
                Go to Stock
              </button>
            </div>
          </form>
        </div>

        {/* Recent Activity */}
        {selectedItem && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4"> Part Location Details</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Zone</p>
                <p className="text-xl font-bold text-blue-600">{selectedItem.zone || '-'}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Aisle</p>
                <p className="text-xl font-bold text-blue-600">{selectedItem.aisle || '-'}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Rack</p>
                <p className="text-xl font-bold text-blue-600">{selectedItem.rack || '-'}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Shelf</p>
                <p className="text-xl font-bold text-blue-600">{selectedItem.shelf || '-'}</p>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-xs text-gray-600 mb-1">Bin</p>
                <p className="text-xl font-bold text-blue-600">{selectedItem.bin || '-'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
