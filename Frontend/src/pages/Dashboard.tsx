import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Users, DollarSign, Package, ClipboardList } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useProductStore } from "@/store/productStore";
import { useOrderStore } from "@/store/orderStore";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { products, fetchProducts } = useProductStore();
  const { orders, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [fetchProducts, fetchOrders]);

  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "Total Orders",
      value: orders.length.toString(),
      icon: ShoppingBag,
      color: "text-blue-500",
      bg: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "Total Products",
      value: products.length.toString(),
      icon: Package,
      color: "text-purple-500",
      bg: "bg-purple-100 dark:bg-purple-900/20",
    },
    {
      title: "Active Users",
      value: "1", // Placeholder
      icon: Users,
      color: "text-orange-500",
      bg: "bg-orange-100 dark:bg-orange-900/20",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
          Dashboard
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Welcome back, <span className="font-semibold text-primary-600 dark:text-primary-400">{user?.name}</span>! Here's an overview of your store.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
          >
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Updated just now
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.length > 0 ? (
                orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <ClipboardList className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">Order #{order._id.slice(-6)}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                        </p>
                      </div>
                    </div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      ₹{order.totalAmount.toFixed(2)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 dark:text-slate-400">
                  No orders yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
