export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-black">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="flex flex-col space-y-4">
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
            Login
          </button>
        </form>
        <h6 className="mt-4">Don't have an account? <a href="/register" className="text-blue-600 hover:underline mt-2">Register</a></h6>
      </div>
    </div>
  )
}
