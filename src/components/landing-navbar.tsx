'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';

import { LanguageSelector } from '@/components/language-selector';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Jobs', href: '/jobs' },
  { label: 'Learn More', href: '/learn-more' },
];

export function LandingNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500/20 via-blue-500/20 to-cyan-500/20 ring-1 ring-sky-500/25">
            <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
          </span>
          <span className="bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-lg font-semibold tracking-tight text-transparent transition-all group-hover:from-sky-600 group-hover:to-blue-500 dark:group-hover:from-sky-400 dark:group-hover:to-cyan-300">
            HireBlue
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sky-500/10 hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <LanguageSelector />
          <Link href="/login">
            <Button variant="ghost" className="rounded-full px-4">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button
              variant="ghost"
              className="rounded-full border border-sky-500/30 bg-sky-500/10 px-4 text-sky-700 hover:bg-sky-500/20 dark:text-sky-300"
            >
              Get Started
            </Button>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[84vw] max-w-sm border-l border-border/50">
              <SheetHeader>
                <SheetTitle>Navigate</SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col px-4 pb-6">
                <div className="mt-4 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link
                        href={link.href}
                        className="rounded-xl px-3 py-2 text-sm font-medium text-foreground/90 transition-colors hover:bg-sky-500/10"
                      >
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <ThemeToggle />
                  <LanguageSelector />
                </div>

                <div className="mt-auto flex flex-col gap-2">
                  <SheetClose asChild>
                    <Link href="/login">
                      <Button variant="ghost" className="w-full rounded-full">
                        Login
                      </Button>
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/register">
                      <Button
                        variant="ghost"
                        className="w-full rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-700 hover:bg-sky-500/20 dark:text-sky-300"
                      >
                        Get Started
                      </Button>
                    </Link>
                  </SheetClose>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
