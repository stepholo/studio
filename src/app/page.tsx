'use client';

import { AppLogo } from '@/components/app-logo';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'landing-hero');
  const phoneImage = PlaceHolderImages.find(img => img.id === 'landing-phone');

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
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent"></div>
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
            <div className="max-w-3xl px-4">
              <h1 className="font-headline text-5xl font-bold md:text-7xl">
                Own your wealth
              </h1>
              <p className="mt-4 text-lg text-white/80 md:text-xl">
                Origin is your personal AI Financial Advisor. Track your
                spending, investments, net worth and optimize your financial
                future—all in one place.
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href="/signup">
                  Get Started <ArrowRight className="ml-2" />
                </Link>
              </Button>
              <div className="relative mx-auto mt-8 max-w-md">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  className="w-full rounded-full border border-border/30 bg-background/50 py-3 pl-10 pr-12 text-foreground placeholder:text-muted-foreground backdrop-blur-sm"
                  placeholder="Can I retire by 60?"
                />
                <Button
                  size="icon"
                  className="absolute inset-y-1 right-1 h-10 w-10 rounded-full"
                >
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Simplify Section */}
        <section className="bg-background py-20 md:py-32">
          <div className="container text-center">
            <h2 className="font-headline text-4xl font-bold md:text-6xl">
              Simplify your money
            </h2>
            <div className="relative mx-auto mt-12 max-w-4xl">
              {phoneImage && (
                <Image
                  src={phoneImage.imageUrl}
                  alt={phoneImage.description}
                  width={1000}
                  height={563}
                  className="rounded-2xl"
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
            &copy; {new Date().getFullYear()} The Circle Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}
