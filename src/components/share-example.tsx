'use client';

import React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShareButtons } from '@/components/ui/share-buttons';

export function ShareExample() {
  // This should be dynamically set based on your page URL
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://example.com';
  const shareTitle = 'Check out Hiremantis - The next-gen hiring platform!';

  // If you have a Facebook app ID for Facebook Messenger sharing
  const fbAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || '';

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Share This Page</CardTitle>
        <CardDescription>
          Spread the word about Hiremantis on your favorite social media platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ShareButtons
          url={shareUrl}
          title={shareTitle}
          appId={fbAppId}
          facebookQuote="I found this amazing hiring platform called Hiremantis!"
          facebookHashtag="#Hiremantis"
          message="Hey! Check out Hiremantis, a platform that's revolutionizing the hiring process."
        />
      </CardContent>
    </Card>
  );
}
