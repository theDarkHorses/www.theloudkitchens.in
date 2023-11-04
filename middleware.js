import { userAgent, NextResponse } from "next/server"
import { authMiddleware } from "@clerk/nextjs";
import { DESKTOPWEBSITEURL, PUBLICROUTES } from "./app/utils/constants";

export default authMiddleware({
  beforeAuth: (req) => {
    const { device } = userAgent(req)
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop'
    if (viewport !== "mobile") {
      return NextResponse.redirect(new URL(DESKTOPWEBSITEURL).toString(), { status: 302 })
    }

  },
  publicRoutes: PUBLICROUTES,
  ignoredRoutes: [],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
