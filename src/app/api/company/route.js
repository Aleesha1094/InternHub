import Company from "@/models/Company";
import connectDb from "@/utils/dbConnection";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { email, password, company_name } = await request.json();
    await connectDb();
  
    const existingCompany = await Company.findOne({ email });

    if (existingCompany) {
      return new NextResponse({message: "Email is Already in Use"}, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 5);
    const newCompany = new Company({
      email,
      company_name,
      password: hashedPassword,
    });
    await newCompany.save();

    return NextResponse.json({ message: "Company Created" }, { status: 201 });
  } catch (error) {
    console.error("Error Creating Company:", error);
    return NextResponse.json({ error: "Error Creating Company!" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDb();
    const Companys = await Company.find();
    return NextResponse.json({ Companys });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching Companys" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectDb();
    await Company.findByIdAndDelete(id);
    return NextResponse.json({ message: "Company deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting Company" }, { status: 500 });
  }
}