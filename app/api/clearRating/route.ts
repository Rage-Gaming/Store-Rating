import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { storeId, email } = await req.json();

    if (!storeId || !email) {
      return NextResponse.json({ success: false, message: "Store ID and email required" });
    }

    // Remove rating
    await db.query("DELETE FROM ratings WHERE storeId = ? AND userMail = ?", [storeId, email]);

    // Recalculate rating
    const [ratings] = await db.query(
      "SELECT rating FROM ratings WHERE storeId = ?",
      [storeId]
    ) as [Array<{ rating: number }>, any];

    let sum = 0;
    if (ratings.length > 0) {
      sum = ratings.reduce((acc, r) => acc + r.rating, 0);
    }
    const newCount = ratings.length;
    const newOverall = newCount > 0 ? sum / newCount : 0;

    await db.query(
      "UPDATE stores SET sumOfRating = ?, noOfRating = ?, overallRating = ? WHERE id = ?",
      [sum, newCount, newOverall, storeId]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error clearing rating:", error);
    return NextResponse.json({ success: false, message: "Internal server error" });
  }
}
