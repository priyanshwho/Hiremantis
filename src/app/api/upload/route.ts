import { PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';
import { createS3Client } from '@/lib/s3-client';

// Create S3 client for server-side operations (only if credentials are available)
const s3Client =
  process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY ? createS3Client() : null;

export async function POST(req: NextRequest) {
  try {
    // Check if AWS S3 is configured
    const s3Configured =
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_BUCKET_NAME;

    if (!s3Configured) {
      return NextResponse.json(
        {
          error: 'Service Unavailable',
          message: 'File upload is not configured. Please add AWS S3 credentials to .env.local',
        },
        { status: 503 }
      );
    }

    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'You must be logged in to upload files',
        },
        { status: 401 }
      );
    }

    // Get form data with the file
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Bad Request', message: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type (PDF only)
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Bad Request', message: 'Only PDF files are allowed' },
        { status: 400 }
      );
    }

    // Generate a unique filename
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const key = `resumes/${timestamp.toString().slice(0, 6)}/${fileName}`;
    const bucketName = process.env.AWS_BUCKET_NAME || 'hirelytics';

    // Convert file to buffer for S3 upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to S3
    if (!s3Client) {
      throw new Error('S3 client not initialized');
    }

    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    // Construct S3 URL
    const fileUrl = `${process.env.AWS_ENDPOINT_URL_S3}/${bucketName}/${key}`;

    // Convert file to base64 for database storage
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    // Return success response with file info and S3 key for generating signed URLs later
    return NextResponse.json({
      success: true,
      file: {
        url: fileUrl,
        fileName: fileName,
        base64: `data:${file.type};base64,${base64}`,
        key: key,
        bucket: bucketName,
      },
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', message: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
