import { Schema, model, models } from "mongoose";

const LabelSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

export const Label = models?.Label || model("Label", LabelSchema);
