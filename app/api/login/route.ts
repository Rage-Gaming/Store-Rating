import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const JWT_SECRET = process.env.JWT_SECRET || "store_rating_jwt_secret@2211"

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

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    })

    const res = NextResponse.json({ success: true, user: { id: user.id, username: user.username, email: user.email, role: user.role } });
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("Login error:", err)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}