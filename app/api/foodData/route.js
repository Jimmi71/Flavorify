import { connectToDB } from "@/utlis/database";
import Food from "@/models/Food";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectToDB();
    const foodData = await Food.find({}).populate("creator");
    return NextResponse.json({ foodData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch foods" },
      { status: 500 }
    );
  }
};
