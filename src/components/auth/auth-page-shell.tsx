'use client';

import * as React from 'react';

import { LandingNavbar } from '@/components/landing-navbar';
import { AnimatedBackground } from '@/components/ui/animated-background';

interface AuthPageShellProps {
  children: React.ReactNode;
  colorScheme?: 'blue' | 'purple' | 'cyan' | 'indigo' | 'default';
}

export function AuthPageShell({ children, colorScheme = 'indigo' }: AuthPageShellProps) {
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <AnimatedBackground
        colorScheme={colorScheme}
        patternColor="primary"
        className="min-h-[calc(100vh-4rem)]"
      >
        <div className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center px-4 py-8">
          <div className="pointer-events-none absolute inset-0 bg-background/25 backdrop-blur-md" />
          <div className="relative z-10 w-full max-w-md">{children}</div>
        </div>
      </AnimatedBackground>
    </div>
  );
}
