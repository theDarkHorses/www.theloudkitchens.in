import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
      publicRoutes:["/", "/home", "/search", "/whatsnew","/profile","/address","/restaurants/:id","/address/:id","/orders"]
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
