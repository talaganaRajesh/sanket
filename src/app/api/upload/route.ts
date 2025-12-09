import { NextResponse } from 'next/server';

// Classes mapping
const CLASSES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json(
        { success: false, error: 'No image provided' },
        { status: 400 }
      );
    }

    // Convert file to base64 for client-side processing
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString('base64');

    // Return the image data to be processed on client side
    // The actual ML prediction will happen in the browser using TensorFlow.js
    return NextResponse.json({
      success: true,
      imageData: `data:${imageFile.type};base64,${base64Image}`,
      message: 'Image received, ready for processing',
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process image',
        message: error instanceof Error ? error.message : 'An error occurred while uploading your image',
      },
      { status: 500 }
    );
  }
}

// Handle GET requests
export async function GET() {
  return NextResponse.json({
    message: 'Sign Language Image Recognition API',
    version: '2.0.0',
    supportedClasses: CLASSES,
    endpoints: {
      upload: 'POST /api/upload - Upload sign language image for prediction',
    },
  });
}