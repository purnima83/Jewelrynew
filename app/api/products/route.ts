import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/product"; // Admin model

export async function GET() {
  await connectToDatabase();
  const products = await Product.find();
  return Response.json(products);
}
