import { NextResponse } from "next/server";
import { db } from "@/lib/db"

export async function POST(req: Request) {
    try {
        const userCountResult = await db.query('SELECT COUNT(*) AS total_users FROM users');
        const rows = userCountResult[0] as { total_users: number }[];

        const storesCountResult = await db.query('SELECT COUNT(*) AS total_stores FROM stores');
        const storesRows = storesCountResult[0] as { total_stores: number }[];

        const userDetails = await db.query('SELECT id, username, email, address, role, roleLabel FROM users');

        const storeDetails = await db.query('SELECT id, name, ownerEmail, address, overAllRating, noOfRating FROM stores');

        return NextResponse.json({ success: true, data: { userCount: rows[0].total_users, storeCount: storesRows[0].total_stores, userDetails, storeDetails } });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return new NextResponse(JSON.stringify({ success: false, message: errorMessage }), { status: 500 });
    }
}