'use client';

import React, { ReactNode } from 'react';

import { useDirectionalScroll } from '@/hooks/use-directional-scroll';

interface DirectionalScrollRevealProps {
  children: ReactNode;
  direction: 'left' | 'right';
  delay?: number;
  xAmount?: number;
  duration?: number;
  className?: string;
}

export function DirectionalScrollReveal({
  children,
  direction,
  delay = 0,
  xAmount = 100,
  duration = 0.8,
  className = '',
}: DirectionalScrollRevealProps) {
  const containerRef = useDirectionalScroll(direction, {
    duration,
    delay,
    xAmount,
  });

  // Wrap the children with data-scroll-reveal
  const childWithReveal = React.isValidElement(children)
    ? React.cloneElement(children, {
        'data-scroll-reveal': true,
      } as Record<string, unknown>)
    : children;

  return (
    <div ref={containerRef} className={className}>
      {childWithReveal}
    </div>
  );
}
