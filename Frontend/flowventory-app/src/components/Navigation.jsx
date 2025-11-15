"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import FlowventoryLogo from "./FlowventoryLogo";

export default function Navigation() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const navItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      roles: ["admin", "engineer", "manager"],
      icon: "📊",
    },
    {
      name: "Stock",
      path: "/stock",
      roles: ["admin", "engineer", "manager"],
      icon: "📦",
    },
    {
      name: "Pick",
      path: "/pick",
      roles: ["admin", "engineer", "manager"],
      icon: "🔍",
    },
    {
      name: "Shipments",
      path: "/shipments",
      roles: ["admin", "engineer", "manager"],
      icon: "🚚",
    },
    {
      name: "Inventory",
      path: "/inventory",
      roles: ["admin", "engineer", "manager"],
      icon: "📋",
    },
    { name: "User Management", path: "/admin", roles: ["admin"], icon: "👥" },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-indigo-200/50 px-6 py-4 shadow-lg shadow-indigo-100/20">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/dashboard" className="flex items-center space-x-3 group">
            <div className="transform group-hover:scale-110 transition-transform duration-200">
              <FlowventoryLogo size={48} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Flowventory
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex space-x-2">
            {filteredNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2 ${
                  pathname === item.path
                    ? "bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/25 transform scale-105"
                    : "text-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-blue-50 hover:text-indigo-700 hover:scale-105 hover:shadow-md"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-3 rounded-xl hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-200 transition-all duration-200 shadow-sm hover:shadow-md">
              <svg
                className="w-5 h-5 text-slate-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            <div className="flex items-center space-x-4 pl-6 border-l border-indigo-200/50">
              <div className="relative">
                <div className="w-11 h-11 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-full flex items-center justify-center ring-3 ring-indigo-100 shadow-lg">
                  <span className="text-white text-sm font-bold">
                    {user?.firstName?.[0]?.toUpperCase()}
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-3 border-white shadow-md"></div>
              </div>

              <div className="text-sm">
                <div className="font-bold text-slate-900">
                  {user?.firstName}
                </div>
                <div className="text-slate-600 capitalize text-xs font-medium bg-slate-100 px-2 py-1 rounded-full">
                  {user?.role}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="ml-3 p-3 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                title="Sign out"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
