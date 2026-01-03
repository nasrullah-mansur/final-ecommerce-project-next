import { connectDB } from "@/lib/db";
import { User } from "@/models/user.model";
import hashPass from "@/utils/hashPass";
import { NextResponse } from "next/server";

export async function GET() {
    await connectDB();

    console.log("connected to db");

    const users = await User.find();

    return NextResponse.json({
        status: 200,
        message: "user retrieved successfully",
        data: users
    })

}

export async function POST(req: Request) {
    await connectDB();
    const reqData = await req.json();

    const user = await User.insertOne({
        name: reqData.name,
        email: reqData.email,
        password: await hashPass(reqData.password),
        role: reqData.role,
    })

    return NextResponse.json({
        status: 201,
        message: "user created successfully",
        data: user
    })
}