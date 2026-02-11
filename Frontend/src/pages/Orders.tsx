import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

const Orders = () => {
  const orders: any[] = [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          My Orders
        </h1>
        <p className="text-muted-foreground mt-1">
          {orders.length} order(s)
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <ClipboardList className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-display font-semibold text-foreground">
            No orders yet
          </h3>
          <p className="text-muted-foreground mt-1">
            Your orders will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order, i) => (
            <motion.div key={i}>
              <Card className="shadow-card">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground">
                    Order #123456
                  </p>
                  <p className="font-display font-bold text-lg">
                    ₹999
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
