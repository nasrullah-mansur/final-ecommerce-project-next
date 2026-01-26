/* eslint-disable @typescript-eslint/no-unused-vars */
import { uploadToCloudinary } from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {

        const formData = await req.formData();
        const files = formData.getAll("files") as File[];


        if (!files) {
            return NextResponse.json({
                error: "Validation error"
            }, { status: 401 });
        }

        const results = await Promise.all(
            files.map((file) =>
                uploadToCloudinary(file)
            )
        );

        console.log(results);



        // const result = await uploadToCloudinary(files);

        return NextResponse.json({
            ok: true,
            message: "Category added successfully",
            data: results.map(result => result.url),
        }, { status: 201 });

    } catch (error) {

        return NextResponse.json({
            error: "Server error"
        }, { status: 401 });
    }
}