import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

// 1. .env.local se MONGODB_URI read karna
const envPath = path.resolve(process.cwd(), ".env.local");
let mongoUri = process.env.MONGODB_URI;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("MONGODB_URI=")) {
      mongoUri = trimmed.replace("MONGODB_URI=", "").replace(/["']/g, "").trim();
      break;
    }
  }
}

if (!mongoUri) {
  console.error("❌ MONGODB_URI not found in .env.local");
  process.exit(1);
}

// 2. Admin Schema definition
const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);

async function run() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUri);
    console.log(" Connected to MongoDB successfully!");

    const adminEmail = "admin@example.com";
    const plainPassword = "YourStrongPassword123";

    // Pehle check karo agar pehle se bana hai
    const existing = await Admin.findOne({ email: adminEmail });
    if (existing) {
      console.log(`⚠️ Admin with email "${adminEmail}" already exists in database!`);
      await mongoose.disconnect();
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(plainPassword, salt);

    await Admin.create({
      email: adminEmail,
      passwordHash: passwordHash,
    });

    console.log("🎉 SUCCESS: Admin account created in MongoDB!");
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: ${plainPassword}`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err.message);
    process.exit(1);
  }
}

run();