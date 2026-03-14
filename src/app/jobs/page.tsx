import { Metadata } from 'next';

import { JobsList } from '@/components/jobs/jobs-list';
import { LandingNavbar } from '@/components/landing-navbar';
import { AnimatedBackground } from '@/components/ui/animated-background';

export const metadata: Metadata = {
  title: 'Jobs | HireBlue',
  description: 'Find your next opportunity with our extensive job listings',
};

export default function JobsPage() {
  return (
    <div className="min-h-screen">
      <LandingNavbar />
      <AnimatedBackground
        patternColor="primary"
        colorScheme="blue"
        className="min-h-[calc(100vh-4rem)]"
      >
        <div className="container mx-auto py-6 space-y-8">
          <JobsList />
        </div>
      </AnimatedBackground>
    </div>
  );
}
