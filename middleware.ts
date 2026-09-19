import { NextResponse, type NextRequest } from "next/server"

export const LOCALES = ["pt", "en"] as const
export type Locale = (typeof LOCALES)[number]
export const DEFAULT_LOCALE: Locale = "pt"
const COOKIE = "locale"

function isLocale(value: string | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value)
}

/** Remembered choice first, then the browser's own preference. */
function preferredLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(COOKIE)?.value
  if (isLocale(saved)) return saved

  const header = request.headers.get("accept-language") ?? ""
  for (const part of header.split(",")) {
    const tag = part.trim().split(";")[0].toLowerCase()
    if (tag.startsWith("pt")) return "pt"
    if (tag.startsWith("en")) return "en"
  }

  return DEFAULT_LOCALE
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const [, first] = pathname.split("/")

  // Already addressed by locale: let it through, but tell the root layout
  // which one so <html lang> is right in the first byte of HTML.
  if (isLocale(first)) {
    const headers = new Headers(request.headers)
    headers.set("x-locale", first)

    const response = NextResponse.next({ request: { headers } })
    if (request.cookies.get(COOKIE)?.value !== first) {
      response.cookies.set(COOKIE, first, { path: "/", maxAge: 60 * 60 * 24 * 365 })
    }
    return response
  }

  const locale = preferredLocale(request)
  return NextResponse.redirect(new URL(`/${locale}${pathname === "/" ? "" : pathname}${search}`, request.url))
}

export const config = {
  matcher: [
    // Everything except API routes, the Sanity Studio, the archived /v1
    // landing, Next internals, and anything with a file extension.
    "/((?!api|internal|v1|_next|.*\\..*).*)",
  ],
}
