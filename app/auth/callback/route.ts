import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest) {
//     const { searchParams } = new URL(req.url);
//     const code = searchParams.get("code");
//     const locale = req.nextUrl.pathname.split("/")[1] || "en";

//     if (code) {
//         const cookieStore = await cookies();
//         const supabase = createServerClient(
//             process.env.NEXT_PUBLIC_SUPABASE_URL!,
//             process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//             {
//                 cookies: {
//                     getAll: () => cookieStore.getAll(),
//                     setAll: (cookies) => {
//                         cookies.forEach(({ name, value, options }) => {
//                             cookieStore.set(name, value, options);
//                         });
//                     },
//                 },
//             }
//         );

//         const { data } = await supabase.auth.exchangeCodeForSession(code);
//         const username = data?.user?.user_metadata?.username;

//         if (username) {
//             return NextResponse.redirect(
//                 new URL(`/${locale}/dashboard/${username}`, req.url)
//             );
//         }
//     }

//     return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
// }

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const locale = searchParams.get("locale") || "en";

    if (code) {
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll: () => cookieStore.getAll(),
                    setAll: (cookies) => {
                        cookies.forEach(({ name, value, options }) => {
                            cookieStore.set(name, value, options);
                        });
                    },
                },
            }
        );

        const { data } = await supabase.auth.exchangeCodeForSession(code);
        const username = data?.user?.user_metadata?.username;

        if (username) {
            return NextResponse.redirect(
                new URL(`/${locale}/dashboard/${username}`, req.url)
            );
        }
    }

    return NextResponse.redirect(new URL(`/${locale}/login`, req.url));
}