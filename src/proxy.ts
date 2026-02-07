import{ NextResponse, type NextRequest } from "next/server"


export const proxy = (req: NextRequest) => {
    const token = req.cookies.get('token')?.value;
    
    if(!token) {
        const redirectUrl = new URL('/signup', req.url);
        return NextResponse.redirect(redirectUrl);
    }
    return NextResponse.next();
}



// Your provided paths
export const config = {
    matcher: [
      '/contacts',
      '/contacts/addresses',
      '/dashboard/:path*'
    ]
}