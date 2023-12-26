import { connectToDB } from "@/utlis/database";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/utlis/mailer";

export const POST = async (req) => {
  const { username, email, password } = await req.json();
  try {
    await connectToDB();
    const userWithEmail = await User.findOne({ email });
    const userWithUsername = await User.findOne({ username });

    if (userWithEmail) {
      return NextResponse.json(
        { message: "Email Already Registred" },
        { status: 400 }
      );
    }
    if (userWithUsername) {
      return NextResponse.json(
        { message: "Username Already Taken" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      hashedPassword,
      provider: "credentials",
    });
    const savedUser = await newUser.save();

    // Send Verification Email
    await sendEmail({ email, userId: savedUser._id });

    return NextResponse.json({ newUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Register User" },
      { status: 500 }
    );
  }
};
