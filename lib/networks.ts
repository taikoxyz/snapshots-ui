/**
 * Network registry.
 *
 * `indexUrl` is fetched server-side at request time with ISR (60s revalidate),
 * so the page reflects the latest published snapshot at most ~60s late.
 *
 * `status: "live"` networks are queried for their index.json; their tab is
 * interactive. `status: "soon"` renders a stub tab — useful for mainnet
 * until the chart's AppSet element is uncommented.
 */
export type NetworkStatus = "live" | "soon";

export interface NetworkConfig {
  slug: string;
  label: string;
  baseUrl: string;
  indexUrl: string;
  status: NetworkStatus;
  scheduleHuman: string;
  // Optional explanatory note rendered under the network header.
  note?: string;
}

export const NETWORKS: NetworkConfig[] = [
  {
    slug: "hoodi",
    label: "Hoodi",
    baseUrl: "https://pub-9249a947ad8d47928977fcb2f8479963.r2.dev",
    indexUrl:
      "https://pub-9249a947ad8d47928977fcb2f8479963.r2.dev/hoodi/index.json",
    status: "live",
    scheduleHuman: "Mon + Thu, 02:00 UTC",
  },
  {
    slug: "mainnet",
    label: "Mainnet",
    baseUrl: "https://pub-22709b59ef4247f2a0ec31a6a3679564.r2.dev",
    indexUrl:
      "https://pub-22709b59ef4247f2a0ec31a6a3679564.r2.dev/mainnet/index.json",
    status: "soon",
    scheduleHuman: "Mon + Thu, 02:00 UTC (pending enablement)",
    note: "Wired but not yet enabled — turns on after a few more clean hoodi runs prove out reproducibility.",
  },
];

export function getNetwork(slug: string): NetworkConfig | undefined {
  return NETWORKS.find((n) => n.slug === slug);
}
