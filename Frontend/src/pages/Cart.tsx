import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const Cart = () => {
  const [items] = useState<any[]>([]);

  const total = 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Shopping Cart
        </h1>
        <p className="text-muted-foreground mt-1">
          {items.length} item(s) in your cart
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-display font-semibold text-foreground">
            Your cart is empty
          </h3>
          <p className="text-muted-foreground mt-1">
            Browse products and add items to your cart
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="shadow-card">
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-foreground">
                        Product Name
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        ₹999 each
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="icon" variant="outline">
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span>1</span>
                      <Button size="icon" variant="outline">
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>

                    <span className="font-bold">₹999</span>

                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div>
            <Card className="shadow-elevated sticky top-20">
              <CardHeader>
                <CardTitle className="font-display">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-t pt-3 flex justify-between">
                  <span className="font-display font-semibold">
                    Total
                  </span>
                  <span className="font-display font-bold text-xl">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                <Button className="w-full gradient-primary text-primary-foreground">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
