import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { query } from "@/lib/db";
import Nav from "@/components/Nav";
import TimelineClient from "./TimelineClient";
import type { Echo } from "@/lib/types";

export default async function TimelinePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const echoes = await query<Echo>(
    "select * from echoes where user_id = $1 order by created_at asc",
    [session.user.id]
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Nav authed userLabel={session.user.name || session.user.email || ""} />
      <main className="flex-1 px-6 md:px-10 py-8 max-w-3xl w-full mx-auto">
        <TimelineClient echoes={echoes} />
      </main>
    </div>
  );
}
