'use client'

import Navbar from "@/components/NavBar/NavBar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Star } from "lucide-react"
import { useUser } from "../context/UserContext";
import { redirect } from "next/dist/client/components/navigation"

type Store = {
    id: number
    name: string
    address: string
    overallRating: number
    userRating?: number
    tempRating?: number
}

const mockStores: Store[] = [
    { id: 1, name: "White Oak Market", address: "1200 Oak St, Springfield", overallRating: 3.7, userRating: 1 },
    { id: 2, name: "Blackstone Grocers", address: "88 River Ave, Westfield", overallRating: 3.0 },
    { id: 3, name: "Monochrome Deli", address: "42 Center Rd, Lakeview", overallRating: 4.8 },
    { id: 4, name: "Noir & Blanc Coffee", address: "9 3rd St, Midtown", overallRating: 4.4 },
]

export default function UserPage() {
    const { username } = useUser();
    const [stores, setStores] = useState(mockStores)
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (!username) {
            redirect('/login');
        }
    }, []);

    const handleTempRating = (storeId: number, rating: number) => {
        setStores((prev) =>
            prev.map((store) =>
                store.id === storeId ? { ...store, tempRating: rating } : store
            )
        )
    }

    const handleSubmit = (storeId: number) => {
        setStores((prev) =>
            prev.map((store) =>
                store.id === storeId
                    ? { ...store, userRating: store.tempRating, tempRating: undefined }
                    : store
            )
        )
    }

    const handleClear = (storeId: number) => {
        setStores((prev) =>
            prev.map((store) =>
                store.id === storeId
                    ? { ...store, userRating: undefined, tempRating: undefined }
                    : store
            )
        )
    }

    const filteredStores = stores.filter(
        (store) =>
            store.name.toLowerCase().includes(search.toLowerCase()) ||
            store.address.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar name={username} title="User Page" />

            <div className="max-w-3xl mx-auto px-6 py-8">
                <h1 className="text-2xl font-bold">Stores</h1>
                <p className="text-gray-400">
                    Search by name or address and rate from 1 to 5.
                </p>

                <div className="mt-4">
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or address"
                        className="bg-zinc-900 text-white border-zinc-700"
                    />
                </div>

                <div className="mt-6 space-y-4">
                    {filteredStores.map((store) => (
                        <div
                            key={store.id}
                            className="bg-zinc-900 border border-zinc-700 rounded-lg p-5 flex justify-between"
                        >
                            <div>
                                <h2 className="font-bold text-lg">{store.name}</h2>
                                <p className="text-gray-400">{store.address}</p>

                                <div className="mt-3 flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => handleTempRating(store.id, star)}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`w-6 h-6 ${((store.tempRating ?? store.userRating) ?? 0) >= star
                                                        ? "fill-white text-white"
                                                        : "text-gray-500"
                                                    }`}
                                            />
                                        </button>
                                    ))}

                                    {store.tempRating !== undefined && (
                                        <Button
                                            size="sm"
                                            variant="default"
                                            onClick={() => handleSubmit(store.id)}
                                        >
                                            Submit
                                        </Button>
                                    )}

                                    {(store.userRating || store.tempRating) && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => handleClear(store.id)}
                                        >
                                            Clear
                                        </Button>
                                    )}
                                </div>

                                <p className="text-sm text-gray-400 mt-1">
                                    {store.userRating ? "Modify your rating" : "Submit a rating"}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-sm">
                                    Overall Rating:{" "}
                                    <span className="font-bold">{store.overallRating}/5</span>
                                </p>
                                <p className="text-sm text-gray-400">
                                    Your Rating: {store.userRating ?? "—"}
                                </p>
                            </div>
                        </div>
                    ))}

                    {filteredStores.length === 0 && (
                        <p className="text-gray-400">No stores found.</p>
                    )}
                </div>
            </div>
        </div>
    )
}
