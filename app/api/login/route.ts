import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body
    
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email])
    const user = (rows as any[])[0]

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }


    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 })
    }

    return NextResponse.json({ success: true, message: "Login successful", userId: user.id })
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}