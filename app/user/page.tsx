"use client";

import Navbar from "@/components/NavBar/NavBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader/loader";

type Store = {
    id: number;
    name: string;
    address: string;
    overallRating: number;
    userRating?: number;
    tempRating?: number;
    noOfRating?: number;
};

export default function UserPage() {
    const { username, email } = useUser();
    const [stores, setStores] = useState<Store[]>([]);
    const [search, setSearch] = useState("");
    const router = useRouter();
    const [loader, setLoader] = useState(false);

    const fetchStores = async () => {
        setLoader(true);
        const res = await fetch("/api/getAllStore", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (data.success) {
            setStores(data.data);
            console.log("Fetched stores:", data.data);
        }
        setLoader(false);
    };

    useEffect(() => {
        if (!username) {
            router.push("/login");
            return;
        }
        fetchStores();
    }, [username, router, email]);

    const handleTempRating = (storeId: number, rating: number) => {
        setStores((prev) =>
            prev.map((s) =>
                s.id === storeId ? { ...s, tempRating: rating } : s
            )
        );
    };

    const handleSubmit = async (storeId: number) => {
        const store = stores.find((s) => s.id === storeId);
        if (!store || store.tempRating === undefined) return;
        setLoader(true);

        await fetch("/api/rateStore", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ storeId, rating: store.tempRating, email, user: username }),
        });
        setLoader(false);

        fetchStores();
    };

    const handleClear = async (storeId: number) => {
        await fetch("/api/clearRating", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ storeId, email }),
        });

        fetchStores();
    };

    const filteredStores = stores.filter(
        (store) =>
            store.name.toLowerCase().includes(search.toLowerCase()) ||
            store.address.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar name={username} title="User Page" />

            {loader && <Loader show={loader} />}

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
                                            onClick={() =>
                                                !store.userRating && handleTempRating(store.id, star)
                                            }
                                            disabled={!!store.userRating}
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

                                    {store.tempRating !== undefined && !store.userRating && (
                                        <Button size="sm" onClick={() => handleSubmit(store.id)}>
                                            Submit
                                        </Button>
                                    )}

                                    {store.userRating && (
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
                                    {store.userRating ? "You already rated" : "Submit a rating"}
                                </p>
                            </div>

                            <div className="text-right">
                                <p className="text-sm">
                                    Overall Rating:{" "}
                                    <span className="font-bold">{store.overallRating} ({store.noOfRating})</span>
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
    );
}
