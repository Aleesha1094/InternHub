import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {

  const { pathname } = req.nextUrl;

  if (pathname === "/companylogin" || pathname === "/adminlogin" || pathname === "/register") {
    return NextResponse.next();
  }

  const token = await getToken({ req });

  const companyProtectedRoutes = ["/company", "/company/view-Internship", "/company/addinternship", "/company/update-internship"];
  const adminProtectedRoutes = ["/admin", "/admin/viewinternship", "/admin/addinternship", "/admin/updateinternship", "/admin/companydetails", "/admin/feedbackdetails"];

  if (!token) {
    if (companyProtectedRoutes.includes(pathname) || adminProtectedRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/?error=Login Required", req.url));
    }
  } else {
    const userRole = token.role;
    // console.log('User role:', userRole);

    if (adminProtectedRoutes.includes(pathname) && userRole !== "admin") {
      return NextResponse.redirect(new URL("/adminlogin?error=Please login first!", req.url));
    }

    if (companyProtectedRoutes.includes(pathname) && userRole !== "company") {
      return NextResponse.redirect(new URL("/register?error=Please login first!", req.url));
    }
  }
  return NextResponse.next();
}