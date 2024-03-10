import mongoose, { model, models, Schema } from "mongoose";

const PriceSchema = new Schema({
  name: String,
  price: Number,
  priceBeforeDiscount: Number,
});

const ProductItemSchema = new Schema(
  {
    id: { type: mongoose.Types.ObjectId },
    image: { type: String },
    name: { type: String },
    brand: { type: String },
    category: { type: String },
    label: { type: String },
    sizes: { type: [PriceSchema] },
  },
  { timestamps: true }
);


export const ProductItem =
  models?.ProductItem || model("ProductItem", ProductItemSchema);
