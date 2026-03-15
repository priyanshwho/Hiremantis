'use client';

import { motion } from 'framer-motion';
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import * as React from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations('Common.theme');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-gradient-to-br from-primary/15 via-background to-accent/20 text-primary shadow-[0_12px_24px_-20px_rgba(14,85,152,0.95)]"
        >
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="animate-in fade-in-50 zoom-in-95 min-w-40 rounded-xl border-border/70 bg-popover/95 shadow-[0_20px_42px_-30px_rgba(15,24,44,0.65)] backdrop-blur-md data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={`flex items-center gap-2 cursor-pointer ${
            theme === 'light' ? 'bg-accent/80 text-accent-foreground font-medium' : ''
          }`}
        >
          <SunIcon className="h-4 w-4" />
          <span>{t('light')}</span>
          {theme === 'light' && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-2 cursor-pointer ${
            theme === 'dark' ? 'bg-accent/80 text-accent-foreground font-medium' : ''
          }`}
        >
          <MoonIcon className="h-4 w-4" />
          <span>{t('dark')}</span>
          {theme === 'dark' && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
            />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('system')}
          className={`flex items-center gap-2 cursor-pointer ${
            theme === 'system' ? 'bg-accent/80 text-accent-foreground font-medium' : ''
          }`}
        >
          <LaptopIcon className="h-4 w-4" />
          <span>{t('system')}</span>
          {theme === 'system' && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="ml-auto h-1.5 w-1.5 rounded-full bg-primary"
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
