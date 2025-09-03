import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const [stores] = await db.query(
      "SELECT id, name, address, overallRating, noOfRating FROM stores"
    ) as [Array<{ id: number; name: string; address: string; overallRating: number; noOfRating: number }>, any];

    const [userRatings] = await db.query(
      "SELECT storeId, rating FROM ratings WHERE userMail = ?",
      [email]
    ) as [Array<{ storeId: number; rating: number }>, any];
    
    const mergedStores = stores.map((store) => {
      const userRating = userRatings.find((r) => Number(r.storeId) === Number(store.id));
      return { 
        ...store, 
        userRating: userRating ? Number(userRating.rating) : undefined 
      };
    });

    return NextResponse.json({ success: true, data: mergedStores });
  } catch (error) {
    console.error("Error fetching stores:", error);
    return NextResponse.json({ success: false, message: "Internal server error" });
  }
}
