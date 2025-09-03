'use client'

import Navbar from "../../components/NavBar/NavBar";
import { Star, StarHalf, ChevronUp, ChevronDown } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useState, useEffect } from "react";
import { redirect } from 'next/navigation';
import Loader from "@/components/Loader/loader";

type StoreType = {
    id: number;
    name: string;
    ownerEmail: string;
    address: string;
    overAllRating: number;
    noOfRating: number;
};

type RatingType = {
    id: number;
    storeId: number;
    userName: string;
    storeName: string;
    rating: number;
};

export default function OwnersPage() {
    const { username, role, email } = useUser();
    const [storeData, setStoreData] = useState<StoreType[]>([]);
    const [ratingData, setRatingData] = useState<RatingType[]>([]);
    const [loading, setLoading] = useState(false);

    // 🔹 Added sorting state
    const [sortConfig, setSortConfig] = useState<{ key: keyof RatingType; direction: "asc" | "desc" } | null>(null);

    const sortedRatings = [...ratingData].sort((a, b) => {
        if (!sortConfig) return 0;
        const { key, direction } = sortConfig;
        const order = direction === "asc" ? 1 : -1;

        if (typeof a[key] === "string" && typeof b[key] === "string") {
            return (a[key] as string).localeCompare(b[key] as string) * order;
        }
        if (typeof a[key] === "number" && typeof b[key] === "number") {
            return ((a[key] as number) - (b[key] as number)) * order;
        }
        return 0;
    });

    const handleSort = (key: keyof RatingType) => {
        setSortConfig((prev) =>
            prev && prev.key === key
                ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
                : { key, direction: "asc" }
        );
    };

    const renderSortIcon = (key: keyof RatingType) => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return sortConfig.direction === "asc" ? (
            <ChevronUp className="inline w-4 h-4 ml-1" />
        ) : (
            <ChevronDown className="inline w-4 h-4 ml-1" />
        );
    };

    useEffect(() => {
        if (role !== "owner") {
            redirect("/login");
        }

        const fetchDashBoardData = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/storeOwnerDashboard', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });
                const data = await res.json();
                if (data.success) {
                    setStoreData(data.data.stores);
                    setRatingData(data.data.ratings);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error("Error fetching dashboard data:", error);
                if (error instanceof Error) {
                    console.error("Failed to fetch dashboard data", error.message);
                } else {
                    console.error("Failed to fetch dashboard data", error);
                }
            }
        };

        fetchDashBoardData();
    }, [role]);

    return (
        <div className="min-h-screen bg-black text-white">
            {loading && <Loader show={loading} />}
            <Navbar name={username} title="Store Owner" />

            <div className="mx-21">
                <h1 className="text-white text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-400">No of stores : {storeData.length}</p>

                <div className="w-full max-h-[300px] rounded-lg mt-6 p-4 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-5">
                        {storeData.map((store) => (
                            <div
                                key={store.id}
                                className="bg-zinc-900 p-4 rounded-lg"
                            >
                                <h2 className="text-lg font-bold">{store.name}</h2>
                                <p className="text-gray-300">{store.address}</p>

                                <div className="flex items-center mt-2">
                                    {Array.from({ length: 5 }, (_, i) => {
                                        const full = i < Math.floor(store.overAllRating);
                                        const half =
                                            i === Math.floor(store.overAllRating) &&
                                            store.overAllRating % 1 >= 0.1;

                                        return full ? (
                                            <Star key={i} size={18} className="text-zinc-200 fill-zinc-200" />
                                        ) : half ? (
                                            <StarHalf key={i} size={18} className="text-zinc-200 fill-zinc-200" />
                                        ) : (
                                            <Star key={i} size={18} className="text-gray-400" />
                                        );
                                    })}
                                    <span className="ml-2 text-md text-white">({store.noOfRating})</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full mt-6 p-4">
                    <h1 className="text-white text-2xl font-bold">
                        Users who rated your stores
                    </h1>

                    <div className="border border-zinc-700 rounded-lg mt-4 overflow-hidden">
                        <div className="max-h-64 overflow-y-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-zinc-800 text-white sticky top-0 z-10">
                                    <tr>
                                        <th
                                            onClick={() => handleSort("userName")}
                                            className="px-4 py-3 text-center text-sm font-semibold cursor-pointer select-none"
                                        >
                                            User {renderSortIcon("userName")}
                                        </th>
                                        <th
                                            onClick={() => handleSort("storeName")}
                                            className="px-4 py-3 text-center text-sm font-semibold cursor-pointer select-none"
                                        >
                                            Store {renderSortIcon("storeName")}
                                        </th>
                                        <th
                                            onClick={() => handleSort("rating")}
                                            className="px-4 py-3 text-center text-sm font-semibold cursor-pointer select-none"
                                        >
                                            Rating {renderSortIcon("rating")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-700">
                                    {sortedRatings.map((rating) => (
                                        <tr key={rating.id} className="hover:bg-zinc-800/60 transition-colors">
                                            <td className="px-4 py-3 text-center text-gray-200">{rating.userName}</td>
                                            <td className="px-4 py-3 text-center text-gray-200">{rating.storeName}</td>
                                            <td className="px-4 py-3 text-center font-medium text-white">{rating.rating}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
