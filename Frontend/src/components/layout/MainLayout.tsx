import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  User,
  Users,
  LogOut,
  Menu,
  ShoppingBag,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const isAdmin = user?.role === "Admin";

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/products", icon: Package, label: "Products" },
    { to: "/cart", icon: ShoppingCart, label: "Cart" },
    { to: "/orders", icon: ClipboardList, label: "Orders" },
    ...(isAdmin ? [{ to: "/admin/users", icon: Users, label: "Users" }] : []),
    { to: "/profile", icon: User, label: "Profile" },
  ];

  const handleSignOut = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* ================= Sidebar ================= */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-100 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-auto flex flex-col border-r border-slate-800",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              CortexCart
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                location.pathname === item.to
                  ? "bg-primary-500/10 text-primary-400"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Profile + Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-3 mb-3 px-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-400 capitalize">
                {user?.role || "user"}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* ================= Overlay (Mobile) ================= */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ================= Main Content ================= */}
      <div className="flex-1 flex flex-col min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header */}
        <header className="h-16 border-b border-border bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center px-4 lg:px-6 sticky top-0 z-30 justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <h2 className="text-xl font-bold text-foreground tracking-tight">
              {navItems.find((i) => i.to === location.pathname)?.label ||
                "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Add any header actions here if needed */}
            {isAdmin && (
              <span className="px-2.5 py-0.5 rounded-full bg-primary-500/10 text-primary-500 text-xs font-semibold border border-primary-500/20">
                Admin Workspace
              </span>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-auto animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
