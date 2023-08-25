import { authMiddleware, currentUser, redirectToSignIn } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  debug:false,
  publicRoutes: ["/", "/api/v1/:path*", "/sign-in", "/sign-up"],
  async afterAuth(auth, req, evt){
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    console.log(auth);

  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/api/v1/:path*","/(api|trpc)(.*)"],
};
