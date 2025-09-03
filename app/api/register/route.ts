import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { db } from "@/lib/db"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "store_rating_jwt_secret@2211"


export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { username, email, address, password, role, roleLabel, fromAdmin } = body
    if (!username || !email || !address || !password || !role || !roleLabel) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const [existingUserRows] = await db.query(
      "SELECT email FROM users WHERE email = ?",
      [email]
    ) as [Array<{ email: string }>, any];

    if (existingUserRows.length > 0) {
      return NextResponse.json(
        { success: false, message: "User with this email already exists" },
        { status: 400 }
      );
    }

    await db.query(
      "INSERT INTO users (username, email, address, password, role, roleLabel) VALUES (?, ?, ?, ?, ?, ?)",
      [username, email, address, hashedPassword, role, roleLabel]
    )

    const [user] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    ) as [Array<{ id: number }>, any];

    if (!fromAdmin) {
      const token = jwt.sign({ id: user[0].id, username, email, role }, JWT_SECRET, {
        expiresIn: "7d",
      })

      const res = NextResponse.json({ success: true, message: "User created", user: { username, role, email } })
      res.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
      return res;
    }

    return NextResponse.json({ success: true, message: "User created", user: { username, role, email } })
  } catch (err) {
    console.error("Signup error:", err)
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 })
  }
}