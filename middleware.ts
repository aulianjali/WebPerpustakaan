import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware triggered:", req.nextUrl.pathname); // Debug log

  const token = req.cookies.get("token"); // Ambil token dari cookie
  const url = req.nextUrl.clone();

  // Periksa apakah token ada, jika tidak, arahkan ke halaman login
  if (
    !token &&
    (url.pathname.startsWith("/admin/") ||
      url.pathname.startsWith("/pustakawan/") ||
      url.pathname.startsWith("/member/"))
  ) {
    url.pathname = "/"; // Redirect ke halaman login
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); // Izinkan akses jika token ada
}

export const config = {
  matcher: ["/(admin|pustakawan|member)/:path*"], // Satu pola untuk semua
};
