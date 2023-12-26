import { Schema, model, models } from "mongoose";

const FoodSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  foodName: {
    type: String,
    required: true,
  },
  foodPrice: {
    type: String,
    required: true,
  },
  foodImage: {
    type: String,
    required: true,
  },
  foodCategory: {
    type: String,
    required: true,
  },
});

const Food = models.Food || model("Food", FoodSchema);

export default Food;
