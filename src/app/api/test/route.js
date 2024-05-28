import Internship_Test from "@/models/Internship_Test";
import connectDb from "@/utils/dbConnection";
import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     const { options, question, correctOptionIndex } = await request.json();
//     await connectDb();
//     await Internship_Test.create({ options, question, correctOptionIndex });
//     return NextResponse.json({ message: "Internship_Test Created" }, { status: 201 });
//   } catch (error) {
//     return NextResponse.json({ error: "Error creating Internship_Test" }, { status: 500 });
//   }
// }

export async function GET() {
  try {
    await connectDb();
    const Internship_Tests = await Internship_Test.find();
    return NextResponse.json({ Internship_Tests });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching Internship_Test" }, { status: 500 });
  }
}

// export async function DELETE(request) {
//   try {
//     const id = request.nextUrl.searchParams.get("id");
//     await connectDb();
//     await Internship_Test.findByIdAndDelete(id);
//     return NextResponse.json({ message: "Internship Test deleted" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: "Error deleting Test" }, { status: 500 });
//   }
// }