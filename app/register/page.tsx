'use client'

import {useState} from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const [error, setError] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-zinc-800 p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && <p className="text-red-500 text-sm my-4">{error}</p>}
        <form className="flex flex-col space-y-2">
          <label htmlFor="username" className="text-sm font-medium">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="address" className="text-sm font-medium">Address</label>
          <input
            type="text"
            id="address"
            placeholder="Address"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <label htmlFor="confirm-password" className="text-sm font-medium">Confirm Password</label>
          <input
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
