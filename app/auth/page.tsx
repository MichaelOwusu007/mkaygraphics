'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Frame, Sparkles } from 'lucide-react';

// export const metadata = {
//   title: 'Login / Register | FrameStation',
//   description: 'Secure login and signup to access your creative workspace.',
// };

export default function AuthPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [signInData, setSignInData] = useState({ email: '', password: '' });
  const [signUpData, setSignUpData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  // ✅ Session check on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push('/account');
      }
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        router.push('/account');
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [router]);

  // ✅ Handle Sign In
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: signInData.email,
        password: signInData.password,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Welcome back!');
      }
    } catch {
      toast.error('An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Handle Sign Up
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email: signUpData.email,
        password: signUpData.password,
        options: {
          data: {
            name: signUpData.name,
            phone: signUpData.phone,
          },
          emailRedirectTo: `${window.location.origin}/`,
        },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Account created! Check your email to verify.');
      }
    } catch {
      toast.error('An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background/95 to-accent/5 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <Card className="w-full max-w-md relative overflow-hidden border-border/50 shadow-elegant animate-fade-in">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-primary opacity-10 blur-3xl"></div>

        <div className="relative z-10 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <Frame className="w-8 h-8 text-primary" />
              <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to access your creative workspace
            </p>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Sign In
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Sign In */}
            <TabsContent value="signin" className="space-y-4 animate-fade-in">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="you@example.com"
                    value={signInData.email}
                    onChange={(e) =>
                      setSignInData({ ...signInData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={signInData.password}
                      onChange={(e) =>
                        setSignInData({ ...signInData, password: e.target.value })
                      }
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-border" />
                    <span className="text-muted-foreground">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div> */}

                <Button
                  type="submit"
                  className="w-full bg-black cursor-pointer hover:opacity-90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            {/* Sign Up */}
            <TabsContent value="signup" className="space-y-4 animate-fade-in">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    value={signUpData.name}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpData.email}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="signup-phone">Phone</Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    value={signUpData.phone}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      value={signUpData.password}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, password: e.target.value })
                      }
                      minLength={6}
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" required className="mt-1 rounded border-border" />
                  <span className="text-xs text-muted-foreground">
                    I agree to the{' '}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </div>

                <Button type="submit" className="w-full bg-black cursor-pointer hover:opacity-90">
                  {isLoading ? 'Creating account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}
