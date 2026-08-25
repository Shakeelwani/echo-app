"use client";

import { useActionState, useEffect, useState } from "react";
import type { Echo } from "@/lib/types";
import { TYPE_META, daysBetween } from "@/lib/echo-helpers";
import { answerEcho, markOpened, type ActionState } from "@/app/actions/echoes";

const initialState: ActionState = {};

export default function OpenEchoModal({
  echo,
  onClose,
}: {
  echo: Echo;
  onClose: () => void;
}) {
  const t = TYPE_META[echo.type];
  const [revealed, setRevealed] = useState(echo.status === "answered");
  const [state, formAction, pending] = useActionState(
    answerEcho,
    initialState
  );
  const daysAgo = daysBetween(new Date(echo.created_at), new Date());

  function handleReveal() {
    setRevealed(true);
    if (echo.status === "ready") {
      markOpened(echo.id).catch(() => {});
    }
  }

  useEffect(() => {
    if (state.success) {
      // stay open so the person can see the saved answer confirmation
    }
  }, [state.success]);

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center p-5"
      style={{ background: "rgba(4,4,10,0.72)" }}
      onClick={onClose}
    >
      <div
        className="card p-6 w-full max-w-md text-center"
        onClick={(e) => e.stopPropagation()}
        style={{ textAlign: revealed ? "left" : "center" }}
      >
        {!revealed ? (
          <div>
            <div className="text-2xl mb-2.5">{t.glyph}</div>
            <div className="font-display text-lg mb-2">
              Your past self left you something.
            </div>
            <div className="text-sm text-[var(--text-secondary)] mb-5">
              Created {daysAgo} days ago.
            </div>
            <button className="btn-primary" onClick={handleReveal}>
              Open my echo
            </button>
          </div>
        ) : (
          <div>
            <div className="text-xs text-[var(--text-secondary)] mb-1.5">
              A message from your past self
            </div>
            <div className="font-display text-lg mb-2.5">{echo.title}</div>
            <div className="text-sm text-[var(--text-primary)] opacity-90 leading-relaxed mb-4.5">
              {echo.content}
            </div>

            {echo.status === "answered" ? (
              <div>
                <div className="text-xs text-[var(--text-secondary)] mb-1.5">
                  Your present self said
                </div>
                <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  This echo has already been answered.
                </div>
              </div>
            ) : (
              <form action={formAction} className="flex flex-col gap-2">
                <input type="hidden" name="echoId" value={echo.id} />
                <div className="text-xs text-[var(--text-secondary)]">
                  What happened?
                </div>
                <textarea
                  name="answer"
                  required
                  rows={3}
                  placeholder="Tell your past self what actually happened..."
                  className="field resize-y"
                />
                {state.error && (
                  <p className="text-sm text-[var(--danger)]">
                    {state.error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={pending}
                  className="btn-primary mt-1.5"
                >
                  {pending ? "Saving…" : "Save my answer"}
                </button>
              </form>
            )}
          </div>
        )}
        <div className="mt-4.5 text-center">
          <button
            className="btn-ghost !py-2 !px-4 !text-xs"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
