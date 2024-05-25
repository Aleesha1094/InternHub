import { NextResponse } from "next/server";
import Company from "@/models/Company";
import connectDb from "@/utils/dbConnection";

export async function PUT(request, { params }) {
    try {
      const { id } = params;
      const { Email: email, Password: password, Company_name: company_name } = await request.json();
      await connectDb();
      const updatedCompany = await Company.findByIdAndUpdate(id, { email, password, company_name }, { new: true });
  
      if (!updatedCompany) {
        console.error("Company not found");
        return NextResponse.json({ error: "Company not found" }, { status: 404 });
      }
      return NextResponse.json({ message: "Company updated", updatedCompany }, { status: 200 });
    } catch (error) {
      console.error("Error updating company:", error);
      return NextResponse.json({ error: "Error updating company" }, { status: 500 });
    }
  }

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectDb();
    const company = await Company.findOne({ _id: id });
    if (!company) {
      return NextResponse.json({ error: "Company not found" }, { status: 404 });
    }
    return NextResponse.json({ company }, { status: 200 });  
} catch (error) {
    return NextResponse.json({ error: "Error fetching company" }, { status: 500 });
  }
}