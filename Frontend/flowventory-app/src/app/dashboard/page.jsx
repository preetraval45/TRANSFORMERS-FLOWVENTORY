'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalItems: 0,
    itemsReceived: 0,
    pendingShipments: 0,
    flaggedIssues: 0,
    totalZones: 0,
    warehouseUtilization: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch inventory, shipments, and orders
      const [inventoryRes, shipmentsRes, ordersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/inventory/`),
        fetch(`${API_BASE_URL}/shipments/`),
        fetch(`${API_BASE_URL}/orders/`)
      ]);

      const inventory = await inventoryRes.json();
      const shipments = await shipmentsRes.json();
      const orders = await ordersRes.json();

      // Calculate stats
      const totalItems = inventory.length;
      const pendingShipments = shipments.filter(s => s.status === 'pending').length;
      const receivedThisWeek = shipments.filter(s =>
        s.status === 'received' &&
        new Date(s.expected_delivery_date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      ).length;

      // Calculate warehouse metrics
      const uniqueZones = new Set(inventory.map(item => item.zone).filter(Boolean)).size;
      const totalQuantity = inventory.reduce((sum, item) => sum + (item.quantity || 0), 0);
      const utilizationPercentage = Math.min(100, Math.round((totalQuantity / 10000) * 100)); // Assuming max capacity of 10000

      setDashboardData({
        totalItems,
        itemsReceived: receivedThisWeek,
        pendingShipments,
        flaggedIssues: 1,
        totalZones: uniqueZones,
        warehouseUtilization: utilizationPercentage
      });

      // Set recent activity from shipments
      const recentShipments = shipments.slice(0, 2).map(s => ({
        action: `Shipment from ${s.vendor} - Status: ${s.status}`,
        time: new Date(s.expected_delivery_date).toLocaleDateString()
      }));
      setRecentActivity(recentShipments);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback to default data
      setDashboardData({
        totalItems: 0,
        itemsReceived: 0,
        pendingShipments: 0,
        flaggedIssues: 0
      });
      setRecentActivity([
        { action: 'Unable to load recent activity', time: 'Just now' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sidebarItems = [
    { name: 'Filters', isExpanded: true },
    { name: 'Pending', count: null, isFilter: true },
    { name: 'Received', count: null, isFilter: true },
    { name: 'Delayed', count: null, isFilter: true },
    { name: 'Vendor', isDropdown: true },
    { name: 'Urgency', isDropdown: true }
  ];

  const handleUpload = () => {
    alert('File upload functionality would be implemented here');
  };

  const handleAddInventory = () => {
    alert('Add inventory functionality would be implemented here');
  };

  const handleSearchHistoric = () => {
    alert('Search historic records functionality would be implemented here');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-600">{dashboardData.totalItems}</div>
                <div className="text-sm text-gray-600 mt-1">Total Items</div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-600">{dashboardData.itemsReceived}</div>
                <div className="text-sm text-gray-600 mt-1">Items Received This Week</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-orange-600">{dashboardData.pendingShipments}</div>
                <div className="text-sm text-gray-600 mt-1">Pending Shipments</div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600">{dashboardData.totalZones}</div>
                <div className="text-sm text-gray-600 mt-1">Active Warehouse Zones</div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-indigo-600">{dashboardData.warehouseUtilization}%</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">Warehouse Utilization</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${dashboardData.warehouseUtilization}%` }}
                  />
                </div>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center ml-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-red-600">{dashboardData.flaggedIssues}</span>
                  <span className="ml-2 text-red-600">⚠</span>
                </div>
                <div className="text-sm text-gray-600 mt-1">Flagged Issues</div>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              <a
                href="/stock"
                className="w-full bg-green-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-green-700 block text-center"
              >
                📥 Stock Parts
              </a>
              <a
                href="/pick"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-blue-700 block text-center"
              >
                📤 Pick Parts
              </a>
              <a
                href="/inventory"
                className="w-full bg-gray-600 text-white py-2 px-4 rounded text-sm font-medium hover:bg-gray-700 block text-center"
              >
                📦 View Inventory
              </a>
            </div>
          </div>

          {/* Inventory Summary */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Items</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.totalItems}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Zones</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.totalZones}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">Warehouse Utilization</p>
                    <p className="text-2xl font-bold text-gray-900">{dashboardData.warehouseUtilization}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${dashboardData.warehouseUtilization}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}