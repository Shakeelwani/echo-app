import type { NextAuthConfig } from "next-auth";

const PROTECTED_PATHS = ["/dashboard", "/timeline"];

export const authConfig: NextAuthConfig = {
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
  providers: [], // real providers (with DB access) are added in src/auth.ts only
  callbacks: {
    authorized({ auth, request }) {
      const isProtected = PROTECTED_PATHS.some((p) =>
        request.nextUrl.pathname.startsWith(p)
      );
      if (isProtected) return !!auth?.user;
      return true;
    },
  },
};
