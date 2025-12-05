'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AppLogo } from '@/components/app-logo';
import { SignupProgress } from '@/components/signup-progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowRight, Check, CreditCard, ShieldCheck, TrendingUp, Upload, Smartphone, Landmark, PiggyBank, CircleDollarSign, Eye, EyeOff } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useFirebase } from '@/firebase/provider';
import { useToast } from '@/hooks/use-toast';


const totalSteps = 4;

const goals = [
  { id: 'improve', label: 'I want to improve my credit score', icon: TrendingUp },
  { id: 'access', label: 'I want easier access to credit', icon: CreditCard },
  { id: 'insights', label: 'I want financial insights', icon: ShieldCheck },
];

const institutions = [
  { name: 'M-Pesa', icon: Smartphone, type: 'upload' },
  { name: 'Your Bank', icon: Landmark, type: 'connect' },
  { name: 'Your SACCO', icon: PiggyBank, type: 'connect' },
  { name: 'Digital Lenders', icon: CircleDollarSign, description: 'Tala, Branch, etc.' },
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
  const secureShieldImage = PlaceHolderImages.find(img => img.id === 'signup-secure-shield');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Passwords do not match.',
      });
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });
      nextStep();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Sign-up Failed',
        description: error.message,
      });
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
                <Input id="full-name" placeholder="John Doe" required value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} />
                   <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <div className="relative">
                  <Input id="confirm-password" type={showConfirmPassword ? "text" : "password"} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                    onClick={() => setShowConfirmPassword(prev => !prev)}
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
      case 3:
        return (
          <motion.div key="step3" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Connect Your Financial Accounts</CardTitle>
              <CardDescription>Aggregate your financial behavior to build your unified credit score.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {institutions.map(inst => (
                <Card key={inst.name} className="overflow-hidden">
                  <CardContent className="p-4 flex items-center">
                    <inst.icon className="h-8 w-8 text-primary mr-4" />
                    <div className="flex-1">
                      <h3 className="font-semibold">{inst.name}</h3>
                      {inst.description && <p className="text-sm text-muted-foreground">{inst.description}</p>}
                    </div>
                    {inst.type === 'upload' ? (
                      <Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4" /> Upload</Button>
                    ) : (
                      <Button variant="outline" size="sm"><Check className="mr-2 h-4 w-4" /> Connect</Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
            <CardHeader className="items-center text-center">
              {secureShieldImage &&
                <Image
                    src={secureShieldImage.imageUrl}
                    alt={secureShieldImage.description}
                    data-ai-hint={secureShieldImage.imageHint}
                    width={150}
                    height={150}
                    className="mb-4"
                />
              }
              <CardTitle className="font-headline text-2xl">You're all set!</CardTitle>
              <CardDescription>Let&apos;s build your credit future, together.</CardDescription>
            </CardHeader>
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
            <Button onClick={nextStep} className="bg-gradient-to-r from-primary to-accent text-white">
              Continue <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={() => router.push('/')} className="w-full bg-gradient-to-r from-primary to-accent text-white">
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
