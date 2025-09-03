import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { db } from "@/lib/db"


export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, email, address, password, role, roleLabel } = body
    if (!username || !email || !address || !password || !role || !roleLabel) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const [existingUserRows] = await db.query(
      "SELECT email FROM users WHERE email = ?",
      [email]
    ) as [Array<{ email: string }>, any];

    if (existingUserRows.length > 0) {
      return NextResponse.json(
        { success: false, error: "User with this email already exists" },
        { status: 400 }
      );
    }



    await db.query(
      "INSERT INTO users (username, email, address, password, role, roleLabel) VALUES (?, ?, ?, ?, ?, ?)",
      [username, email, address, hashedPassword, role, roleLabel]
    )

    return NextResponse.json({ success: true, message: "User created", user: { username, role, email } })
  } catch (err) {
    console.error("Signup error:", err)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}