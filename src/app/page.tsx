'use client';

import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@/firebase/auth/use-user';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function LandingPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  const heroImage = PlaceHolderImages.find(img => img.id === 'landing-hero');
  const phoneImage = PlaceHolderImages.find(img => img.id === 'landing-phone');

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);


  if (loading || user) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="p-4 lg:p-6 w-full max-w-4xl mx-auto flex flex-col gap-4">
              <Skeleton className="h-96 w-full" />
              <Skeleton className="h-64" />
          </div>
        </div>
      )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <AppLogo />
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href="/login"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                Log In
              </Link>
              <Button asChild>
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full">
          {heroImage && (
            <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              data-ai-hint={heroImage.imageHint}
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
             <div className="max-w-3xl px-4 text-white">
              <h1 className="font-headline text-5xl font-bold md:text-7xl">
                A unified path to better credit.
              </h1>
              <p className="mt-4 text-lg text-white/80 md:text-xl">
                All your money , one score, better loans.
              </p>
              <Button asChild size="lg" className="mt-8 bg-gradient-to-r from-primary to-accent text-white">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Simplify Section */}
        <section className="bg-background py-20 md:py-32">
          <div className="container text-center">
            <h2 className="font-headline text-4xl font-bold md:text-6xl">
              Simplify your money
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground md:text-lg">
                Connect all your financial accounts in one place to get a complete picture of your wealth and unlock personalized insights.
            </p>
            <div className="relative mx-auto mt-12 max-w-4xl">
              {phoneImage && (
                <Image
                  src={phoneImage.imageUrl}
                  alt={phoneImage.description}
                  width={1000}
                  height={563}
                  className="rounded-2xl shadow-2xl"
                   data-ai-hint={phoneImage.imageHint}
                />
              )}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by You, Powered by The Circle.
          </p>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} The Circle Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
