/* eslint-disable @typescript-eslint/no-unused-vars */

import { dbConnect } from "@/db/mongodb";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Slider } from "@/models/slider.model";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    try {

        const formData = await req.formData();
        const file = formData.get("image") as File;
        const title = formData.get("title")

        if (!title || !file) {
            return NextResponse.json({
                error: "Validation error"
            }, { status: 401 });
        }

        const result = await uploadToCloudinary(file);

        await dbConnect();

        await Slider.create({
            title,
            image: result.url,
        });

        return NextResponse.json({
            ok: true,
            message: "Slider added successfully"
        }, { status: 201 });

    } catch (error) {
        return NextResponse.json({
            error: "Server error"
        }, { status: 401 });
    }
}