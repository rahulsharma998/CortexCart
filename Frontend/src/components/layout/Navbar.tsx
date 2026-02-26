import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === "/";

  const scrollToSection = (id: string) => {
    if (!isLanding) {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5 supports-[backdrop-filter]:bg-slate-950/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Cortex<span className="text-orange-500">Cart</span>
            </span>
          </div>

          {!isLanding && location.pathname === "/auth" ? null : (
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection("features")} className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection("about")} className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </button>
              <button onClick={() => scrollToSection("showcase")} className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group">
                Product Tour
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
              </button>
            </div>
          )}

          <div className="flex items-center gap-4">
            {location.pathname !== "/auth" && (
              <>
                <Button
                  variant="ghost"
                  className="text-slate-300 hover:text-white hover:bg-slate-800 hidden sm:flex"
                  onClick={() => navigate("/auth")}
                >
                  Log in
                </Button>
                <Button
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full px-6 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300"
                  onClick={() => navigate("/auth")}
                >
                  Get Started
                </Button>
              </>
            )}
            {location.pathname === "/auth" && (
              <Button
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-slate-800"
                onClick={() => navigate("/")}
              >
                Back to Home
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
