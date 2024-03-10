import { Schema, model, models } from "mongoose";

const BrandSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const Brand = models?.Brand || model("Brand", BrandSchema);
