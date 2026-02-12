import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ShoppingCart, Package, Search, Loader2 } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { products, fetchProducts, isLoading } = useProductStore();
  const { addItem } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: any) => {
    if (!user) {
      navigate("/auth");
      return;
    }
    addItem(product);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Our Products
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Discover our curated collection of premium goods.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search products..."
              className="pl-10 h-11 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="h-11 px-4 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm font-bold text-slate-600 dark:text-slate-300 focus:ring-2 focus:ring-orange-500/20 cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {user?.role === "Admin" && (
            <Button className="h-11 px-6 bg-orange-600 hover:bg-orange-700 text-white rounded-xl shadow-lg shadow-orange-500/20 font-bold">
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-orange-100 rounded-full animate-spin border-t-orange-500" />
            <ShoppingCart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-orange-500" />
          </div>
          <p className="text-slate-400 animate-pulse font-medium">Loading amazing products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-32 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
          <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">No products found</h3>
          <p className="text-slate-500">Try adjusting your search or category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Card key={product._id} className="group border-none bg-white dark:bg-slate-900 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 flex flex-col h-full ring-1 ring-slate-100 dark:ring-slate-800">
              <div className="relative aspect-square overflow-hidden bg-slate-50">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-slate-200" />
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 shadow-sm border border-slate-100">
                    {product.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex-1 space-y-2">
                  <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Price</p>
                    <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight">₹{product.price}</p>
                  </div>

                  <Button
                    size="icon"
                    className="w-12 h-12 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-orange-600 dark:hover:bg-orange-600 text-white shadow-lg transition-all transform active:scale-90"
                    onClick={() => handleAddToCart(product)}
                  >
                    <Plus className="w-6 h-6" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
