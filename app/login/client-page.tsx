import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Library illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#0E4D97] items-center justify-center p-8"> {/* bg-blue-600 */}
        <div className="max-w-md">
          <Image
            src="/library.png"
            alt="Library illustration with people reading and organizing books"
            width={400}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Login</h1>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-600 font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-600 font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
