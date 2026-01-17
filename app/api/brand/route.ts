/* eslint-disable @typescript-eslint/no-unused-vars */

import { dbConnect } from "@/db/mongodb";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Brand } from "@/models/brand.model";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();

        const data = await Brand.find();

        return NextResponse.json({
            ok: true,
            data,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            error: "Server error"
        }, { status: 401 });
    }
}

export async function POST(req: Request) {
    try {

        const formData = await req.formData();
        const file = formData.get("image") as File;
        const title = formData.get("title");
        const status = formData.get("status");

        if (!title || !file) {
            return NextResponse.json({
                error: "Validation error"
            }, { status: 401 });
        }

        const result = await uploadToCloudinary(file);

        const slug = slugify(title as string);

        await dbConnect();

        await Brand.create({
            title,
            image: result.url,
            slug: slug,
            status,
        });

        return NextResponse.json({
            ok: true,
            message: "Brand added successfully"
        }, { status: 201 });

    } catch (error) {

        return NextResponse.json({
            error: "Server error"
        }, { status: 401 });
    }
}

export async function PUT(req: Request) {

    try {

        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({
                error: "No id found"
            }, {
                status: 401
            })
        }

        await dbConnect();

        const data = await Brand.findOne({ _id: Object(id) });

        return NextResponse.json({
            ok: true,
            data,
        }, { status: 200 });

    } catch (error) {
        return NextResponse.json({
            error: "Server error"
        }, { status: 401 });
    }
}

export async function PATCH(req: Request) {
    try {

        const formData = await req.formData();
        const file = formData.get("image") as File;
        const title = formData.get("title")
        const id = formData.get("id");
        const status = formData.get("status");

        console.log(id);


        if (!title || !id) {
            return NextResponse.json({
                error: "Validation error"
            }, { status: 401 });
        }

        await dbConnect();

        if (file) {
            console.log("test");

            const result = await uploadToCloudinary(file);

            await Brand.findByIdAndUpdate(id, {
                title,
                image: result.url,
                slug: slugify(title as string),
                status,
            });
        } else {
            await Brand.findByIdAndUpdate(id, {
                title,
                slug: slugify(title as string),
                status,
            });
        }

        return NextResponse.json({
            ok: true,
            message: "Brand added successfully"
        }, { status: 201 });

    } catch (error) {

        return NextResponse.json({
            error: "Server error",
        }, { status: 401 });
    }
}

export async function DELETE(req: Request) {
    try {

        const { id } = await req.json();

        await dbConnect();

        await Brand.findByIdAndDelete(id);

        return NextResponse.json({
            ok: true,
            message: "Brand added successfully"
        }, { status: 201 });

    } catch (error) {

        return NextResponse.json({
            error: "Server error",
        }, { status: 401 });
    }
}