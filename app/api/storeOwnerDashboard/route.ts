import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const { email } = await req.json();

    const [stores] = await db.query('SELECT * FROM stores WHERE ownerEmail = ?', [email]);
    const [ratings] = await db.query('SELECT * FROM ratings WHERE storeOwnerEmail = ?', [email]);

    console.log(stores)

    return NextResponse.json({ success: true, data: { stores, ratings } });
}