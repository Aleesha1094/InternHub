import { NextResponse } from "next/server";
import Internship_Test from "../../../../../Models/Internship_Test";
import connectDb from "../../../../../middleware/dbConnection";

// export async function PUT(request, { params }) {
//     try {
//       const { id } = params;
//       const { newOption: options, newQuestion: question, newIndex: correctOptionIndex } = await request.json();
//       await connectDb();
//       const updatedInternship_Test = await Internship_Test.findByIdAndUpdate(id, { options, question, correctOptionIndex }, { new: true });
  
//       if (!updatedInternship_Test) {
//         console.error("Internship_Test not found");
//         return NextResponse.json({ error: "Internship_Test not found" }, { status: 404 });
//       }
//       return NextResponse.json({ message: "Internship_Test updated", updatedInternship_Test }, { status: 200 });
//     } catch (error) {
//       console.error("Error updating Internship_Test:", error);
//       return NextResponse.json({ error: "Error updating Internship_Test" }, { status: 500 });
//     }
//   }

export async function GET(request, { params }) {
  try {
    const { id } = params;
    await connectDb();
    const Internship_Tests = await Internship_Test.findOne({ _id: id });
    return NextResponse.json({ Internship_Tests }, { status: 200 });  
} catch (error) {
    return NextResponse.json({ error: "Error fetching Test" }, { status: 500 });
  }
}