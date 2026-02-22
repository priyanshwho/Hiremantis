'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { Suspense, useEffect } from 'react';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only initialize PostHog if the API key is provided and not in development
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY && process.env.NODE_ENV !== 'development') {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: '/ingest',
        ui_host: 'https://us.posthog.com',
        capture_pageview: false, // We capture pageviews manually
        capture_pageleave: true, // Enable pageleave capture
        capture_exceptions: true, // This enables capturing exceptions using Error Tracking, set to false if you don't want this
        debug: false,
      });
    }
  }, []);

  // If PostHog key is not provided or in development, just render children without PostHog provider
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY || process.env.NODE_ENV === 'development') {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <SuspendedPostHogPageView />
      {children}
    </PHProvider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      const search = searchParams.toString();
      if (search) {
        url += '?' + search;
      }
      posthog.capture('$pageview', { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
