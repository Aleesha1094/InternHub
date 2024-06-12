import Company from "@/models/Company";
import connectDb from "@/utils/dbConnection";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
    const { email, password } = await request.json();
    await connectDb();
    
    const existingUser = await Company.findOne(email);
    
    const hashedPassword = await bcrypt.hash(password, 10);
    existingUser.password = hashedPassword;

    existingUser.resetToken = undefined;
    existingUser.resetTokenExpiry = undefined;

    try{
        await existingUser.save();
        return NextResponse.json({ message: "Password is Updated!" }, { status: 201 });
    }
    catch(error) {
        return NextResponse.json({error: "Something went wrong, Try Again!"}, { status: 500 });
    }
};