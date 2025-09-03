'use client'

import Navbar from "../../components/NavBar/NavBar";
import { Star, StarHalf } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import { redirect } from "next/dist/client/components/navigation"


const mockStoreData = [
    {
        id: 1,
        name: "My Store",
        location: "123 Main St",
        rating: 4.5
    },
    {
        id: 2,
        name: "Another Store",
        location: "456 Elm St",
        rating: 4.0
    },
    {
        id: 3,
        name: "Third Store",
        location: "789 Oak St",
        rating: 4.2
    },
    {
        id: 4,
        name: "Fourth Store",
        location: "101 Pine St",
        rating: 4.1
    },
    {
        id: 5,
        name: "Fifth Store",
        location: "202 Maple St",
        rating: 4.3
    },
    {
        id: 6,
        name: "Sixth Store",
        location: "303 Birch St",
        rating: 4.0
    },
    {
        id: 7,
        name: "Seventh Store",
        location: "404 Cedar St",
        rating: 4.4
    }
]

const mockStoreRatingData = [
    {
        id: 1,
        storeName: "My Store",
        userName: "User 1",
        rating: 5
    },
    {
        id: 2,
        storeName: "Another Store",
        userName: "User 2",
        rating: 4
    },
    {
        id: 3,
        storeName: "Third Store",
        userName: "User 3",
        rating: 4.2
    },
    {
        id: 4,
        storeName: "Fourth Store",
        userName: "User 4",
        rating: 4.1
    },
    {
        id: 5,
        storeName: "Fifth Store",
        userName: "User 5",
        rating: 4.3
    },
    {
        id: 6,
        storeName: "Sixth Store",
        userName: "User 6",
        rating: 4
    },
    {
        id: 7,
        storeName: "Seventh Store",
        userName: "User 7",
        rating: 4.4
    }
]

export default function OwnersPage() {
    const { username, role } = useUser();

    useEffect(() => {
        if (role !== "owner") {
            redirect("/login");
        }
    }, []);

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar name={username} title="Store Owner" />

            <div className="mx-21">
                <h1 className="text-white text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-400">No of stores : {mockStoreData.length}</p>



                <div className="w-full max-h-[300px] rounded-lg mt-6 p-4 overflow-y-auto">
                    <div className="grid grid-cols-4 gap-5">
                        {mockStoreData.map((store) => (
                            <div
                                key={store.id}
                                className="bg-zinc-900 p-4 rounded-lg"
                            >
                                <h2 className="text-lg font-bold">{store.name}</h2>
                                <p className="text-gray-300">{store.location}</p>

                                <div className="flex items-center mt-2">
                                    {Array.from({ length: 5 }, (_, i) => {
                                        const full = i < Math.floor(store.rating);
                                        const half =
                                            i === Math.floor(store.rating) &&
                                            store.rating % 1 >= 0.1; // show half star if decimal part ≥ 0.1

                                        return full ? (
                                            <Star key={i} size={18} className="text-zinc-200 fill-zinc-200" />
                                        ) : half ? (
                                            <StarHalf key={i} size={18} className="text-zinc-200 fill-zinc-200" />
                                        ) : (
                                            <Star key={i} size={18} className="text-gray-400" />
                                        );
                                    })}
                                    <span className="ml-2 text-md text-white">{store.rating}</span>
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
                                        <th className="px-4 py-3 text-center text-sm font-semibold">User</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold">Store</th>
                                        <th className="px-4 py-3 text-center text-sm font-semibold">Rating</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-700">
                                    {mockStoreRatingData.map((rating) => (
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