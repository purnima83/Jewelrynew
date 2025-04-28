import { connectToDatabase } from "@/lib/mongooseConnect";
import User from "@/models/user";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ✅ DELETE: Delete user by ID (extracted from URL)
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // extract the [id]

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}

// ✅ PATCH: Update user role by ID
export async function PATCH(request: NextRequest) {
  try {
    await connectToDatabase();

    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // extract the [id]

    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const { role } = await request.json();
    await User.findByIdAndUpdate(id, { role });
    return NextResponse.json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 });
  }
}
