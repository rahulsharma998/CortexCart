import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Minus, Plus, ShoppingBag, CreditCard, Loader2, Package } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useOrderStore } from "@/store/orderStore";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const total = getTotalPrice();

  const handleCheckout = async () => {
    if (!user) {
      navigate("/auth");
      return;
    }

    setIsProcessing(true);
    try {
      await createOrder({
        items: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        })),
        totalAmount: total,
        shippingAddress: user.address || "Default Address", // In real app, ask for address
      });
      clearCart();
      navigate("/orders");
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
          Shopping Cart
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          {items.length} item(s) in your cart
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Your cart is empty
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Explore our products and find something you love!
          </p>
          <Button onClick={() => navigate("/products")} className="bg-primary-600 hover:bg-primary-700 text-white px-8">
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product._id}
              >
                <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                  <CardContent className="p-0 flex flex-col sm:flex-row">
                    <div className="w-full sm:w-32 h-32 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      {item.product.images?.[0] ? (
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Package className="w-10 h-10 text-slate-300 dark:text-slate-600" />
                      )}
                    </div>

                    <div className="p-4 flex flex-1 flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                            {item.product.name}
                          </h3>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-slate-400 hover:text-red-500 -mt-1 -mr-2 sm:hidden"
                            onClick={() => removeItem(item.product._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1 mb-2">
                          {item.product.description}
                        </p>
                        <p className="font-medium text-primary-600 dark:text-primary-400">
                          ₹{item.product.price}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:gap-6">
                        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 rounded-md"
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 rounded-md"
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>

                        <div className="text-right min-w-[80px] hidden sm:block">
                          <span className="font-bold text-lg text-slate-900 dark:text-white">
                            ₹{(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-slate-400 hover:text-red-500 hidden sm:inline-flex"
                          onClick={() => removeItem(item.product._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          <div>
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-24 shadow-lg">
              <CardHeader className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 pb-4">
                <CardTitle className="text-lg font-bold">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Subtotal</span>
                  <span className="font-medium text-slate-900 dark:text-white">₹{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Shipping</span>
                  <span className="font-medium text-green-600 dark:text-green-400">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">Tax</span>
                  <span className="font-medium text-slate-900 dark:text-white">₹0.00</span>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 flex justify-between items-end">
                  <span className="font-bold text-slate-900 dark:text-white">Total</span>
                  <span className="font-bold text-2xl text-primary-600 dark:text-primary-400">
                    ₹{total.toFixed(2)}
                  </span>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-bold py-6 mt-4 shadow-lg shadow-primary-500/20"
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  ) : (
                    <CreditCard className="w-5 h-5 mr-2" />
                  )}
                  {isProcessing ? "Processing..." : "Proceed to Checkout"}
                </Button>

                <p className="text-xs text-center text-slate-400 mt-4">
                  Secure checkout powered by Stripe
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
