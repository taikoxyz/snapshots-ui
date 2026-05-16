# taikoxyz/snapshots-ui

Landing page for Taiko L2 reth snapshots — listed live from the public R2
`index.json` files written by the snapshotter in
[`taikoxyz/k8s-configs/snapshotter`](https://github.com/taikoxyz/k8s-configs/tree/main/snapshotter).

Inspired by [snapshots.ethpandaops.io](https://snapshots.ethpandaops.io/).

## Stack

- Next.js 15 (App Router) + React 19
- Tailwind CSS 3 with a Taiko-themed palette (pink #E81899, dark default)
- Server components with **ISR (60 s revalidate)** — the page fetches
  `index.json` from R2 at request time, caches for 60 s, then revalidates.
  No client-side fetch loop required.
- TypeScript strict mode

## Local development

```bash
pnpm install     # or npm i / yarn
pnpm dev
# → http://localhost:3000
```

The page fetches the production R2 indexes by default. To point at staging
or a different bucket, edit `lib/networks.ts`.

## Build + ship

```bash
pnpm build
pnpm start
```

The project is **zero-config Vercel deployable** — push to GitHub, import in
Vercel, hit Deploy. No env vars, no edge runtime gymnastics. Vercel’s
default ISR works with the page’s `export const revalidate = 60`.

## Add a network

`lib/networks.ts` is the single source of truth for the network registry.
To add (or activate) a network:

```ts
{
  slug: "mainnet",
  label: "Mainnet",
  baseUrl: "https://pub-22709b59ef4247f2a0ec31a6a3679564.r2.dev",
  indexUrl: ".../mainnet/index.json",
  status: "live",                           // ← flip from "soon" to "live"
  scheduleHuman: "Mon + Thu, 02:00 UTC",
}
```

The page rerenders automatically; no other code changes.

## CORS / fetch path

The page fetches `index.json` from R2 over HTTPS server-side (inside Next’s
request lifecycle), not in the browser, so **no CORS configuration is
needed** on the R2 bucket. If you later add a client-side fetch (e.g. live
auto-refresh), R2 dev URLs already return permissive CORS by default.

## Custom domain (snapshots.taiko.xyz)

When `taiko.xyz` is on Cloudflare DNS:

1. Vercel: add `snapshots.taiko.xyz` as a domain on this project.
2. Cloudflare: add the Vercel CNAME they print at the domain step.
3. Update `lib/networks.ts` to point `baseUrl` at the canonical
   `https://snapshots.taiko.xyz` if you also migrate the R2 bucket to a
   custom domain. Otherwise leave the R2 dev URLs in `baseUrl` — the
   landing page is just the **viewer**; tarballs are still served by R2.

## Updating after a snapshotter release

The page is a passive viewer — it reflects whatever the snapshotter
publishes. If the snapshotter changes the `index.json` schema, update
`lib/fetch-index.ts` to match. The current schema lives at
`snapshotter/internal/r2/index.go` in the k8s-configs repo.
