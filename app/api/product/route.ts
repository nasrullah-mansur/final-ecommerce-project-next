/* eslint-disable @typescript-eslint/no-unused-vars */

import { dbConnect } from "@/db/mongodb";
import { Product } from "@/models/product.model";
import { SubCategory } from "@/models/subCategory.model";
import { slugify } from "@/utils/slugify";
import { NextResponse } from "next/server";

import "@/models/category.model";

export async function GET() {
    try {

        await dbConnect();

        const data = await Product.find().populate("category");
        console.log("check");

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

        const {
            title,
            slug,
            image,
            description,
            details,
            status,
            category,
            subCategory,
            gallery,
            previousPrice,
            currentPrice,
        } = await req.json();


        if (!previousPrice || !currentPrice || !title || !status || !category || !slug || !image || !description || !details || !subCategory) {
            return NextResponse.json({
                error: "Validation error"
            }, { status: 401 });
        }

        await dbConnect();

        await Product.create({
            title,
            slug,
            image,
            gallery,
            description,
            details,
            status,
            category,
            subCategory,
            previousPrice,
            currentPrice,
        });

        return NextResponse.json({
            ok: true,
            message: "Product added successfully"
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

        const data = await SubCategory.findOne({ _id: Object(id) });

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

        const { id, title, status, category } = await req.json();


        if (!id || !title || !status || !category) {
            return NextResponse.json({
                error: "Validation error"
            }, { status: 401 });
        }

        await dbConnect();


        await SubCategory.findByIdAndUpdate(id, {
            title,
            slug: slugify(title as string),
            status,
            category,
        });


        return NextResponse.json({
            ok: true,
            message: "Category added successfully"
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

        await Product.findByIdAndDelete(id);

        return NextResponse.json({
            ok: true,
            message: "Product removed successfully"
        }, { status: 201 });

    } catch (error) {

        return NextResponse.json({
            error: "Server error",
        }, { status: 401 });
    }
}