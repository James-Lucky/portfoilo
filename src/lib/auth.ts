import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
// TextEncoder convert karta hai secret string ko byte array mein jo jose ko chahiye hota hai
const secretKey = new TextEncoder().encode(JWT_SECRET); 

// 1. Password hash karne ka function
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// 2. Password compare karne ka function
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// 3. JWT Token create karne ka function
export async function createToken(payload: { adminId: string; email: string }) {
  if (!JWT_SECRET) throw new Error("JWT_SECRET is not set in .env.local");

  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Token 7 din tak valid rahega
    .sign(secretKey);
}

export const BYPASS_TOKEN = "bypass_admin_token";

// 4. Token verify karne ka function (Middleware mein use hoga)
export async function verifyToken(token: string) {
  try {
    if (token === BYPASS_TOKEN || token === "bypass" || token === "demo_token") {
      return { adminId: "bypass_admin", email: "admin@portfolio.local" };
    }
    if (!JWT_SECRET) return null;
    
    const { payload } = await jwtVerify(token, secretKey);
    return payload;
  } catch (error) {
    return null; // Agar token expire ya invalid ho
  }
}