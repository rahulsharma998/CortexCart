import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, ClipboardList, Users, User } from "lucide-react";

const Sidebar = () => {
  const linkClass =
    "flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition";

  return (
    <aside className="w-64 bg-card border-r border-border p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-6">CortexCart</h2>

      <nav className="space-y-2">
        <NavLink to="/dashboard" className={linkClass}>
          <LayoutDashboard size={18} /> Dashboard
        </NavLink>

        <NavLink to="/products" className={linkClass}>
          <Package size={18} /> Products
        </NavLink>

        <NavLink to="/cart" className={linkClass}>
          <ShoppingCart size={18} /> Cart
        </NavLink>

        <NavLink to="/orders" className={linkClass}>
          <ClipboardList size={18} /> Orders
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          <User size={18} /> Profile
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <Users size={18} /> Users
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
