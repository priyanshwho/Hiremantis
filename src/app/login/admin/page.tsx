'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

import { AuthPageShell } from '@/components/auth/auth-page-shell';
import { LoginForm } from '@/components/auth/login-form';
import { AnimatedAuthCard } from '@/components/ui/auth-card';

export default function AdminLoginPage() {
  // Create footer content with animations
  const footerContent = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="text-sm text-muted-foreground text-center"
    >
      Not an admin? Login as a{' '}
      <Link
        href="/login/recruiter"
        className="text-primary underline underline-offset-4 hover:text-primary/90"
      >
        recruiter
      </Link>{' '}
      or{' '}
      <Link
        href="/login/candidate"
        className="text-primary underline underline-offset-4 hover:text-primary/90"
      >
        candidate
      </Link>
    </motion.div>
  );

  return (
    <AuthPageShell colorScheme="cyan">
      <AnimatedAuthCard
        title="Admin Login"
        description="Enter your credentials to access the admin dashboard"
        colorScheme="cyan"
        footer={footerContent}
      >
        <LoginForm role="admin" />
      </AnimatedAuthCard>
    </AuthPageShell>
  );
}
