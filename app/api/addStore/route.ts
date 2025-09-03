import { NextResponse } from "next/server";
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, ownerEmail, address } = body;
    console.log(name, ownerEmail, address)
    if (!name || !ownerEmail || !address) {
      return new NextResponse(JSON.stringify({ success: false, message: "Invalid store data" }), { status: 400 });
    }

    const [rows] = await db.query("SELECT role FROM users WHERE email = ?", [ownerEmail]) as [{ role: string }[], any];
    const user = rows[0];

    if (!user) {
      return new NextResponse(JSON.stringify({ success: false, message: "Email not found. Please create a user with this Email" }), { status: 404 });
    }

    if (user.role !== "owner") {
        return new NextResponse(JSON.stringify({ success: false, message: "User is not an owner" }), { status: 403 });
    }


    await db.query("INSERT INTO stores (name, ownerEmail, address) VALUES (?, ?, ?)", [name, ownerEmail, address]);

    return new NextResponse(JSON.stringify({ success: true }), { status: 201 });

  } catch (error) {
    console.error("Error adding store:", error);
    return new NextResponse(JSON.stringify({ success: false, message: "Failed to add store" }), { status: 500 });
  }
}