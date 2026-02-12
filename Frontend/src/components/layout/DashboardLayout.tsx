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
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

const DashboardLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const role = user?.role?.toLowerCase() || "user";
  const profile = { full_name: user?.name || "User" };

  const isAdmin = role === "admin";

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
    <div className="min-h-screen flex bg-background overflow-hidden">

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 gradient-dark text-sidebar-foreground transform transition-transform duration-200 lg:translate-x-0 lg:static lg:inset-auto flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-display font-bold text-sidebar-accent-foreground">
              CortexCart
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                location.pathname === item.to
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3 px-3">
            <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
              {profile?.full_name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-accent-foreground truncate">
                {profile?.full_name || "User"}
              </p>
              <p className="text-xs text-sidebar-foreground capitalize">
                {role}
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-sidebar-foreground hover:text-destructive"
            onClick={handleSignOut}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <header className="h-16 min-h-[4rem] border-b border-border bg-card/80 backdrop-blur-md flex items-center px-4 lg:px-6 sticky top-0 z-30 justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>

            <h2 className="font-display font-semibold text-foreground text-lg truncate">
              {navItems.find((i) => i.to === location.pathname)?.label ||
                "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                Admin
              </span>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
