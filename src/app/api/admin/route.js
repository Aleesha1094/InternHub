import Admin from "@/models/Admin";
import connectDb from "@/utils/dbConnection";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    await connectDb();
  
    const hashedPassword = await bcrypt.hash(password, 5);
    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      name,
    });
    await newAdmin.save();

    return NextResponse.json({ message: "Admin Created" }, { status: 201 });
  } catch (error) {
    console.error("Error creating Admin:", error);
    return NextResponse.json({ error: "Error creating Admin" }, { status: 500 });
  }
}

// export async function GET() {
//   try {
//     await connectDb();
//     const Admins = await Admin.find();
//     return NextResponse.json({ Admins }, { headers: corsHeaders});
//   } catch (error) {
//     return NextResponse.json({ error: "Error fetching Admin" }, { status: 500, headers: corsHeaders });
//   }
// }

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectDb();
    await Admin.findByIdAndDelete(id);
    return NextResponse.json({ message: "Admin Deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting Admin" }, { status: 500});
  }
}