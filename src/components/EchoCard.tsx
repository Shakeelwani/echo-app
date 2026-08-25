"use client";

import type { Echo } from "@/lib/types";
import { TYPE_META, countdownLabel } from "@/lib/echo-helpers";

export default function EchoCard({
  echo,
  onOpen,
}: {
  echo: Echo;
  onOpen: (echo: Echo) => void;
}) {
  const t = TYPE_META[echo.type];
  const ready = echo.status === "ready" || echo.status === "opened";
  const answered = echo.status === "answered";
  const clickable = ready || answered;

  return (
    <div
      className="card p-5 flex flex-col gap-2.5"
      style={{ cursor: clickable ? "pointer" : "default" }}
      onClick={() => clickable && onOpen(echo)}
    >
      <div className="flex items-center gap-2.5">
        <div
          className={ready && !answered ? "seal-ring" : undefined}
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: `${t.color}22`,
            color: t.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {t.glyph}
        </div>
        <div className="text-xs text-[var(--text-secondary)]">{t.label}</div>
      </div>
      <div className="font-display text-lg">{echo.title}</div>
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {echo.content.length > 90
          ? echo.content.slice(0, 90) + "…"
          : echo.content}
      </div>
      <div
        className="text-xs mt-1"
        style={{
          color: answered
            ? "var(--success)"
            : ready
            ? "var(--warning)"
            : "var(--text-muted)",
        }}
      >
        {answered
          ? "answered"
          : ready
          ? "ready to open"
          : `🔒 ${countdownLabel(echo.unlock_at)}`}
      </div>
    </div>
  );
}
