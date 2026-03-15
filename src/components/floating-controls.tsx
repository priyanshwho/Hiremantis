'use client';

import { motion } from 'framer-motion';
import { Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { LanguageSelector } from '@/components/language-selector';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingControlsProps {
  className?: string;
  side?: 'left' | 'right';
}

export function FloatingControls({ className, side = 'right' }: FloatingControlsProps) {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'fixed z-50 flex flex-col items-center gap-4 rounded-2xl p-3',
        'bg-gradient-to-br from-primary/18 via-background/85 to-accent/20',
        'dark:from-primary/25 dark:via-background/90 dark:to-accent/15',
        'border border-border/70 backdrop-blur-xl',
        'shadow-[0_16px_34px_-24px_rgba(10,29,54,0.7)]',
        side === 'left' ? 'left-4' : 'right-4',
        'top-1/2 -translate-y-1/2',
        className
      )}
    >
      <Link href="/">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full border border-primary/30 bg-primary/12 text-primary"
        >
          <Home size={20} />
          <span className="sr-only">Home</span>
        </Button>
      </Link>
      <ThemeToggle />
      <LanguageSelector />
    </motion.div>
  );
}
