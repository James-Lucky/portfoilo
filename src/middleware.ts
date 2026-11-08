import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Kal yahan authentication check aur token verification ka code aayega
  return NextResponse.next();
}

export const config = {
  matcher: [], // Filhaal empty rakha hai taaki aaj koi redirection na ho
};