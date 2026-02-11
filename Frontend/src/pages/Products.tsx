import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ShoppingCart, Package, Search, Loader2 } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";

const Products = () => {
  const [search, setSearch] = useState("");
  const { products, fetchProducts, isLoading, error } = useProductStore();
  const { addItem } = useCartStore();
  const { user } = useAuthStore();

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Products
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Browse and manage your inventory
          </p>
        </div>

        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-9"
            />
          </div>
          {isAdmin && (
            <Button className="bg-primary-600 hover:bg-primary-700 text-white">
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-16 text-red-500">
          <p>{error}</p>
          <Button variant="outline" onClick={() => fetchProducts()} className="mt-4">
            Try Again
          </Button>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
          <Package className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            No products found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Try adjusting your search or add new products
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="h-48 bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
                  {product.images?.[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <Package className="w-16 h-16 text-slate-300 dark:text-slate-600" />
                  )}
                  {isAdmin && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="h-8 text-xs">
                        Edit
                      </Button>
                    </div>
                  )}
                </div>
                <CardContent className="p-5">
                  <div className="mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {product.category || "General"}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1 mb-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 min-h-[40px]">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col">
                      <span className="text-sm text-slate-400 font-medium">Price</span>
                      <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                        ₹{product.price}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-400 transition-colors"
                      onClick={() => addItem(product)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" /> Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
