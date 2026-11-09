import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Admin from "@/models/Admin.model";
import { hashPassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Request body cannot be empty. Please provide JSON data." },
        { status: 400 }
      );
    }

    const { email, password, setupKey } = body;

    // 1. Security Check: .env.local ka ADMIN_SETUP_KEY match hona chahiye
    const validSetupKey = process.env.ADMIN_SETUP_KEY;
    if (!validSetupKey || setupKey !== validSetupKey) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid setup key" },
        { status: 403 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // 2. Check karein ki Admin pehle se toh nahi bana hua
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return NextResponse.json(
        { error: "Admin account already exists. Setup is locked." },
        { status: 400 }
      );
    }

    // 3. Password hash karein aur Admin save karein
    const hashedPassword = await hashPassword(password);
    const newAdmin = await Admin.create({
      email: email.toLowerCase().trim(),
      passwordHash: hashedPassword,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Admin account created successfully! You can now log in.",
        adminId: newAdmin._id,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.error("Admin Setup API Error:", errorMessage);

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}