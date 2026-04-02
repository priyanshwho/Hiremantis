'use client';

import React, { ReactNode } from 'react';

import { useScrollReveal } from '@/hooks/use-scroll-reveal';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  stagger?: number | boolean;
  yAmount?: number;
  duration?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  stagger = 0.1,
  yAmount = 100,
  duration = 0.8,
  className = '',
}: ScrollRevealProps) {
  const containerRef = useScrollReveal({
    duration,
    delay,
    stagger,
    yAmount,
  });

  // Find all children that should animate
  const childrenWithReveal = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        'data-scroll-reveal': true,
      } as Record<string, unknown>);
    }
    return child;
  });

  return (
    <div ref={containerRef} className={className}>
      {childrenWithReveal}
    </div>
  );
}

// Simpler version that wraps a single element
interface ScrollRevealItemProps {
  children: ReactNode;
  className?: string;
}

export function ScrollRevealItem({ children, className = '' }: ScrollRevealItemProps) {
  const containerRef = useScrollReveal({ duration: 0.8, yAmount: 100 });

  return (
    <div ref={containerRef} className={className}>
      <div data-scroll-reveal>{children}</div>
    </div>
  );
}
