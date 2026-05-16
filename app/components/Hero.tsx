export default function Hero() {
  return (
    <header className="flex flex-col gap-3 pt-2">
      <div className="flex items-center gap-3">
        <TaikoMark />
        <span className="text-sm font-medium tracking-wide text-ink-300">
          taiko.xyz
        </span>
      </div>

      <h1 className="bg-taiko-pink bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent sm:text-5xl">
        L2 reth snapshots
      </h1>

      <p className="max-w-2xl text-balance text-base leading-relaxed text-ink-200 sm:text-lg">
        Periodic, sha256-verified Taiko L2 reth datadir snapshots. Free, public,
        and intended for self-hosters and CI. Updated twice weekly per network;
        retention keeps the newest four.
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-ink-300">
        <span className="chip">Format · zstd-compressed tar</span>
        <span className="chip">URL convention · EthPandaOps-compatible</span>
        <span className="chip">Storage · Cloudflare R2</span>
      </div>
    </header>
  );
}

function TaikoMark() {
  // Minimal mark — the brand SVG should ship in /public when you have it.
  // This inline placeholder keeps zero asset dependencies for first deploy.
  return (
    <span
      aria-hidden
      className="inline-block h-8 w-8 rounded-lg bg-taiko-pink shadow-[0_0_24px_rgba(232,24,153,0.45)]"
    />
  );
}
