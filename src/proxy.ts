import {NextResponse, type NextRequest} from "next/server"


export const proxy = (req: NextRequest) => {
    const token = req.cookies.get('token')?.value;
    const path = req.nextUrl.pathname;
    if (path === "/") {
        if (token) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        } else {
            return NextResponse.redirect(new URL("/login", req.url))
        }
    }
    if (!token) {
        const redirectUrl = new URL('/signup', req.url);
        return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
}


// Your provided paths
export const config = {
    matcher: [
        '/contacts/:path*',
        '/dashboard/:path*',
        '/'
    ]
}