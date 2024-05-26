import { NextResponse } from "next/server";
import connectDb from "@/utils/dbConnection";
import Company_Internships from "@/models/Company_Internships";

export async function PUT(request, { params }) {
    try {
      const { id } = params;
      const { Title: title, City: city, Description: description, C_url: c_url, Contact_email: contact_email, Duration: duration  } = await request.json();
      await connectDb();
      const updatedCompany_Internships = await Company_Internships.findByIdAndUpdate(id, { title, city, description, c_url, contact_email, duration, eligibilityCriteria }, { new: true });
  
      if (!updatedCompany_Internships) {
        console.error("Internship Not Found!");
        return NextResponse.json({ error: "Internship Not Found!" }, { status: 404 });
      }
      return NextResponse.json({ message: "Internship Updated!", updatedCompany_Internships }, { status: 200 });
    } catch (error) {
      console.error("Error Updating Internship:", error);
      return NextResponse.json({ error: "Error Updating Internship!" }, { status: 500 });
    }
  }

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectDb();
    const Company_Internshipss = await Company_Internships.findOne({ _id: id });
    // if (!Company_Internshipss) {
    //   return NextResponse.json({ error: "Internship not found" }, { status: 404 });
    // }
    return NextResponse.json({ Company_Internshipss }, { status: 200 });  
} catch (error) {
    return NextResponse.json({ error: "Error fetching Internship" }, { status: 500 });
  }
}