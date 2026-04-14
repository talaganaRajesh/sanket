import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

// Classes mapping for reference
const CLASSES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Python backend URL - defaults to localhost, but can be overridden
const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL || 'http://localhost:5000';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const videoFile = formData.get('video') as File;

    if (!videoFile) {
      return NextResponse.json(
        { success: false, error: 'No video file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!videoFile.type.startsWith('video/')) {
      return NextResponse.json(
        { success: false, error: 'File must be a video' },
        { status: 400 }
      );
    }

    console.log(`🎥 Received video: ${videoFile.name} (${videoFile.size} bytes)`);

    // Create temporary file path
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, `sanket_${Date.now()}_${videoFile.name}`);

    try {
      // Convert File to Buffer and save temporarily
      const arrayBuffer = await videoFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(tempFilePath, buffer);

      console.log(`💾 Saved video to: ${tempFilePath}`);

      // Create FormData for Python backend
      const pythonFormData = new FormData();
      
      // Read the saved file and create a new File object
      const fileContent = fs.readFileSync(tempFilePath);
      const blob = new Blob([fileContent], { type: videoFile.type });
      pythonFormData.append('video', blob, videoFile.name);

      console.log(`🔄 Sending to Python backend: ${PYTHON_BACKEND_URL}/api/predict`);

      // Send to Python backend
      const pythonResponse = await fetch(`${PYTHON_BACKEND_URL}/api/predict`, {
        method: 'POST',
        body: pythonFormData,
        timeout: 300000, // 5 minute timeout for long video processing
      });

      // Clean up temporary file
      try {
        fs.unlinkSync(tempFilePath);
      } catch (err) {
        console.error('Error deleting temp file:', err);
      }

      if (!pythonResponse.ok) {
        const errorData = await pythonResponse.json().catch(() => ({
          error: `Python backend returned ${pythonResponse.status}`
        }));
        
        console.error('❌ Python backend error:', errorData);
        
        return NextResponse.json(
          { 
            success: false, 
            error: errorData.error || 'Video processing failed',
            details: errorData
          },
          { status: pythonResponse.status || 500 }
        );
      }

      const predictionResult = await pythonResponse.json();

      console.log(`✅ Prediction result:`, predictionResult);

      if (predictionResult.success) {
        return NextResponse.json({
          success: true,
          prediction: predictionResult.prediction,
          confidence: predictionResult.confidence,
          topPredictions: predictionResult.top_predictions || [],
          message: 'Video processed successfully'
        });
      } else {
        return NextResponse.json(
          { 
            success: false, 
            error: predictionResult.error || 'Prediction failed'
          },
          { status: 500 }
        );
      }

    } catch (error) {
      // Clean up temporary file on error
      try {
        if (fs.existsSync(tempFilePath)) {
          fs.unlinkSync(tempFilePath);
        }
      } catch (err) {
        console.error('Error cleaning temp file:', err);
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('❌ Could not connect to Python backend:', error.message);
        return NextResponse.json(
          { 
            success: false, 
            error: 'Video processing service unavailable. Make sure the Python backend is running on ' + PYTHON_BACKEND_URL
          },
          { status: 503 }
        );
      }

      throw error;
    }

  } catch (error) {
    console.error('❌ Upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process video',
        message: error instanceof Error ? error.message : 'An error occurred while processing your video',
      },
      { status: 500 }
    );
  }
}

// Handle GET requests
export async function GET() {
  return NextResponse.json({
    message: 'ASL Video Recognition API',
    version: '3.0.0',
    status: 'Real AI Inference Enabled',
    supportedClasses: CLASSES,
    pythonBackendUrl: PYTHON_BACKEND_URL,
    endpoints: {
      upload: 'POST /api/upload - Upload video for ASL prediction (send file as "video" field)',
    },
  });
}