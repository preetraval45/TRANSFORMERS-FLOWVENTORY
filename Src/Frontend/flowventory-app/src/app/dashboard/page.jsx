"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Dashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalItems: 0,
    itemsReceived: 0,
    pendingShipments: 0,
    flaggedIssues: 0,
    totalZones: 0,
    warehouseUtilization: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost/api";

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch inventory, shipments, and orders
      const [inventoryRes, shipmentsRes, ordersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/inventory/`),
        fetch(`${API_BASE_URL}/shipments/`),
        fetch(`${API_BASE_URL}/orders/`),
      ]);

      const inventory = inventoryRes.ok ? await inventoryRes.json() : [];
      const shipments = shipmentsRes.ok ? await shipmentsRes.json() : [];
      const orders = ordersRes.ok ? await ordersRes.json() : [];

      // Calculate stats
      const totalItems = inventory.length;
      const pendingShipments = shipments.filter(
        (s) => s.status === "pending"
      ).length;
      const receivedThisWeek = shipments.filter((s) => {
        if (!s.invoice_date) return false;
        const invoiceDate = new Date(s.invoice_date);
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return invoiceDate > weekAgo;
      }).length;

      // Calculate warehouse metrics
      const uniqueZones = new Set(
        inventory.map((item) => item.zone).filter(Boolean)
      ).size;
      const totalQuantity = inventory.reduce(
        (sum, item) => sum + (item.quantity || 0),
        0
      );
      const utilizationPercentage = Math.min(
        100,
        Math.round((totalQuantity / 10000) * 100)
      ); // Assuming max capacity of 10000

      // Calculate flagged issues (items with low stock or pending inspection)
      const flaggedIssues = inventory.filter(
        (item) =>
          item.status === "pending_inspection" ||
          (item.quantity && item.quantity < 5)
      ).length;

      setDashboardData({
        totalItems,
        itemsReceived: receivedThisWeek,
        pendingShipments,
        flaggedIssues,
        totalZones: uniqueZones,
        warehouseUtilization: utilizationPercentage,
      });

      // Set recent activity from shipments and orders
      const recentShipments = shipments.slice(0, 3).map((s) => ({
        action: `📦 Shipment ${s.invoice_number || "Unknown"} - ${
          s.item_desc || "Items"
        }`,
        time: s.invoice_date
          ? new Date(s.invoice_date).toLocaleDateString()
          : "Recent",
        type: "shipment",
      }));

      const recentOrders = orders.slice(0, 2).map((o) => ({
        action: `📋 Order ${o.id} - ${o.status}`,
        time: "Recent",
        type: "order",
      }));

      setRecentActivity([...recentShipments, ...recentOrders]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      // Fallback to default data
      setDashboardData({
        totalItems: 0,
        itemsReceived: 0,
        pendingShipments: 0,
        flaggedIssues: 0,
        totalZones: 0,
        warehouseUtilization: 0,
      });
      setRecentActivity([
        {
          action: "Unable to load recent activity",
          time: "Just now",
          type: "error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = () => {
    alert("File upload functionality would be implemented here");
  };

  const handleAddInventory = () => {
    alert("Add inventory functionality would be implemented here");
  };

  const handleSearchHistoric = () => {
    alert("Search historic records functionality would be implemented here");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Main Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center">
                <span className="mr-3">📊</span> Dashboard
              </h1>
              <p className="text-indigo-100 text-lg">
                Welcome back, {user?.firstName}! Here's your inventory overview.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-4xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-slate-600 text-lg font-medium">
                Loading dashboard data...
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {/* Stats Cards */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      {dashboardData.totalItems}
                    </div>
                    <div className="text-sm text-slate-600 mt-1 font-medium">
                      Total Items
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center shadow-md">
                    <svg
                      className="w-7 h-7 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                      {dashboardData.itemsReceived}
                    </div>
                    <div className="text-sm text-slate-600 mt-1 font-medium">
                      Items Received This Week
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-r from-emerald-100 to-green-100 rounded-2xl flex items-center justify-center shadow-md">
                    <svg
                      className="w-7 h-7 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                      {dashboardData.pendingShipments}
                    </div>
                    <div className="text-sm text-slate-600 mt-1 font-medium">
                      Pending Shipments
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center shadow-md">
                    <svg
                      className="w-7 h-7 text-amber-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                      {dashboardData.totalZones}
                    </div>
                    <div className="text-sm text-slate-600 mt-1 font-medium">
                      Active Warehouse Zones
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-100 to-violet-100 rounded-2xl flex items-center justify-center shadow-md">
                    <svg
                      className="w-7 h-7 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                        {dashboardData.warehouseUtilization}%
                      </span>
                    </div>
                    <div className="text-sm text-slate-600 mb-3 font-medium">
                      Warehouse Utilization
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-blue-500 h-3 rounded-full transition-all duration-1000 shadow-sm"
                        style={{
                          width: `${dashboardData.warehouseUtilization}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center shadow-md ml-4">
                    <svg
                      className="w-7 h-7 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
                        {dashboardData.flaggedIssues}
                      </span>
                      {dashboardData.flaggedIssues > 0 && (
                        <span className="ml-2 text-red-500 text-2xl">⚠️</span>
                      )}
                    </div>
                    <div className="text-sm text-slate-600 mt-1 font-medium">
                      Flagged Issues
                    </div>
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-r from-red-100 to-rose-100 rounded-2xl flex items-center justify-center shadow-md">
                    <svg
                      className="w-7 h-7 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-white p-8 rounded-3xl border border-slate-200/50 shadow-xl backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                  <span className="mr-3">📈</span> Recent Activity
                </h2>
                <div className="space-y-4">
                  {recentActivity.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">📋</span>
                      </div>
                      <p className="text-slate-500 font-medium">
                        No recent activity
                      </p>
                    </div>
                  ) : (
                    recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-4 p-4 bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl hover:from-slate-100 hover:to-slate-200 transition-all duration-200"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white text-sm font-bold">
                              {activity.type === "shipment"
                                ? "📦"
                                : activity.type === "order"
                                ? "📋"
                                : "⚠️"}
                            </span>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-slate-900">
                            {activity.action}
                          </p>
                          <p className="text-xs text-slate-500 mt-1 font-medium">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="mt-8 space-y-3">
                  <Link
                    href="/inventory"
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-3 px-6 rounded-2xl text-sm font-bold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl block text-center"
                  >
                    📥 Inventory
                  </Link>
                  <Link
                    href="/shipments"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-2xl text-sm font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl block text-center"
                  >
                    📤 Shipments
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
