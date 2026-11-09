import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Admin from "@/models/Admin.model";
import { verifyPassword, createToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    await connectToDatabase();

    // Database mein admin check karein
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Password verify karein
    const isPasswordValid = await verifyPassword(password, admin.passwordHash);
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // JWT Token generate karein
    const token = await createToken({ adminId: admin._id.toString(), email: admin.email });

    // Response banayein aur HTTP-only cookie set karein
    const response = NextResponse.json({ success: true, message: "Logged in successfully" });
    
    response.cookies.set({
      name: "admin_token",
      value: token,
      httpOnly: true, // Client-side JS isko read nahi kar sakti (Security)
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}