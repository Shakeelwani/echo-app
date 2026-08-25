"use client";

import { useActionState, useEffect } from "react";
import { createEcho, type ActionState } from "@/app/actions/echoes";
import type { EchoType } from "@/lib/types";
import { TYPE_META } from "@/lib/echo-helpers";

const initialState: ActionState = {};

export default function CreateEchoModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const [state, formAction, pending] = useActionState(
    createEcho,
    initialState
  );

  useEffect(() => {
    if (state.success) onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center p-5"
      style={{ background: "rgba(4,4,10,0.72)" }}
      onClick={onClose}
    >
      <div
        className="card p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display text-xl mb-4">Create an echo</h2>
        <form action={formAction} className="flex flex-col gap-3">
          <input
            type="hidden"
            name="timezone"
            value={Intl.DateTimeFormat().resolvedOptions().timeZone}
          />
          <div>
            <label className="text-xs text-[var(--text-secondary)]">
              Type
            </label>
            <select name="type" className="field mt-1" defaultValue="letter">
              {Object.entries(TYPE_META).map(([key, t]) => (
                <option key={key} value={key as EchoType}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-[var(--text-secondary)]">
              Title
            </label>
            <input
              name="title"
              required
              placeholder="Finish my portfolio"
              className="field mt-1"
            />
          </div>
          <div>
            <label className="text-xs text-[var(--text-secondary)]">
              Message
            </label>
            <textarea
              name="content"
              required
              rows={3}
              placeholder="Dear future me..."
              className="field mt-1 resize-y"
            />
          </div>
          <div>
            <label className="text-xs text-[var(--text-secondary)]">
              Unlock date
            </label>
            <input
              type="date"
              name="unlockAt"
              required
              className="field mt-1"
            />
          </div>
          {state.error && (
            <p className="text-sm text-[var(--danger)]">{state.error}</p>
          )}
          <div className="flex gap-2.5 mt-2">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" disabled={pending} className="btn-primary">
              {pending ? "Sealing…" : "Seal this echo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
