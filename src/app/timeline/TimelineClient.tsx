"use client";

import { useState } from "react";
import type { Echo } from "@/lib/types";
import { TYPE_META, countdownLabel, formatDate } from "@/lib/echo-helpers";
import OpenEchoModal from "@/components/OpenEchoModal";

export default function TimelineClient({ echoes }: { echoes: Echo[] }) {
  const [openEcho, setOpenEcho] = useState<Echo | null>(null);

  return (
    <div className="echo-fade">
      <h1 className="font-display text-2xl mb-6">Your timeline</h1>

      {echoes.length === 0 ? (
        <div className="card p-10 text-center">
          <div className="font-display text-lg mb-1.5">
            Your story hasn&apos;t started yet.
          </div>
        </div>
      ) : (
        <div className="relative pl-6">
          <div
            className="absolute top-1 bottom-1"
            style={{
              left: 5,
              width: 1,
              background: "rgba(255,255,255,0.1)",
            }}
          />
          {echoes.map((e) => {
            const t = TYPE_META[e.type];
            const clickable = e.status === "ready" || e.status === "opened" || e.status === "answered";
            return (
              <div
                key={e.id}
                className="relative mb-5"
                style={{ cursor: clickable ? "pointer" : "default" }}
                onClick={() => clickable && setOpenEcho(e)}
              >
                <div
                  className="absolute rounded-full"
                  style={{
                    left: -24,
                    top: 3,
                    width: 10,
                    height: 10,
                    background: t.color,
                  }}
                />
                <div className="text-xs text-[var(--text-secondary)] mb-0.5">
                  {formatDate(e.created_at)}
                </div>
                <div className="text-sm">
                  <span style={{ color: t.color, marginRight: 6 }}>
                    {t.glyph}
                  </span>
                  {e.title}
                </div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5">
                  {e.status === "answered"
                    ? "answered"
                    : e.status === "ready" || e.status === "opened"
                    ? "ready to open"
                    : countdownLabel(e.unlock_at)}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {openEcho && (
        <OpenEchoModal echo={openEcho} onClose={() => setOpenEcho(null)} />
      )}
    </div>
  );
}
