import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Users, DollarSign, Package, ClipboardList, TrendingUp, ArrowUpRight } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useProductStore } from "@/store/productStore";
import { useOrderStore } from "@/store/orderStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { products = [], fetchProducts } = useProductStore();
  const { orders = [], fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, [fetchProducts, fetchOrders]);

  const totalRevenue = (orders || []).reduce((acc, order) => acc + (order.totalAmount || 0), 0);

  const stats = [
    {
      title: "Gross Revenue",
      value: `₹${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
      trend: "+12.5%",
    },
    {
      title: "Transaction Volume",
      value: (orders || []).length.toString(),
      icon: ShoppingBag,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: "+8.2%",
    },
    {
      title: "Inventory Assets",
      value: (products || []).length.toString(),
      icon: Package,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      trend: "+3.1%",
    },
    {
      title: "Active Protocols",
      value: "41.2k",
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      trend: "+24k",
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-orange-600 font-black text-[10px] uppercase tracking-[0.2em] mb-3">
            <TrendingUp className="w-3 h-3" />
            Live Console Metrics
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">
            System <span className="text-slate-500">Overview.</span>
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Welcoming operator <span className="text-white font-bold">{user?.name}</span> to the central command node.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Node Secure</span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="group border-slate-900 bg-slate-900/40 hover:bg-slate-900/60 transition-all duration-300 rounded-3xl overflow-hidden ring-1 ring-white/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                {stat.title}
              </CardTitle>
              <div className={cn("p-2.5 rounded-2xl transition-transform group-hover:scale-110", stat.bg)}>
                <stat.icon className={cn("h-5 w-5", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-black text-white tracking-tight">
                {stat.value}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{stat.trend}</span>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Since last sync</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-slate-900 bg-slate-900/40 rounded-3xl overflow-hidden ring-1 ring-white/5">
          <CardHeader className="flex flex-row items-center justify-between border-b border-slate-800/50 pb-6">
            <div>
              <CardTitle className="text-lg font-black text-white tracking-tight">Recent Transactions</CardTitle>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Real-time order stream</p>
            </div>
            <Button variant="ghost" size="sm" className="text-orange-500 font-black text-[10px] uppercase tracking-widest hover:bg-orange-500/10">View Archive</Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {(orders || []).length > 0 ? (
                (orders || []).slice(0, 5).map((order) => (
                  <div key={order._id} className="group flex items-center justify-between p-4 rounded-2xl bg-slate-800/30 border border-slate-800/50 hover:bg-slate-800/60 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-orange-500 shadow-inner group-hover:rotate-6 transition-transform">
                        <ClipboardList className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-black text-white tracking-tight">#ORD-{order._id.slice(-6).toUpperCase()}</p>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                          {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} units
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-white text-lg tracking-tight">
                        ₹{order.totalAmount.toFixed(2)}
                      </div>
                      <div className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-widest inline-block mt-1">Verified</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 flex flex-col items-center gap-4">
                  <Package className="w-12 h-12 text-slate-800" />
                  <p className="text-xs font-black text-slate-600 uppercase tracking-[0.2em]">Zero transactions detected</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-slate-900 bg-slate-900/40 rounded-3xl overflow-hidden ring-1 ring-white/5">
          <CardHeader className="border-b border-slate-800/50 pb-6">
            <CardTitle className="text-lg font-black text-white tracking-tight">System Status</CardTitle>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Resource allocation</p>
          </CardHeader>
          <CardContent className="pt-8 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Database Load</span>
                <span className="text-white">24%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-600 w-[24%] rounded-full shadow-lg shadow-orange-500/40"></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Storage Capacity</span>
                <span className="text-white">82%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 w-[82%] rounded-full shadow-lg shadow-blue-500/40"></div>
              </div>
            </div>

            <div className="pt-4 p-6 bg-orange-600/10 rounded-2xl border border-orange-600/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
                <span className="text-xs font-black text-white uppercase tracking-widest">Quick Insight</span>
              </div>
              <p className="text-[11px] font-bold text-orange-200/80 leading-relaxed">
                Transaction volume is up <span className="text-white">12%</span> compared to last session. Consider scaling inventory for high-demand items.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
