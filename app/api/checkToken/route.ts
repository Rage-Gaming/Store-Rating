import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "store_rating_jwt_secret@2211"

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie")
  const token = cookie?.match(/token=([^;]+)/)?.[1]

  if (!token) {
    return NextResponse.json({ success: false, message: "No token" }, { status: 401 })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return NextResponse.json({ success: true, user: decoded })
  } catch (err) {
    return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 })
  }
}
