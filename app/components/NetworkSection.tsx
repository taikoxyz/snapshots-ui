import type { NetworkConfig } from "@/lib/networks";
import type { FetchResult } from "@/lib/fetch-index";
import SnapshotTable from "./SnapshotTable";
import { formatRelative } from "@/lib/format";

export default function NetworkSection({
  network,
  result,
}: {
  network: NetworkConfig;
  result: FetchResult;
}) {
  const entries = result.ok ? result.index.entries : [];
  const latest = entries[0];

  return (
    <article className="card overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-600/60 px-5 py-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-white">{network.label}</h2>
          {network.status === "live" ? (
            <span className="chip-live">
              <span className="size-1.5 rounded-full bg-taiko-300 shadow-[0_0_6px_rgba(255,138,184,0.9)]" />
              live
            </span>
          ) : (
            <span className="chip-soon">coming soon</span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-ink-300">
          <span>
            Schedule:{" "}
            <span className="font-medium text-ink-200">
              {network.scheduleHuman}
            </span>
          </span>
          {latest && (
            <span>
              Last snapshot:{" "}
              <span className="font-medium text-ink-200">
                {formatRelative(latest.taken_at)}
              </span>
            </span>
          )}
        </div>
      </header>

      {network.note && (
        <p className="border-b border-ink-600/60 bg-ink-700/30 px-5 py-3 text-sm text-ink-300">
          {network.note}
        </p>
      )}

      {!result.ok ? (
        <div className="px-5 py-10 text-center text-sm text-ink-300">
          Couldn’t fetch the index: <code className="font-mono">{result.error}</code>.
          The R2 dev URL is occasionally rate-limited; try again in a minute.
        </div>
      ) : entries.length === 0 ? (
        <div className="px-5 py-12 text-center text-sm text-ink-300">
          {network.status === "live"
            ? "No snapshots published yet. The first scheduled run will appear here."
            : "Activation pending."}
        </div>
      ) : (
        <SnapshotTable network={network} entries={entries} />
      )}
    </article>
  );
}
