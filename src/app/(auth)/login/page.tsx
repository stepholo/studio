'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AppLogo } from '@/components/app-logo';
import { Smartphone, Mail, Eye, EyeOff, Loader } from 'lucide-react';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFirebase } from '@/firebase/provider';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, x: 50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -50 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

export default function LoginPage() {
  const router = useRouter();
  const { auth } = useFirebase();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      let description = 'An unexpected error occurred. Please try again.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-email') {
        description = 'No user found with this email. Please check your email or sign up.';
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        description = 'Invalid password. Please try again.';
      } else if (error.message) {
        description = error.message;
      }
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <div className="grid gap-2 text-center">
        <AppLogo className="mb-4 justify-center" />
        <h1 className="text-3xl font-bold font-headline">Welcome back</h1>
        <p className="text-balance text-muted-foreground">
          Enter your credentials to access your account.
        </p>
      </div>
      <Card>
        <form onSubmit={handleLogin}>
          <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your email or phone to login to your account</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
              <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
              </div>
              <div className="grid gap-2">
                  <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="ml-auto inline-block text-sm underline">
                          Forgot your password?
                      </Link>
                  </div>
                  <div className="relative">
                    <Input id="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                      onClick={() => setShowPassword(prev => !prev)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-primary to-accent text-white" disabled={isLoading}>
                  {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                  Login
              </Button>
              
              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" disabled={isLoading}><Mail className="mr-2 h-4 w-4" /> Google</Button>
                  <Button variant="outline" disabled={isLoading}><Smartphone className="mr-2 h-4 w-4" /> Phone OTP</Button>
              </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
              <div className="text-center text-sm w-full">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="underline">
                      Sign up
                  </Link>
              </div>
              <p className="px-8 text-center text-xs text-muted-foreground">
                  By continuing, you agree to our{' '}
                  <Link href="#" className="underline underline-offset-4 hover:text-primary">
                      Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="underline underline-offset-4 hover:text-primary">
                      Privacy Policy
                  </Link>
                  .
              </p>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  );
}
