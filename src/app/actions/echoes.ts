"use server";

import { auth } from "@/auth";
import { query } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { EchoResult, EchoType } from "@/lib/types";

export interface ActionState {
  error?: string;
  success?: boolean;
}

export async function createEcho(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "You need to be logged in." };

  const type = String(formData.get("type") || "") as EchoType;
  const title = String(formData.get("title") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const unlockDate = String(formData.get("unlockAt") || "");
  const timezone = String(formData.get("timezone") || "UTC");

  if (!type || !title || !content || !unlockDate) {
    return { error: "Fill in the type, title, message, and unlock date." };
  }

  const unlockAt = new Date(unlockDate);
  const status = unlockAt.getTime() <= Date.now() ? "ready" : "sealed";

  try {
    await query(
      `insert into echoes (user_id, type, title, content, unlock_at, timezone, status)
       values ($1, $2, $3, $4, $5, $6, $7)`,
      [session.user.id, type, title, content, unlockAt.toISOString(), timezone, status]
    );
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save echo." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/timeline");
  return { success: true };
}

export async function deleteEcho(echoId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not logged in.");

  // user_id check in the WHERE clause is what stops one user deleting another's echo
  await query("delete from echoes where id = $1 and user_id = $2", [
    echoId,
    session.user.id,
  ]);
  revalidatePath("/dashboard");
  revalidatePath("/timeline");
}

export async function markOpened(echoId: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not logged in.");

  await query(
    `update echoes set status = 'opened', opened_at = now()
     where id = $1 and user_id = $2 and status = 'ready'`,
    [echoId, session.user.id]
  );
  revalidatePath("/dashboard");
  revalidatePath("/timeline");
}

export async function answerEcho(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await auth();
  if (!session?.user?.id) return { error: "You need to be logged in." };

  const echoId = String(formData.get("echoId") || "");
  const answer = String(formData.get("answer") || "").trim();
  const resultRaw = String(formData.get("result") || "");
  const result = resultRaw ? (resultRaw as EchoResult) : null;

  if (!echoId || !answer) {
    return { error: "Write what happened before saving." };
  }

  // Confirm this echo actually belongs to the logged-in user before touching it
  const owned = await query<{ id: string }>(
    "select id from echoes where id = $1 and user_id = $2",
    [echoId, session.user.id]
  );
  if (owned.length === 0) {
    return { error: "That echo couldn't be found." };
  }

  try {
    await query(
      "insert into echo_answers (echo_id, user_id, answer, result) values ($1, $2, $3, $4)",
      [echoId, session.user.id, answer, result]
    );
    await query(
      "update echoes set status = 'answered', answered_at = now() where id = $1 and user_id = $2",
      [echoId, session.user.id]
    );
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Failed to save answer." };
  }

  revalidatePath("/dashboard");
  revalidatePath("/timeline");
  return { success: true };
}
