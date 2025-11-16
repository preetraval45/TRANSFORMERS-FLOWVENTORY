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

  // Don't render the navigation bar if there is no user logged in or on login page
  if (!user || pathname === '/login') {
    return null;
  }

  const navItems = [
    { name: "Dashboard", path: "/dashboard", roles: ["admin", "engineer", "manager"] },
    { name: "Stock", path: "/stock", roles: ["admin", "engineer", "manager"] },
    { name: "Pick", path: "/pick", roles: ["admin", "engineer", "manager"] },
    { name: "Shipments", path: "/shipments", roles: ["admin", "engineer", "manager"] },
    { name: "Inventory", path: "/inventory", roles: ["admin", "engineer", "manager"] },
    { name: "User Management", path: "/admin", roles: ["admin"] },
  ];

  const filteredNavItems = navItems.filter((item) =>
    item.roles.includes(user?.role)
  );

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 px-6 py-3 shadow-xl">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/dashboard" className="flex items-center space-x-3 group">
          <div className="transform group-hover:scale-110 transition-transform duration-200">
            <FlowventoryLogo size={40} />
          </div>
          <span className="text-2xl font-bold text-white">
            Flowventory
          </span>
        </Link>

        <div className="flex items-center space-x-1">
          {filteredNavItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                pathname === item.path
                  ? "bg-white text-indigo-600 shadow-lg"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-right">
            <div className="font-bold text-white">{user?.firstName}</div>
            <div className="text-white/80 capitalize text-xs">{user?.role}</div>
          </div>

          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-indigo-600 text-sm font-bold">
              {user?.firstName?.[0]?.toUpperCase()}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="ml-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
