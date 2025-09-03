import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { storeId, rating, email, user } = await req.json();

    if (!storeId || !rating || !email || !user) {
      return NextResponse.json({ success: false, message: "Store ID, rating, email, and user required" });
    }

    // Check if already rated
    const [existing] = await db.query(
      "SELECT id FROM ratings WHERE storeId = ? AND userMail = ?",
      [storeId, email]
    ) as [Array<{ id: number }>, any];

    if (existing.length > 0) {
      return NextResponse.json({ success: false, message: "Already rated" });
    }

    // Update store totals
    const [rows] = await db.query(
      "SELECT sumOfRating, noOfRating FROM stores WHERE id = ?",
      [storeId]
    ) as [Array<{ sumOfRating: number; noOfRating: number }>, any];

    if (!rows.length) {
      return NextResponse.json({ success: false, message: "Store not found" });
    }

    const newSum = rows[0].sumOfRating + rating;
    const newCount = rows[0].noOfRating + 1;
    const newOverall = newSum / newCount;

    await db.query(
      "UPDATE stores SET sumOfRating = ?, noOfRating = ?, overallRating = ? WHERE id = ?",
      [newSum, newCount, newOverall, storeId]
    );

    const [storeDetailsRows] = await db.query(
      "SELECT ownerEmail, name FROM stores WHERE id = ?",
      [storeId]
    ) as [Array<{ ownerEmail: string; name: string }>, any];

    console.log("Store details:", storeDetailsRows[0].ownerEmail, storeDetailsRows[0].name);

    await db.query(
      "INSERT INTO ratings (storeId, rating, userMail, userName, storeOwnerEmail, storeName) VALUES (?, ?, ?, ?, ?, ?)",
      [storeId, rating, email, user, storeDetailsRows[0].ownerEmail, storeDetailsRows[0].name]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error rating store:", error);
    return NextResponse.json({ success: false, message: "Internal server error" });
  }
}
