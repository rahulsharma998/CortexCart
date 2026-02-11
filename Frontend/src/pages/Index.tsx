import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-6">
          <ShoppingBag className="w-8 h-8 text-primary-foreground" />
        </div>

        <h1 className="text-5xl font-bold mb-4">
          Cortex<span className="text-primary">Cart</span>
        </h1>

        <p className="text-muted-foreground text-lg mb-8">
          A modern commerce platform with admin controls,
          product management and seamless shopping experience.
        </p>

        <button
          onClick={() => navigate("/auth")}
          className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium"
        >
          Get Started
        </button>
      </motion.div>
    </div>
  );
};

export default Index;
