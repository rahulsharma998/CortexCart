import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { VideoModal } from "@/components/ui/video-modal";

const LandingHero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [showVideo, setShowVideo] = useState(false);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col justify-center pt-32 pb-20 lg:pt-48 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 w-full h-full bg-grid-pattern opacity-20 pointer-events-none"></div>
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-orange-600/20 rounded-[100%] blur-[120px] animate-pulse"></div>
          <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800/60 text-orange-500 text-xs font-bold uppercase tracking-widest mb-10 animate-fade-in shadow-xl backdrop-blur-md hover:border-orange-500/30 transition-colors cursor-default">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>The New Standard in E-Commerce</span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter animate-fade-in">
            Build Faster. <br className="hidden md:block" />
            Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Smarter.</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl lg:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in [animation-delay:100ms]">
            CortexCart is the all-in-one engine designed for high-growth brands.
            Combine powerful admin controls with a delightful shopping experience.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto animate-fade-in [animation-delay:200ms] mb-20">
            <Button
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-8 py-7 bg-orange-600 hover:bg-orange-700 text-white text-lg font-bold rounded-xl shadow-lg shadow-orange-500/20 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3">
              {isAuthenticated ? "Go to Dashboard" : "Start your Free Trial"}
              <ArrowRight className="w-5 h-5" />
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowVideo(true)}
              className="w-full sm:w-auto px-8 py-7 border-slate-700 hover:bg-slate-800 text-slate-300 hover:text-white text-lg font-bold rounded-xl backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
                <Play className="w-3 h-3 fill-current" />
              </div>
              Watch Demo
            </Button>
          </div>

          <div className="w-full border-t border-slate-800/50 pt-12 animate-fade-in [animation-delay:300ms]">
            <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider mb-8">Trusted by industry leaders</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex flex-col items-center group cursor-default">
                <span className="text-3xl font-black text-white group-hover:text-orange-500 transition-colors">50k+</span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Active Users</span>
              </div>
              <div className="flex flex-col items-center group cursor-default">
                <span className="text-3xl font-black text-white group-hover:text-blue-500 transition-colors">99.9%</span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Uptime SLA</span>
              </div>
              <div className="flex flex-col items-center group cursor-default">
                <span className="text-3xl font-black text-white group-hover:text-green-500 transition-colors">$1.2B+</span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Processed</span>
              </div>
              <div className="flex flex-col items-center group cursor-default">
                <span className="text-3xl font-black text-white group-hover:text-purple-500 transition-colors">24/7</span>
                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Global Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={showVideo}
        onClose={() => setShowVideo(false)}
        videoId="dQw4w9WgXcQ"
      />
    </>
  );
};

export default LandingHero;
