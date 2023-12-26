import { connectToDB } from "@/utlis/database";
import Food from "@/models/Food";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const { userId, foodName, foodPrice, foodImage, foodCategory } =
    await req.json();
  try {
    await connectToDB();
    const addFoodData = new Food({
      creator: userId,
      foodName,
      foodPrice,
      foodImage,
      foodCategory,
    });
    await addFoodData.save();
    return NextResponse.json({ addFoodData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to add Food" },
      { status: 500 }
    );
  }
};
