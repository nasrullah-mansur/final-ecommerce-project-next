/* eslint-disable @typescript-eslint/no-explicit-any */

import generateKey from '@/lib/genarateKey';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (file: any) => {

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileBase64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    try {
        const res = await cloudinary.uploader.upload(fileBase64, {
            public_id: generateKey(),
            resource_type: "auto",
        });
        return res;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error;
    }
};