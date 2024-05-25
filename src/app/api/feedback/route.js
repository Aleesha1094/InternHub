import StudentFeedback from "@/models/StudentFeedback";
import connectDb from "@/utils/dbConnection";
import { NextResponse } from "next/server";
import sgMail from '@sendgrid/mail';

export async function POST(request) {
  try {
    const { user_email, user_name,subject, message } = await request.json();
    await connectDb();
    await StudentFeedback.create({ user_email, user_name,subject, message  });

    const body = "Name : " + user_name + "/nEmail : " + user_email + "/nSubject : " + subject + "/nMessage : " + message;
    const msg = {
      to: '<aleesharustam@gmail.com>',
      from: '<aleesharustam@gmail.com>',
      subject: "Contact Us",
      text: body,
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
    await sgMail.send(msg).then(() => {
      return NextResponse.json({message: 'Email sent successfully'}, { status: 200 });
    })
    .catch(async(error) => {
      return NextResponse.json({ error: "Error sending Email. Try Again!"}, { status: 400 });
  });
    return NextResponse.json({ message: "Feedback Added" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error Adding Feedback!" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDb();
    const Feedbacks = await StudentFeedback.find();
    return NextResponse.json({ data: Feedbacks }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error Fetching User Feedbacks!" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const id = request.nextUrl.searchParams.get("id");
    await connectDb();
    await StudentFeedback.findByIdAndDelete(id);
    return NextResponse.json({ message: "Feedback deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting Feedback" }, { status: 500 });
  }
}