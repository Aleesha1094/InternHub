import Company_Internships from "@/models/Company_Internships";
import connectDb from "@/utils/dbConnection";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {  companyId,title, location, description, c_url, contact_email, duration, eligibilityCriteria } = await request.json();
    await connectDb();
    await Company_Internships.create({ companyId,title, location, description, c_url, contact_email, duration, eligibilityCriteria  });
    return NextResponse.json({ message: "Internship Added" }, { status: 201 });
  } catch (error) {
    console.error("Error adding internship:", error);
    return NextResponse.json({ error: "Error Adding Internship!" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDb();
    const CompanyInternships = await Company_Internships.find();
    return NextResponse.json({ data: CompanyInternships }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error Fetching Company Internships" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectDb();
    await Company_Internships.findByIdAndDelete(id);
    return NextResponse.json({ message: "Internship Deleted!" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error Deleting Internship!" }, { status: 500 });
  }
}