import { connectToDB } from "@/utlis/database";
import Food from "@/models/Food";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const foodData = await Food.find({ creator: params.id }).populate(
      "creator"
    );
    return NextResponse.json({ foodData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch foods" },
      { status: 500 }
    );
  }
};
