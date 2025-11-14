'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Stock() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    item_id: '',
    sku: '',
    description: '',
    vendor: '',
    category: '',
    quantity: '',
    zone: '',
    aisle: '',
    rack: '',
    shelf: '',
    bin: '',
    weight: '',
    dimensions: '',
    barcode: '',
    work_order: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

  const zones = ['A', 'B', 'C', 'D', 'E'];
  const categories = ['Electronics', 'PCB Components', 'Semiconductors', 'Passive Components',
                      'Cables & Connectors', 'Power Supplies', 'Sensors', 'Displays'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-generate storage location
    if (['zone', 'aisle', 'rack', 'shelf', 'bin'].includes(name)) {
      const { zone, aisle, rack, shelf, bin } = { ...formData, [name]: value };
      if (zone && aisle && rack && shelf && bin) {
        setFormData(prev => ({
          ...prev,
          storage_location: `${zone}-${aisle}-${rack}-${shelf}-${bin}`
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const payload = {
        ...formData,
        quantity: parseInt(formData.quantity) || 0,
        status: 'ready_for_deployment'
      };

      const response = await fetch(`${API_BASE_URL}/inventory/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage({
          type: 'success',
          text: `Successfully added ${formData.quantity} units of ${formData.item_id} to inventory!`
        });
        // Reset form
        setFormData({
          item_id: '',
          sku: '',
          description: '',
          vendor: '',
          category: '',
          quantity: '',
          zone: '',
          aisle: '',
          rack: '',
          shelf: '',
          bin: '',
          weight: '',
          dimensions: '',
          barcode: '',
          work_order: ''
        });
      } else {
        const error = await response.json();
        setMessage({
          type: 'error',
          text: error.detail || 'Failed to add item to inventory'
        });
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Error connecting to server. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                <span className="mr-3">📥</span> Stock Parts
              </h1>
              <p className="text-green-100 text-lg">Add components to inventory • Track work orders • Manage locations</p>
            </div>
            <a href="/inventory" className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition-all transform hover:scale-105 shadow-lg">
              📦 View Inventory
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

        {/* Stock Form */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <span className="mr-2">✚</span> Add to Inventory
            </h2>
            <p className="text-green-100 mt-1">Fill out the form below to stock new parts</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Part Identification */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-green-200">
                🏷️ Part Identification
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Part Number / Item ID *
                  </label>
                  <input
                    type="text"
                    name="item_id"
                    value={formData.item_id}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                    placeholder="e.g., RC0603FR-07383KL"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    SKU
                  </label>
                  <input
                    type="text"
                    name="sku"
                    value={formData.sku}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                    placeholder="e.g., SKU-2001"
                  />
                </div>
              </div>
            </div>

            {/* Component Details */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-green-200">
                🔧 Component Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                    placeholder="e.g., Resistor 383K Ohm 1% SMD"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Weight
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                    placeholder="e.g., 2.5 lbs"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    value={formData.dimensions}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                    placeholder="e.g., 12x8x4 inches"
                  />
                </div>
              </div>
            </div>

            {/* Quantity & Location */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b-2 border-green-200">
                📍 Quantity & Warehouse Location
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 transition-all font-semibold text-lg"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Zone
                  </label>
                  <select
                    name="zone"
                    value={formData.zone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                  >
                    <option value="">Zone</option>
                    {zones.map(zone => (
                      <option key={zone} value={zone}>{zone}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Aisle
                  </label>
                  <input
                    type="text"
                    name="aisle"
                    value={formData.aisle}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                    placeholder="A1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rack
                  </label>
                  <input
                    type="text"
                    name="rack"
                    value={formData.rack}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                    placeholder="R01"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Shelf
                  </label>
                  <input
                    type="text"
                    name="shelf"
                    value={formData.shelf}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring focus:ring-green-200 transition-all"
                    placeholder="S1"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-6 border-t-2 border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
              >
                {loading ? '⏳ Adding to Inventory...' : '✓ Stock Item'}
              </button>
              <button
                type="button"
                onClick={() => window.location.href = '/pick'}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-xl"
              >
                📤 Go to Pick
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
