import {NextRequest, NextResponse} from "next/server";
import {getCurrentUser} from "@/services/AuthService";

export async function middleware (req: NextRequest) {
    const currentUser = await getCurrentUser();
    if(!currentUser) {
        return NextResponse.redirect(new URL("/login",req.url));
    }
    return NextResponse.next()
}

export const config = {
    matcher: ['/landlord-dashboard/:path*','/tenant-dashboard/:path*',]
}