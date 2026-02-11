import { useState, useEffect } from "react";
import { ShoppingBag, Loader2, Lock, Mail, User as UserIcon } from "lucide-react";
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
  const { login, register, isLoading, error, clearError, isAuthenticated } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"User" | "Admin">("User");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
    return () => clearError();
  }, [isAuthenticated, navigate, clearError]);

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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans">
      <div className="w-full max-w-md">
        <Card className="border border-slate-200 shadow-sm bg-white rounded-xl overflow-hidden">
          <CardHeader className="text-center pb-2 pt-8 bg-slate-50/50 border-b border-slate-100 mb-6">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-orange-100 rounded-2xl shadow-inner">
                <ShoppingBag className="w-8 h-8 text-orange-600" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 tracking-tight">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-slate-500 text-sm mt-1">
              {isLogin
                ? "Sign in to your CortexCart account"
                : "Join CortexCart and start shopping"}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-8 pt-0">
            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-start gap-3">
                <span className="text-lg">⚠️</span>
                <div className="flex-1 break-words">
                  {error.startsWith("[") || error.startsWith("{")
                    ? "Validation failed. Please check your details."
                    : error}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-slate-700 font-semibold text-xs uppercase tracking-wider">Full Name</Label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-11 rounded-lg"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-700 font-semibold text-xs uppercase tracking-wider">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-11 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-slate-700 font-semibold text-xs uppercase tracking-wider">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-11 rounded-lg"
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold text-xs uppercase tracking-wider">Account Type</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setRole("User")}
                      className={cn(
                        "py-2.5 px-4 rounded-lg text-sm font-bold transition-all border-2",
                        role === "User"
                          ? "bg-orange-50 border-orange-500 text-orange-600 shadow-sm"
                          : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                      )}
                    >
                      User
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole("Admin")}
                      className={cn(
                        "py-2.5 px-4 rounded-lg text-sm font-bold transition-all border-2",
                        role === "Admin"
                          ? "bg-orange-50 border-orange-500 text-orange-600 shadow-sm"
                          : "bg-white border-slate-100 text-slate-500 hover:border-slate-200"
                      )}
                    >
                      Admin
                    </button>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mt-2 h-12"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm text-slate-500">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <button
                type="button"
                className="text-sm text-orange-600 hover:text-orange-700 font-bold decoration-2 hover:underline transition-all mt-1"
                onClick={toggleMode}
                disabled={isLoading}
              >
                {isLogin ? "Register now" : "Go to login"}
              </button>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-slate-400 text-xs mt-8">
          &copy; 2026 CortexCart. Made with ❤️ for great shopping experiences.
        </p>
      </div>
    </div>
  );
};

export default Auth;
