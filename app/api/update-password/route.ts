import { NextResponse } from "next/server"
import { db } from "@/lib/db";
import bcrypt from "bcrypt"


export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, currentPassword, newPassword } = body;
    if (!email) {
      return NextResponse.json({ success: false, message: "Something went wrong please login again!" }, { status: 400 })
    }

    const [rows] = await db.query("SELECT password FROM users WHERE email = ?", [email])
    const user = (rows as any[])[0]

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }


    const isValid = await bcrypt.compare(currentPassword, user.password)

    if (!isValid) {
      return NextResponse.json({ success: false, message: "Current password is incorrect" }, { status: 401 })
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)
    await db.query("UPDATE users SET password = ? WHERE email = ?", [hashedNewPassword, email])

    const res = NextResponse.json({ success: true })

    return res;
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}