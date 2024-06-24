import { NextResponse } from "next/server";
import Internships from "@/models/Internships";
import connectDb from "@/utils/dbConnection";

export async function PUT(request, { params }) {
    try {
      const { id } = params;
      const { Company_title: company_title, Title: title, Location: location, Description: description, Url: url, Duration: duration, EligibilityCriteria: eligibilityCriteria } = await request.json();
      await connectDb();
      const updatedInternships = await Internships.findByIdAndUpdate(id, {  company_title, title, location, description, duration, url, eligibilityCriteria }, { new: true });
      return NextResponse.json({ message: "Internship Updated Sucessfully", updatedInternships }, { status: 200 });
    } catch (error) {
      console.error("Error Updating Internship:", error);
      return NextResponse.json({ error: "Error Updating Internship!" }, { status: 500 });
    }
  }
  
export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectDb();
    const internshipss = await Internships.findOne({ _id: id });
    return NextResponse.json({ internshipss }, { status: 200 });  
} catch (error) {
    return NextResponse.json({ error: "Error fetching Internship" }, { status: 500 });
  }
}