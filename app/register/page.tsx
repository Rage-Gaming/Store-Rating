'use client'

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useUser } from "../context/UserContext";
import Loader from '@/components/Loader/loader';


export default function RegisterPage() {
  const router = useRouter();
  const { setUsername, setRole, setEmail } = useUser();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    role: 'user',
    password: '',
    confirmPassword: '',
    roleLabel: 'Normal User'
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/;

    if (!passwordRegex.test(formData.password)) {
      setError("Password must be 8-16 characters, include at least one uppercase letter and one special character.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, fromAdmin: false }),
      });

      const data = await res.json();
      console.log("Registration response:", data);

      if (data.success) {
        setUsername(data.user.username);
        setRole(data.user.role);
        setEmail(data.user.email);
        router.push("/user");
      } else {
        setError(data.error);
        console.error("UUTVU", data.error);
        setLoading(false);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error("Registration error:", err);
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center">
      {loading && <Loader show={loading} />}
      <div className="bg-zinc-800 p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && <p className="text-red-500 text-sm my-4">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-sm font-medium">Username</label>
          <input
            minLength={20}
            maxLength={60}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            type="text"
            id="username"
            placeholder="Username"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            type="email"
            id="email"
            placeholder="Email"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="address" className="text-sm font-medium">Address</label>
          <input
            maxLength={400}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            type="text"
            id="address"
            placeholder="Address"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input
            minLength={6}
            maxLength={16}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            type="password"
            id="password"
            placeholder="Password"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
          <input
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-white py-2 rounded-lg text-black hover:bg-zinc-200 transition cursor-pointer"
          >
            Register
          </button>
        </form>
        <h6 className="mt-4">Already have an account? <a href="/login" className="text-blue-400 hover:underline mt-2">Login</a></h6>
      </div>
    </div>
  )
}
