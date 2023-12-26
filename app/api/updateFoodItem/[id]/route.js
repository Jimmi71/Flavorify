import { connectToDB } from "@/utlis/database";
import Food from "@/models/Food";
import { NextResponse } from "next/server";

// GET Data
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const foodData = await Food.findById(params.id).populate("creator");
    return NextResponse.json({ foodData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch foods" },
      { status: 500 }
    );
  }
};

// PATCH (updata)
export const PATCH = async (req, { params }) => {
  const { foodName, foodPrice, foodImage, foodCategory } = await req.json();
  try {
    await connectToDB();
    const existingFoodData = await Food.findById(params.id);
    existingFoodData.foodName = foodName;
    existingFoodData.foodPrice = foodPrice;
    existingFoodData.foodImage = foodImage;
    existingFoodData.foodCategory = foodCategory;
    await existingFoodData.save();
    return NextResponse.json({ existingFoodData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to Update Food Item" },
      { status: 500 }
    );
  }
};

// DELETE Data
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Food.findByIdAndRemove(params.id);
    return NextResponse.json(
      { message: "Prompt Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch foods" },
      { status: 500 }
    );
  }
};
