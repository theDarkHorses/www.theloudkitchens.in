import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
      publicRoutes:["/", "/home", "/search", "/whatsnew"]
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};