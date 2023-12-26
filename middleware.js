import { NextResponse } from "next/server";

export function middleware(request) {
  const authToken = request.cookies.get("next-auth.session-token")?.value;
  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname === "/pages/login" ||
    request.nextUrl.pathname === "/pages/register" ||
    request.nextUrl.pathname === "/pages/verifyEmail";

  if (loggedInUserNotAccessPaths) {
    if (authToken) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return;
    }
  }
  if (!authToken) {
    return NextResponse.redirect(new URL("/pages/login", request.url));
  }
}

export const config = {
  matcher: [
    "/pages/login",
    "/pages/register",
    "/pages/profile/private",
    "/pages/cart",
    "/pages/verifyEmail",
  ],
};
