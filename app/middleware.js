import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('token')?.value;

    // Разрешённые публичные маршруты
    const PUBLIC_PATHS = ['/auth'];

    if (PUBLIC_PATHS.includes(pathname)) {
        return NextResponse.next();
    }

    try {
        if (!token) throw new Error('Нет токена');
        const user = verify(token, JWT_SECRET);

        if (pathname.startsWith('/admin') && user.role !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        return NextResponse.next();
    } catch {
        return NextResponse.redirect(new URL('/auth', request.url));
    }
}

export const config = {
    matcher: ['/messages/:path*', '/admin/:path*'],
};
