/* eslint-disable @typescript-eslint/no-unused-vars */
import { uploadToCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {

        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({
                error: "Validation error"
            }, { status: 401 });
        }

        const result = await uploadToCloudinary(file);

        return NextResponse.json({
            ok: true,
            message: "Category added successfully",
            data: result
        }, { status: 201 });

    } catch (error) {

        return NextResponse.json({
            error: "Server error"
        }, { status: 401 });
    }
}