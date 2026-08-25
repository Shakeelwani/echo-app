"use client";

import { useMemo, useState } from "react";
import type { Echo } from "@/lib/types";
import EchoCard from "@/components/EchoCard";
import CreateEchoModal from "@/components/CreateEchoModal";
import OpenEchoModal from "@/components/OpenEchoModal";

export default function DashboardClient({
  echoes,
  name,
}: {
  echoes: Echo[];
  name: string;
}) {
  const [showCreate, setShowCreate] = useState(false);
  const [openEcho, setOpenEcho] = useState<Echo | null>(null);

  const stats = useMemo(() => {
    const sealed = echoes.filter((e) => e.status === "sealed").length;
    const ready = echoes.filter(
      (e) => e.status === "ready" || e.status === "opened"
    ).length;
    const answered = echoes.filter((e) => e.status === "answered").length;
    return { sealed, ready, answered };
  }, [echoes]);

  return (
    <div className="echo-fade">
      <p className="text-sm text-[var(--text-secondary)] mb-1">
        Good to see you
      </p>
      <h1 className="font-display font-medium text-2xl md:text-3xl mb-4">
        What do you want {name.split(" ")[0]} to remember?
      </h1>
      <button
        className="btn-primary mb-8"
        onClick={() => setShowCreate(true)}
      >
        + Create echo
      </button>

      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: "Sealed", value: stats.sealed },
          { label: "Ready", value: stats.ready },
          { label: "Answered", value: stats.answered },
        ].map((s) => (
          <div key={s.label} className="card p-4">
            <div className="text-xs text-[var(--text-secondary)] mb-1.5">
              {s.label}
            </div>
            <div className="font-display text-2xl">{s.value}</div>
          </div>
        ))}
      </div>

      {echoes.length === 0 ? (
        <div className="card p-10 text-center">
          <div className="font-display text-lg mb-1.5">
            Your future is empty, for now.
          </div>
          <div className="text-sm text-[var(--text-secondary)]">
            Leave something for the person you&apos;ll become.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {echoes.map((e) => (
            <EchoCard key={e.id} echo={e} onOpen={setOpenEcho} />
          ))}
        </div>
      )}

      {showCreate && (
        <CreateEchoModal onClose={() => setShowCreate(false)} />
      )}
      {openEcho && (
        <OpenEchoModal
          echo={openEcho}
          onClose={() => setOpenEcho(null)}
        />
      )}
    </div>
  );
}
