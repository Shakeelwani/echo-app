import Link from "next/link";
import { logOut } from "@/app/actions/auth";

export default function Nav({
  authed,
  userLabel,
}: {
  authed: boolean;
  userLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/10">
      <Link href="/" className="font-display text-xl tracking-wide">
        echo
      </Link>
      {authed ? (
        <div className="flex items-center gap-2">
          <Link
            href="/dashboard"
            className="btn-ghost !py-2 !px-4 hidden sm:inline-block"
          >
            Dashboard
          </Link>
          <Link
            href="/timeline"
            className="btn-ghost !py-2 !px-4 hidden sm:inline-block"
          >
            Timeline
          </Link>
          {userLabel && (
            <span className="text-sm text-[var(--text-secondary)] hidden md:inline mx-2">
              {userLabel}
            </span>
          )}
          <form action={logOut}>
            <button type="submit" className="btn-ghost !py-2 !px-4">
              Log out
            </button>
          </form>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link href="/login" className="btn-ghost !py-2 !px-4">
            Log in
          </Link>
          <Link href="/signup" className="btn-primary !py-2 !px-4">
            Sign up
          </Link>
        </div>
      )}
    </div>
  );
}
