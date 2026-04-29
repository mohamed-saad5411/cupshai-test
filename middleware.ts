import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// export const config = {
//   matcher: ["/((?!api|_next|.*\\..*).*)"],
// };

// الجديييييييييييييييييييد 
import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import createIntlMiddleware from "next-intl/middleware";

const intlMiddleware = createIntlMiddleware(routing);

const GUEST_ONLY_ROUTES = ["/", "/compare", "/about", "/blog", "/help"];
const AUTH_ROUTES = ["/login", "/signup"];
const PROTECTED_ROUTES = ["/dashboard"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const segments = pathname.split("/");
  const locale = routing.locales.includes(segments[1] as "en" | "ar")
    ? segments[1]
    : routing.defaultLocale;

  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

  let response = NextResponse.next({
    request: { headers: req.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => req.cookies.getAll(),
        setAll: (cookies) => {
          cookies.forEach(({ name, value, options }) => {
            req.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const username = user?.user_metadata?.username;

  const isProtected = PROTECTED_ROUTES.some(
    (route) =>
      pathWithoutLocale === route ||
      pathWithoutLocale.startsWith(`${route}/`)
  );

  const isGuestOnly = GUEST_ONLY_ROUTES.some(
    (route) =>
      pathWithoutLocale === route ||
      pathWithoutLocale.startsWith(`${route}/`)
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) =>
      pathWithoutLocale === route ||
      pathWithoutLocale.startsWith(`${route}/`)
  );

  // 1. مش logged in + protected → login
  if (!user && isProtected) {
    return NextResponse.redirect(new URL(`/${locale}`, req.url));
  }

  // 2. logged in + login/signup → dashboard
  if (user && isAuthRoute) {
    return NextResponse.redirect(
      new URL(`/${locale}/dashboard`, req.url)
    );
  }

  // 3. logged in + home/about/etc → dashboard
  if (user && isGuestOnly) {
    return NextResponse.redirect(
      new URL(`/${locale}/dashboard`, req.url)
    );
  }

  // 4. كل حاجة تمام → next-intl
  const intlResponse = intlMiddleware(req);
  response.cookies.getAll().forEach(({ name, value }) => {
    intlResponse.cookies.set(name, value);
  });

  return intlResponse;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};