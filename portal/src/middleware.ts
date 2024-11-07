import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';
    const TOKEN_SECRET = new TextEncoder().encode(process.env.TOKEN_SECRET || 'Secret_Key');

    let isAuthenticated = false;

    if (token) {
        try {
            await jwtVerify(token, TOKEN_SECRET);
            isAuthenticated = true; 
        } catch (error) {
            console.error("Token verification failed:", error);
        }
    }

    const publicPaths = ['/login', '/signup'];
    if (publicPaths.includes(path) && isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const protectedPaths = ['/', '/profile','/components/Attentance'];
    if (protectedPaths.includes(path) && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        '/',
        '/components/Attentance',
        '/profile',
        '/login',
        '/signup',
    ],
};
