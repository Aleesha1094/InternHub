import Internships from "@/models/Internships";
import connectDb from "@/utils/dbConnection";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {  company_title, title, city, description, url } = await request.json();
    await connectDb();
    await Internships.create({ company_title, title, city, description, url });
    return NextResponse.json({ message: "Internship Added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error Adding Internship!" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDb();
    const Internshipss = await Internships.find();
    return NextResponse.json({ Internshipss });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching Internships" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectDb();
    await Internships.findByIdAndDelete(id);
    return NextResponse.json({ message: "Internship Deleted!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error Deleting Internship!" }, { status: 500 });
  }
}