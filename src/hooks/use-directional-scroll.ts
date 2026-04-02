'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

interface UseDirectionalScrollOptions {
  duration?: number;
  delay?: number;
  xAmount?: number;
}

type Direction = 'left' | 'right';

export function useDirectionalScroll(
  direction: Direction,
  options: UseDirectionalScrollOptions = {}
) {
  const { duration = 0.8, delay = 0, xAmount = 100 } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current.querySelector('[data-scroll-reveal]');
    if (!element) return;

    const xValue = direction === 'left' ? -xAmount : xAmount;

    gsap.set(element, {
      x: xValue,
      opacity: 0,
    });

    gsap.to(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'top 50%',
        toggleActions: 'play none none none',
        once: true,
      },
      x: 0,
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out',
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [direction, duration, delay, xAmount]);

  return containerRef;
}
