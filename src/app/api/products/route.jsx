import { ProductItem } from "@/models/ProductItem";
import mongoose from "mongoose";
import { isAdmin } from "../auth/[...nextauth]/route";

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  if (await isAdmin()) {
    const productItem = await ProductItem.create(data);
    return Response.json(productItem);
  } else {
    return Response.json({});
  }
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(await ProductItem.find());
}

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  if (await isAdmin()) {
    const { _id, ...data } = await req.json();
    await ProductItem.findByIdAndUpdate(_id, data);
  }
  return Response.json(true);
}

export async function DELETE(req) {
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get("_id");
  if (await isAdmin()) {
    await ProductItem.deleteOne({ _id });
  }

  return Response.json(true);
}
