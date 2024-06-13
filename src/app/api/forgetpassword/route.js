import Company from "@/models/Company";
import connectDb from "@/utils/dbConnection";
import { NextResponse, NextRequest } from "next/server";
import crypto from 'crypto';
import sgMail from '@sendgrid/mail';

export async function POST(request) {
    const { email } = await request.json();
    await connectDb();
    const existingUser = await Company.findOne({ email});

    if(!existingUser) {
      return NextResponse.json({ message: 'Email doesn\'t exists...' }, {status: 400 });
    }
    const resetToken = crypto.randomBytes(20).toString('hex');
    const passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

    const passwordResetExpires = Date.now() + 3600000;
    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;

    const resetUrl = `localhost:3000/resetpassword/${resetToken}`;
    // console.log(resetUrl);

    const body = "Reset Password by clicking on following URL: " + resetUrl;
    const msg = {
      to: email,
      from: '<aleesharustam@gmail.com>',
      subject: "Reset Password",
      text: body,
    }
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
    sgMail.send(msg).then(() => {
      return NextResponse.json({message: 'Email sent successfully'}, { status: 200 });
    })
    .catch(async(error) => {
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpiry = undefined;
      await existingUser.save();

      return NextResponse.json({ error: "Error sending Email. Try Again!"}, { status: 400 });
  });

  try {
    await existingUser.save();
    return NextResponse.json({ message: 'Email is sent for resetting Password' }, {status: 200});
  }
  catch(error) {
    return NextResponse.json({error}, { status: 500 });
  }
};