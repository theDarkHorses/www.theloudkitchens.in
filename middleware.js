import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/home",
    "/search",
    "/whatsnew",
    "/restaurants/:id",
    "/cart",
    "/coupons"
  ],
  ignoredRoutes: [],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
