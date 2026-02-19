#!/usr/bin/env tsx

// Load environment variables from .env.local FIRST
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load .env.local
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

// Verify MongoDB URI is loaded
if (!process.env.MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in .env.local');
  process.exit(1);
}

// Now import the modules that need environment variables
import { connectToDatabase } from '../src/lib/mongodb';
import User from '../src/models/user';

async function createAdmin(name: string, email: string, password: string) {
  try {
    console.log('Connecting to database...');
    await connectToDatabase();

    // Check if admin already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.error(`Error: User with email ${email} already exists`);
      process.exit(1);
    }

    // Create admin user
    const admin = await User.create({
      name,
      email,
      password,
      role: 'admin',
      isActive: true,
    });

    console.log('✅ Admin user created successfully!');
    console.log(`Name: ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

// Get command line arguments
const args = process.argv.slice(2);

if (args.length < 3) {
  console.error(
    'Usage: pnpm tsx scripts/create-admin.ts "Admin Name" "admin@example.com" "password"'
  );
  process.exit(1);
}

const [name, email, password] = args;

createAdmin(name, email, password);
