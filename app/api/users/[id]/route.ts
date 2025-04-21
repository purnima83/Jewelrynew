import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  params: {
    id: string;
  };
}

export async function DELETE(req: NextRequest, context: Params) {
  try {
    await connectToDatabase();
    await User.findByIdAndDelete(context.params.id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: Params) {
  try {
    await connectToDatabase();
    const { role } = await req.json();

    if (!role) {
      return NextResponse.json({ error: "Role is required" }, { status: 400 });
    }

    await User.findByIdAndUpdate(context.params.id, { role });
    return NextResponse.json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 });
  }
}
