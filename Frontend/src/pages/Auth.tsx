import { useState, useEffect } from "react";
import { ShoppingBag, Loader2, Lock, Mail, User as UserIcon, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuthStore } from "@/store/authStore";
import { cn } from "@/lib/utils";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const { login, register, isLoading, error, clearError, isAuthenticated, token, hasHydrated } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"User" | "Admin">("User");

  useEffect(() => {
    if (hasHydrated && isAuthenticated && token) {
      navigate("/dashboard");
    }
    return () => clearError();
  }, [hasHydrated, isAuthenticated, token, navigate, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isLogin) {
        await login({ email, password });
      } else {
        await register({
          email,
          password,
          name,
          role
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    clearError();
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-900/40 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full blur-[120px] animate-pulse"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/20 rotate-3">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="text-3xl font-black text-white tracking-tighter">Cortex<span className="text-orange-600">Cart.</span></span>
          </div>
        </div>

        <Card className="border border-slate-800 shadow-2xl bg-slate-900/50 backdrop-blur-3xl rounded-3xl overflow-hidden ring-1 ring-white/5">
          <CardHeader className="text-center pb-4 pt-10">
            <CardTitle className="text-3xl font-black text-white tracking-tight">
              {isLogin ? "Welcome Back" : "Join the Future"}
            </CardTitle>
            <CardDescription className="text-slate-400 text-sm mt-2 font-medium">
              {isLogin
                ? "Sign in to access your premium dashboard"
                : "Create an account to start your journey"}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8">
            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-red-500/10 text-red-500 text-sm font-bold border border-red-500/20 flex items-start gap-3 backdrop-blur-sm animate-shake">
                <div className="flex-1 break-words uppercase tracking-tight text-[11px]">
                  {error.startsWith("[") || error.startsWith("{")
                    ? "Validation failed. Please check your details."
                    : error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-500 font-black text-[10px] uppercase tracking-widest ml-1">Full Name</Label>
                  <div className="relative group">
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-orange-500/20 h-14 rounded-2xl transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-500 font-black text-[10px] uppercase tracking-widest ml-1">Email Address</Label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-orange-500/20 h-14 rounded-2xl transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-500 font-black text-[10px] uppercase tracking-widest ml-1">Password</Label>
                  {isLogin && (
                    <button type="button" className="text-[10px] font-black text-orange-600 hover:text-orange-500 uppercase tracking-widest">Forgot?</button>
                  )}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-12 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-orange-500/20 h-14 rounded-2xl transition-all"
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-3">
                  <Label className="text-slate-500 font-black text-[10px] uppercase tracking-widest ml-1">Account Purpose</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setRole("User")}
                      className={cn(
                        "py-3.5 px-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2",
                        role === "User"
                          ? "bg-orange-600 border-orange-600 text-white shadow-xl shadow-orange-500/20"
                          : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600"
                      )}
                    >
                      Shopper
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("Admin")}
                      className={cn(
                        "py-3.5 px-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all border-2",
                        role === "Admin"
                          ? "bg-orange-600 border-orange-600 text-white shadow-xl shadow-orange-500/20"
                          : "bg-slate-800/50 border-slate-700 text-slate-400 hover:border-slate-600"
                      )}
                    >
                      Merchant
                    </button>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-sm font-black uppercase tracking-widest h-14 rounded-2xl shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300 transform active:scale-[0.98] mt-4 flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isLogin ? "Authorize Access" : "Initialize Account"}
                    <Sparkles className="w-4 h-4 ml-1 opacity-50" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-800 text-center">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-2">
                {isLogin ? "New to the engine?" : "Already verified?"}
              </p>
              <button
                type="button"
                className="text-[10px] text-orange-600 hover:text-orange-500 font-black uppercase tracking-[0.2em] transition-all"
                onClick={toggleMode}
                disabled={isLoading}
              >
                {isLogin ? "Build an Identity" : "Access Console"}
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-slate-600 text-[10px] font-black uppercase tracking-widest mt-10">
          &copy; 2026 Cortex System Protocol. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Auth;
