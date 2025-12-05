'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLogo } from '@/components/app-logo';
import { SignupProgress } from '@/components/signup-progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, CreditCard, ShieldCheck, TrendingUp, Eye, EyeOff, Loader } from 'lucide-react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useFirebase } from '@/firebase/provider';
import { useToast } from '@/hooks/use-toast';


const totalSteps = 2;

const goals = [
  { id: 'improve', label: 'I want to improve my credit score', icon: TrendingUp },
  { id: 'access', label: 'I want easier access to credit', icon: CreditCard },
  { id: 'insights', label: 'I want financial insights', icon: ShieldCheck },
];

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

export default function SignupPage() {
  const { auth } = useFirebase();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Passwords do not match.',
      });
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });
      toast({
        title: 'Account Created!',
        description: "You've successfully signed up. Let's set up your goals.",
      });
      setStep(prev => (prev < totalSteps ? prev + 1 : prev));
    } catch (error: any) {
      let description = 'An unexpected error occurred. Please try again.';
      if (error.code === 'auth/email-already-in-use') {
        description = 'This email is already in use. Please try logging in or use a different email.';
      } else if (error.message) {
        description = error.message;
      }
      toast({
        variant: 'destructive',
        title: 'Sign-up Failed',
        description: description,
      });
    } finally {
        setIsLoading(false);
    }
  };

  const nextStep = () => {
     if (step === 1) {
        handleSignup();
    } else {
      setStep(prev => (prev < totalSteps ? prev + 1 : prev));
    }
  }
  const prevStep = () => setStep(prev => (prev > 1 ? prev - 1 : prev));

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="step1" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Create Your Circle Account</CardTitle>
              <CardDescription>Start your journey to better credit.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input id="full-name" placeholder="John Doe" required value={fullName} onChange={e => setFullName(e.target.value)} disabled={isLoading} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} />
                   <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                    onClick={() => setShowPassword(prev => !prev)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input id="confirm-password" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} disabled={isLoading} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                    onClick={() => setShowConfirmPassword(prev => !prev)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Help us understand you</CardTitle>
              <CardDescription>What are your main goals?</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {goals.map(goal => (
                <div key={goal.id} className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
                  <goal.icon className="h-6 w-6 text-primary" />
                  <div className="flex-1">
                    <Label htmlFor={goal.id} className="font-medium">{goal.label}</Label>
                  </div>
                  <Checkbox id={goal.id} />
                </div>
              ))}
            </CardContent>
          </motion.div>
        );
    }
  };

  return (
    <>
      <div className="flex justify-between items-center w-full">
        <AppLogo />
        <SignupProgress currentStep={step} totalSteps={totalSteps} />
      </div>
      <Card className="w-full">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={prevStep}>Back</Button>
          ) : <div></div>}
          
          {step < totalSteps ? (
             <Button onClick={nextStep} className="bg-gradient-to-r from-primary to-accent text-white" disabled={isLoading}>
              {isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => router.push('/dashboard')} className="w-full bg-gradient-to-r from-primary to-accent text-white">
              Enter Dashboard
            </Button>
          )}
        </CardFooter>
      </Card>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="underline">
          Login
        </Link>
      </div>
    </>
  );
}
