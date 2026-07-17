import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// route guard: area admin richiede cookie jwt, /login accessibile solo da sloggati
export default function proxy(request: NextRequest) {
	const token = request.cookies.get("jwt")?.value;
	const { pathname } = request.nextUrl;

	const isLogin = pathname === "/login";

	if (!token && !isLogin) {
		return NextResponse.redirect(new URL("/login", request.url));
	}
	if (token && isLogin) {
		return NextResponse.redirect(new URL("/", request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|ico|webp)).*)",
	],
};
