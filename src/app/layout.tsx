import './globals.css';

import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Manrope, Space_Grotesk } from 'next/font/google';
import { getLocale } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

import MicrosoftClarity from '@/lib/microsoft-clarity';
import PostHogScript from '@/lib/posthog-script';
import RootProvider from '@/provider/root-provider';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'HireBlue - AI Interview Platform for Modern Hiring',
  description:
    'Our AI-driven platform transforms the recruitment process from job posting to candidate selection. Automate interviews, analyze resumes, and make data-driven hiring decisions.',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml', sizes: 'any' }],
    apple: '/images/favicon.svg',
  },
  // manifest: "/manifest.json",
  // themeColor: "#0C4A6E",
  // openGraph: {
  //   title: "HireBlue - AI Interview Platform for Modern Hiring",
  //   description:
  //     "Transform your hiring process with AI-powered interviews and candidate analysis",
  //   images: ["/images/HireBlue-logo.svg"],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "HireBlue - AI Interview Platform for Modern Hiring",
  //   description:
  //     "Transform your hiring process with AI-powered interviews and candidate analysis",
  //   images: ["/images/HireBlue-logo.svg"],
  // },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${manrope.variable} ${spaceGrotesk.variable} antialiased`}>
        <NextTopLoader color="hsl(var(--primary))" />
        <RootProvider>
          <div className="relative flex min-h-screen flex-col">
            <MicrosoftClarity />
            <PostHogScript />
            <Analytics />
            <div className="flex-1">{children}</div>
          </div>
          <Toaster richColors />
        </RootProvider>
      </body>
    </html>
  );
}
