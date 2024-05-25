import Company from "@/models/Company";
import connectDb from "@/utils/dbConnection";
import { NextResponse, NextRequest } from "next/server";
import crypto from 'crypto';

export async function POST(request) {
    const { token } = await request.json();
    await connectDb();
    console.log("Original Token:", token);
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    console.log("Hashed Token:", hashedToken);    
    const company = await Company.findOne({
        resetToken: hashedToken,
        resetTokenExpiry: { $gt: Date.now() }
    })
    if(!company) {
      return NextResponse.json({ message: 'Invalid token or has expired' }, {status: 400 });
    }

    return NextResponse.json({company},{status: 200 });
};