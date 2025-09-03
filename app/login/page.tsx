'use client'

import { useState, useEffect } from "react";
import { redirect } from 'next/navigation';
import { useRouter } from "next/navigation"
import Loader from "@/components/Loader/loader";
import { useUser } from "../context/UserContext";

export default function LoginPage() {
  const router = useRouter()
  const { setUsername, setRole } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/checkToken", {
          method: "GET",
          credentials: "include",
        })

        const data = await res.json()
        if (data.success) {
          console.log(data)
          setUsername(data.user.name);
          setRole(data.user.role);
          if (data.user.role === "admin") {
            router.push("/admin");
          } else if (data.user.role === "owner") {
            router.push("/owner");
          } else {
            router.push("/user");
          }
        }
      } catch (err) {
        console.error("Not logged in:", err)
      }
    }

    checkUser()
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      setLoading(false);
      if (data.user.role === "admin") {
        redirect("/admin");
      } else if (data.user.role === "owner") {
        redirect("/owner");
      } else {
        redirect("/user");
      }
    }

    if (!data.success) {
      setLoading(false);
      setError(data.error);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center">
      {loading && <Loader show={loading} size={40} color="black" />}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-black">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 text-sm my-4">{error}</p>}
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-800 py-2 rounded-lg text-white hover:bg-blue-900 transition cursor-pointer"
          >
            Login
          </button>
        </form>
        <h6 className="mt-4">Don't have an account? <a href="/register" className="text-blue-600 hover:underline mt-2">Register</a></h6>
      </div>
    </div>
  )
}
