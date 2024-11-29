import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const curUrl = req.nextUrl.pathname;

  if (curUrl.startsWith('/write') || curUrl.startsWith('/mypage') || curUrl.startsWith('/dm')) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (token === null) {
      return NextResponse.redirect(new URL('/user/signin', req.url));
    }
  
    else {
      return NextResponse.next();
    }
  }

  else if (curUrl.startsWith('/user')) {
    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    if (token === null) {
      return NextResponse.next();
    }

    else {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}