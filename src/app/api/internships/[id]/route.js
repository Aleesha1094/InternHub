import { NextResponse } from "next/server";
import Internships from "@/models/Internships";
import connectDb from "@/utils/dbConnection";

export async function PUT(request, { params }) {
    try {
      const { id } = params;
      const { Company_title: company_title, Title: title, City: city, Description: description, Url: url } = await request.json();
      await connectDb();
      const updatedInternships = await Internships.findByIdAndUpdate(id, {  company_title, title, city, description, url }, { new: true });
      return NextResponse.json({ message: "Internship Updated!", updatedInternships }, { status: 200 });
    } catch (error) {
      console.error("Error Updating Internship:", error);
      return NextResponse.json({ error: "Error Updating Internship!" }, { status: 500 });
    }
  }

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectDb();
    const Internshipss = await Internships.findOne({ _id: id });
    return NextResponse.json({ Internshipss }, { status: 200 });  
} catch (error) {
    return NextResponse.json({ error: "Error fetching Internship" }, { status: 500 });
  }
}