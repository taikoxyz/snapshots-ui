/**
 * Server-side fetch of a network's index.json.
 *
 * The shape matches what `snapshotter/internal/r2/index.go` writes — keep this
 * in lockstep with the producer.
 */
import type { NetworkConfig } from "./networks";

export interface SnapshotEntryUrls {
  snapshot: string;
  sha256_file: string;
  metadata: string;
  block_info: string;
  client_info: string;
}

export interface SnapshotEntry {
  client: string;
  block: number;
  block_hash: string;
  block_timestamp: number;
  client_version: string;
  compressed_size: number;
  sha256: string;
  taken_at: number;
  urls: SnapshotEntryUrls;
}

export interface NetworkIndex {
  network: string;
  public_base_url: string;
  generated_at: number;
  entries: SnapshotEntry[];
}

export type FetchResult =
  | { ok: true; index: NetworkIndex }
  | { ok: false; error: string };

/**
 * Fetch and parse a network's index.json. Treats 404 (no snapshots yet) as
 * a soft success — returns an empty entries array.
 *
 * ISR via Next.js: cached for 60 seconds, then revalidated on the next
 * request. Per-network: stale networks don't block fresh ones.
 */
export async function fetchNetworkIndex(
  network: NetworkConfig
): Promise<FetchResult> {
  if (network.status !== "live") {
    return {
      ok: true,
      index: {
        network: network.slug,
        public_base_url: network.baseUrl,
        generated_at: 0,
        entries: [],
      },
    };
  }
  try {
    const res = await fetch(network.indexUrl, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (res.status === 404) {
      return {
        ok: true,
        index: {
          network: network.slug,
          public_base_url: network.baseUrl,
          generated_at: 0,
          entries: [],
        },
      };
    }
    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }
    const index = (await res.json()) as NetworkIndex;
    // Defensive: sort newest-block first regardless of producer order.
    index.entries = [...(index.entries ?? [])].sort((a, b) => b.block - a.block);
    return { ok: true, index };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
