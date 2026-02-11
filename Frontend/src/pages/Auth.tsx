import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              CortexCart
            </h1>
          </div>
          <p className="text-muted-foreground">
            Your intelligent commerce platform
          </p>
        </div>

        {/* Card */}
        <Card className="shadow-elevated border-border">
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-display text-xl">
              {isLogin ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Sign in to your account"
                : "Fill in your details to get started"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            {isLogin ? (
              <form className="space-y-4">
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" required />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" required />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary text-primary-foreground"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </form>
            ) : (
              <form className="space-y-4">
                <div>
                  <Label>Full Name</Label>
                  <Input placeholder="John Doe" required />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@example.com" required />
                </div>

                <div>
                  <Label>Password</Label>
                  <Input type="password" placeholder="Min 6 characters" required />
                </div>

                <Button
                  type="submit"
                  className="w-full gradient-primary text-primary-foreground"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Account
                </Button>
              </form>
            )}

            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-sm text-primary hover:underline"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Auth;
