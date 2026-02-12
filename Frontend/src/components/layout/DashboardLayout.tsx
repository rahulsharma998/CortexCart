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
  Bell,
  Search,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const role = user?.role || "User";
  const profileName = user?.name || "User";

  const isAdmin = role === "Admin";

  const navItems = [
    { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/products", icon: Package, label: "Products" },
    { to: "/cart", icon: ShoppingCart, label: "Cart" },
    { to: "/orders", icon: ClipboardList, label: "Orders" },
    ...(isAdmin ? [{ to: "/admin/users", icon: Users, label: "Merchant Studio" }] : []),
    { to: "/profile", icon: User, label: "User Profile" },
  ];

  const handleSignOut = () => {
    logout();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100 font-sans">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-auto flex flex-col shadow-2xl",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-8 border-b border-slate-800">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20 group-hover:rotate-12 transition-transform">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">
              Cortex<span className="text-orange-600">Cart.</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 ml-2">Navigation Console</p>
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all group",
                location.pathname === item.to
                  ? "bg-orange-600 text-white shadow-xl shadow-orange-500/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className={cn("w-5 h-5 transition-colors", location.pathname === item.to ? "text-white" : "text-slate-500 group-hover:text-orange-500")} />
                {item.label}
              </div>
              {location.pathname === item.to && <ChevronRight className="w-4 h-4 text-white/50" />}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-4 mb-6 px-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg font-black text-orange-500 shadow-inner">
              {profileName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-black text-white truncate tracking-tight">
                {profileName}
              </p>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                {role} Account
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start h-12 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-500/5 font-bold text-xs uppercase tracking-widest transition-all"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-3" />
            Sign Out
          </Button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen bg-slate-950 relative">
        <header className="h-20 border-b border-slate-900 bg-slate-950/50 backdrop-blur-xl flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>

            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 text-slate-500">
              <Search className="w-4 h-4" />
              <span className="text-xs font-bold">Search the protocol...</span>
              <span className="ml-4 px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-black tracking-widest">CMD+K</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-orange-600 rounded-full border-2 border-slate-900"></span>
            </Button>

            <div className="h-12 px-4 bg-slate-900 rounded-2xl border border-slate-800 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-lg shadow-green-500/40"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Live</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-auto">
          <div className="max-w-7xl mx-auto animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
