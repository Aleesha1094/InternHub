import { NextResponse } from "next/server";
import StudentFeedback from "../../../../../Models/StudentFeedback";
import connectDb from "../../../../../middleware/dbConnection";

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectDb();
    const StudentFeedbacks = await StudentFeedback.findOne({ _id: id });
    return NextResponse.json({ StudentFeedbacks }, { status: 200 });  
} catch (error) {
    return NextResponse.json({ error: "Error fetching StudentFeedback" }, { status: 500 });
  }
}