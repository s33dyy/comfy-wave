import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { fileName = "upload.jpg", dataUrl = "" } = body;

    const match = String(dataUrl).match(/^data:(image\/(?:png|jpe?g|webp));base64,(.+)$/);
    if (!match) {
      return NextResponse.json({ error: 'Upload a PNG, JPG, JPEG, or WEBP image.' }, { status: 400 });
    }
    
    const result = await cloudinary.uploader.upload(dataUrl, {
      folder: "comfy-wave",
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    return NextResponse.json({ error: "Image upload failed" }, { status: 500 });
  }
}
