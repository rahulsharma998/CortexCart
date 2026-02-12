import { useNavigate } from "react-router-dom";
import { ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-900/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl px-4 py-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/50 border border-slate-800 text-orange-500 text-xs font-black uppercase tracking-widest mb-8 animate-fade-in shadow-xl backdrop-blur-md">
          <Sparkles className="w-3 h-3" />
          The Future of Shopping is Here
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 leading-tight tracking-tighter animate-fade-in">
          Cortex<span className="text-orange-600">Cart.</span>
        </h1>

        <p className="text-slate-400 text-xl md:text-2xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium animate-fade-in [animation-delay:100ms]">
          Experience the most advanced e-commerce engine with admin mastery,
          real-time analytics, and a lightning-fast shopping experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in [animation-delay:200ms]">
          <Button
            onClick={handleGetStarted}
            className="group px-10 py-8 bg-orange-600 hover:bg-orange-700 text-white text-lg font-black rounded-2xl shadow-2xl shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center gap-3"
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="flex items-center gap-6 px-6 py-4 rounded-2xl bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Secure Pay
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-sm font-bold">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              Fast Delivery
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale animate-fade-in [animation-delay:300ms]">
          <div className="flex flex-col items-center">
            <p className="text-2xl font-black text-white">50k+</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Users</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-black text-white">120+</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Stores</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-black text-white">₹1.2M</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Volume</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-2xl font-black text-white">99.9%</p>
            <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">Uptime</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
        <ShoppingBag className="w-3 h-3" />
        Built with Cortex Engine &copy; 2026
      </div>
    </div>
  );
};

export default Index;
