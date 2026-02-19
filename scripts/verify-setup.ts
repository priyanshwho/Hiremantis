#!/usr/bin/env tsx

/**
 * Setup Verification Script
 * Checks if all required environment variables are configured
 */

import * as fs from 'fs';
import * as path from 'path';

const ENV_FILE = '.env.local';

interface EnvCheck {
  name: string;
  required: boolean;
  description: string;
}

const ENV_VARIABLES: EnvCheck[] = [
  { name: 'MONGODB_URI', required: true, description: 'MongoDB connection string' },
  { name: 'NEXTAUTH_SECRET', required: true, description: 'NextAuth encryption secret' },
  { name: 'NEXTAUTH_URL', required: true, description: 'NextAuth base URL' },
  { name: 'AUTH_URL', required: true, description: 'Auth base URL' },
  { name: 'RESEND_API_KEY', required: false, description: 'Resend email service API key' },
  { name: 'ADMIN_EMAIL', required: false, description: 'Admin email for notifications' },
  { name: 'REGISTRATION_ENABLED', required: false, description: 'Registration toggle' },
  { name: 'AWS_ACCESS_KEY_ID', required: false, description: 'AWS S3 access key' },
  { name: 'AWS_SECRET_ACCESS_KEY', required: false, description: 'AWS S3 secret key' },
  { name: 'AWS_REGION', required: false, description: 'AWS region' },
  { name: 'AWS_ENDPOINT_URL_S3', required: false, description: 'S3 endpoint URL' },
  { name: 'AWS_BUCKET_NAME', required: false, description: 'S3 bucket name' },
  { name: 'GOOGLE_API_KEY', required: false, description: 'Google Gemini AI API key' },
  { name: 'DEEPGRAM_API_KEY', required: false, description: 'Deepgram TTS API key' },
];

function checkEnvFile() {
  console.log('🔍 Checking environment configuration...\n');

  const envPath = path.join(process.cwd(), ENV_FILE);

  if (!fs.existsSync(envPath)) {
    console.error(`❌ ${ENV_FILE} file not found!`);
    console.log(`\n💡 Create it by copying the template:`);
    console.log(`   cp .env.example .env.local\n`);
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');
  const envVars: Record<string, string> = {};

  // Parse env file
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...valueParts] = trimmed.split('=');
      const value = valueParts.join('=').trim();
      if (key && value && value !== 'your_' + key.toLowerCase().replace(/_/g, '_')) {
        envVars[key] = value;
      }
    }
  });

  let hasErrors = false;
  let hasWarnings = false;

  console.log('📋 Environment Variables Status:\n');

  ENV_VARIABLES.forEach((check) => {
    const isSet = envVars[check.name] && !envVars[check.name].startsWith('your_');

    if (check.required) {
      if (isSet) {
        console.log(`✅ ${check.name} - ${check.description}`);
      } else {
        console.log(`❌ ${check.name} - ${check.description} (REQUIRED)`);
        hasErrors = true;
      }
    } else {
      if (isSet) {
        console.log(`✅ ${check.name} - ${check.description}`);
      } else {
        console.log(`⚠️  ${check.name} - ${check.description} (optional)`);
        hasWarnings = true;
      }
    }
  });

  console.log('\n' + '='.repeat(60));

  if (hasErrors) {
    console.log('\n❌ Setup incomplete! Please configure all required environment variables.');
    console.log('📖 See SETUP.md for detailed instructions.\n');
    process.exit(1);
  } else if (hasWarnings) {
    console.log('\n⚠️  Setup is functional but some optional features may not work.');
    console.log('💡 Configure optional variables for full functionality.');
    console.log('📖 See SETUP.md for detailed instructions.\n');
  } else {
    console.log('\n✅ All environment variables are configured!');
    console.log('🚀 You can now start the development server with: npm run dev\n');
  }
}

try {
  checkEnvFile();
} catch (error) {
  console.error('Error checking environment:', error);
  process.exit(1);
}
