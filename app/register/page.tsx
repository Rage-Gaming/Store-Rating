export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-black">
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-800 py-2 rounded-lg text-white hover:bg-blue-900 transition cursor-pointer"
          >
            Register
          </button>
        </form>
        <h6 className="mt-4">Already have an account? <a href="/login" className="text-blue-600 hover:underline mt-2">Login</a></h6>
      </div>
    </div>
  )
}
