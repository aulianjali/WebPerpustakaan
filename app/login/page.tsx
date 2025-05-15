//page.tsx
import Image from 'next/image'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="w-1/2 bg-blue-900 flex items-center justify-center">
        <img src="/library.png" alt="Library Illustration" className="w-3/4 h-auto" />
      </div>

      {/* Right Panel */}
      <div className="w-1/2 bg-[#E5E5F7] flex items-center justify-center">
        <div className="w-full max-w-xs">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 rounded shadow text-gray-700 placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 rounded shadow text-gray-700 placeholder-gray-400"
          />
          <button className="w-full bg-blue-900 text-white p-3 rounded shadow hover:bg-blue-800 transition">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
