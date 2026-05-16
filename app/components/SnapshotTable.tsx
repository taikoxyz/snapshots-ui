"use client";

import type { NetworkConfig } from "@/lib/networks";
import type { SnapshotEntry } from "@/lib/fetch-index";
import {
  formatBytes,
  formatUtcTimestamp,
  truncateHash,
} from "@/lib/format";
import { useState } from "react";

export default function SnapshotTable({
  network,
  entries,
}: {
  network: NetworkConfig;
  entries: SnapshotEntry[];
}) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1200);
    } catch {
      // ignore
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-ink-600/60 text-xs uppercase tracking-wider text-ink-300">
          <tr>
            <th className="px-5 py-3 font-medium">Block</th>
            <th className="px-5 py-3 font-medium">Hash</th>
            <th className="px-5 py-3 font-medium">Size</th>
            <th className="px-5 py-3 font-medium">Taken at (UTC)</th>
            <th className="px-5 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ink-700/60">
          {entries.map((e, i) => {
            const isLatest = i === 0;
            return (
              <tr
                key={`${e.client}-${e.block}`}
                className="transition hover:bg-ink-700/30"
              >
                <td className="whitespace-nowrap px-5 py-3 font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-white">{e.block.toLocaleString()}</span>
                    {isLatest && (
                      <span className="rounded-md bg-taiko-500/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-taiko-200">
                        latest
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-[11px] font-normal text-ink-300">
                    {e.client}
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-ink-200">
                  <button
                    type="button"
                    title={e.block_hash}
                    onClick={() => copy(e.block_hash, `hash-${e.block}`)}
                    className="hover:text-white"
                  >
                    {truncateHash(e.block_hash)}
                    {copiedKey === `hash-${e.block}` && (
                      <span className="ml-2 text-taiko-300">copied</span>
                    )}
                  </button>
                </td>
                <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-ink-200">
                  {formatBytes(e.compressed_size)}
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-xs text-ink-200">
                  {formatUtcTimestamp(e.taken_at)}
                </td>
                <td className="whitespace-nowrap px-5 py-3">
                  <div className="flex justify-end gap-2">
                    <a
                      href={e.urls.snapshot}
                      className="btn-ghost"
                      title="Download the compressed tarball"
                    >
                      <DownloadIcon /> Download
                    </a>
                    <button
                      type="button"
                      onClick={() => copy(e.urls.snapshot, `url-${e.block}`)}
                      className="btn-ghost"
                      title="Copy snapshot URL"
                    >
                      {copiedKey === `url-${e.block}` ? "copied" : "Copy URL"}
                    </button>
                    <a
                      href={e.urls.metadata}
                      className="btn-ghost"
                      title="Open metadata.json"
                    >
                      meta
                    </a>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="border-t border-ink-700/60 px-5 py-3 text-xs text-ink-300">
        <span className="font-mono">{network.baseUrl}/{network.slug}/index.json</span>{" "}
        ·{" "}
        <a
          href={`${network.baseUrl}/${network.slug}/index.json`}
          className="text-taiko-300 underline-offset-4 hover:underline"
        >
          raw index.json
        </a>{" "}
        ·{" "}
        <a
          href={`${network.baseUrl}/${network.slug}/reth/latest`}
          className="text-taiko-300 underline-offset-4 hover:underline"
        >
          latest pointer
        </a>
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-3.5"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
