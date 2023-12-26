import { connectToDB } from "@/utlis/database";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { token } = await req.json();
  console.log(token);
  try {
    await connectToDB();
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 400 });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "User Verified Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Failed to Verify the User" },
      { status: 500 }
    );
  }
};
