import { getToken } from "next-auth/jwt";
import { signIn } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const curUrl = req.nextUrl.pathname;

  if (curUrl.startsWith('/write')) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    console.log(curUrl, token);

    if (token === null) {
      return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }
  
    else {
      console.log(token);

      return NextResponse.next();
    }
  }
}