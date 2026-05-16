/* eslint-disable @next/next/no-img-element */
// The official Taiko wordmark + mark are static SVGs shipped from /public;
// next/image's runtime image loader is unnecessary overhead for a 2.5 KB
// inline-friendly vector. Disabling the rule keeps the asset path explicit.

export default function Hero() {
  return (
    <header className="flex flex-col gap-4 pt-2">
      <a
        href="https://taiko.xyz"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center transition-opacity hover:opacity-80"
        aria-label="taiko.xyz"
      >
        {/* logo-pw.svg = pink glyph + white "Taiko" wordmark (taikoxyz/new-website-v3/public/img/brand/logo-pw.svg). */}
        <img
          src="/taiko-wordmark.svg"
          alt="Taiko"
          width={129}
          height={36}
          className="h-9 w-auto"
        />
      </a>

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
      </div>
    </header>
  );
}
