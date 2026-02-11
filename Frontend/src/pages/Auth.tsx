import { useState, useEffect } from "react";
import { ShoppingBag, Loader2, Lock, Mail, } from "lucide-react";
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
  const [contactNumber, setContactNumber] = useState("");
  const [dob, setDob] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
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
        const fullAddress = `${addressLine}, ${city}, ${state}, ${pincode}`;
        await register({
          email,
          password,
          name,
          phone: contactNumber,
          dob,
          address: fullAddress,
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 font-sans text-slate-900">
      <div className={cn("w-full transition-all", isLogin ? "max-w-md" : "max-w-xl")}>
        <Card className="border border-slate-200 shadow-sm bg-white rounded-lg">
          <CardHeader className="text-center pb-2 pt-6">
            <div className="flex justify-center mb-2">
              <div className="p-2 bg-orange-100 rounded-full">
                <ShoppingBag className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <CardTitle className="text-xl font-bold text-slate-900">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-slate-500 text-sm">
              {isLogin
                ? "Sign in to access your account"
                : "Fill in your details to get started"}
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            {error && (
              <div className="mb-4 p-3 rounded-md bg-red-50 text-red-600 text-sm font-medium border border-red-100 flex items-center">
                <span className="mr-2">⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {!isLogin && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-slate-700 font-medium text-sm">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-slate-700 font-medium text-sm">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-10"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="password" className="text-slate-700 font-medium text-sm">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Min 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="contact" className="text-slate-700 font-medium text-sm">Contact Number</Label>
                    <Input
                      id="contact"
                      placeholder="+91 9876543210"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="dob" className="text-slate-700 font-medium text-sm">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-10"
                      style={{ colorScheme: 'light' }}
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="address" className="text-slate-700 font-medium text-sm">Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="city" className="text-slate-700 font-medium text-sm">City</Label>
                    <Input
                      id="city"
                      placeholder="Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="state" className="text-slate-700 font-medium text-sm">State</Label>
                    <Input
                      id="state"
                      placeholder="Maharashtra"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="pincode" className="text-slate-700 font-medium text-sm">Pincode</Label>
                    <Input
                      id="pincode"
                      placeholder="400001"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-10"
                    />
                  </div>

                  <div className="space-y-1.5 md:col-span-2">
                    <Label className="text-slate-700 font-medium text-sm">Register as</Label>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setRole("User")}
                        className={cn(
                          "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all border",
                          role === "User"
                            ? "bg-orange-500 text-white border-orange-600 shadow-sm"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        )}
                      >
                        User
                      </button>
                      <button
                        type="button"
                        onClick={() => setRole("Admin")}
                        className={cn(
                          "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all border",
                          role === "Admin"
                            ? "bg-orange-500 text-white border-orange-600 shadow-sm"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                        )}
                      >
                        Admin
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {isLogin && (
                <>
                  <div className="space-y-1.5">
                    <Label htmlFor="email-login" className="text-slate-700 font-medium text-sm">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                      <Input
                        id="email-login"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="password-login" className="text-slate-700 font-medium text-sm">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
                      <Input
                        id="password-login"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500 h-10"
                      />
                    </div>
                  </div>
                </>
              )}

              <Button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-md shadow-sm transition-all duration-200 mt-4 h-11"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : isLogin ? (
                  "Sign In"
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500">
                {isLogin ? "New to CortexCart?" : "Already have an account?"}
              </p>
              <button
                type="button"
                className="text-sm text-orange-600 hover:text-orange-700 font-semibold hover:underline transition-colors mt-1"
                onClick={toggleMode}
                disabled={isLoading}
              >
                {isLogin ? "Create an account" : "Sign in to your account"}
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
