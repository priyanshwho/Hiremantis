'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface UseScrollRevealOptions {
  duration?: number;
  delay?: number;
  stagger?: number | boolean;
  yAmount?: number;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const { duration = 0.8, delay = 0, stagger = false, yAmount = 100 } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('[data-scroll-reveal]');

    if (elements.length === 0) return;

    // Set initial state
    gsap.set(elements, {
      y: yAmount,
      opacity: 0,
    });

    // Create timeline for staggered animation
    elements.forEach((element, index) => {
      gsap.to(element, {
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play none none none',
          once: true,
        },
        y: 0,
        opacity: 1,
        duration,
        delay: typeof stagger === 'number' ? index * stagger : delay,
        ease: 'power2.out',
      });
    });

    return () => {
      // Cleanup ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [duration, delay, stagger, yAmount]);

  return containerRef;
}
