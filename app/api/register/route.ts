import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { db } from "@/lib/db"


export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, email, address, password } = body
    console.log("Received user data:", body)
    if (!username || !email || !address || !password) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.query(
      "INSERT INTO users (username, email, address, password, role) VALUES (?, ?, ?, ?, ?)",
      [username, email, address, hashedPassword, "user"]
    )

    return NextResponse.json({ success: true, message: "User created" })
  } catch (err) {
    console.error("Signup error:", err)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}