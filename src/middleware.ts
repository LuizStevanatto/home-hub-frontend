import { NextRequest, NextResponse } from "next/server";

function middleware(req: NextRequest) {
  const userToken = req.cookies.get("@webcasas:user_token")?.value;
  const isActivationUser = req.cookies.get(
    "@webcasas:is_activation_user"
  )?.value;
  const urlOrigin = req.nextUrl.origin;
  const pathname = req.nextUrl.pathname;
  return handleProtectRoute(urlOrigin, pathname, userToken, isActivationUser);
}

export default middleware;

function handleProtectRoute(
  urlOrigin: string,
  urlPathname: string,
  userToken: string | undefined,
  isActivationUser: string | undefined
) {
  if (urlPathname.includes("/active-account")) {
    if (!(isActivationUser == "true")) {
      return NextResponse.redirect(`${urlOrigin}/`);
    }
  }

  const routesForProtect = ["/my-register", "/form-property", "/my-ads"];
  if (!userToken && routesForProtect.includes(urlPathname)) {
    return NextResponse.redirect(`${urlOrigin}/`);
  }
}
