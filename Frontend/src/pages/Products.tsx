import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, ShoppingCart, Package } from "lucide-react";
import { motion } from "framer-motion";

const Products = () => {
  const [search, setSearch] = useState("");

  const products = []; // temporary empty

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Products
          </h1>
          <p className="text-muted-foreground mt-1">
            Browse and manage products
          </p>
        </div>

        <div className="flex gap-3">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-60"
          />
          <Button className="gradient-primary text-primary-foreground">
            <Plus className="w-4 h-4 mr-2" /> Add Product
          </Button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-display font-semibold text-foreground">
            No products found
          </h3>
          <p className="text-muted-foreground mt-1">
            Add your first product to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product: any, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="overflow-hidden shadow-card hover:shadow-elevated transition-all group">
                <div className="h-48 bg-muted flex items-center justify-center">
                  <Package className="w-12 h-12 text-muted-foreground" />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-display font-semibold text-foreground">
                    Product Name
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Description
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-display font-bold text-foreground">
                      ₹999
                    </span>
                    <Button size="sm" className="gradient-primary text-primary-foreground">
                      <ShoppingCart className="w-3 h-3 mr-1" /> Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
