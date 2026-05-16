"use client";

import { useState } from "react";

const RECIPE = `BASE=https://pub-9249a947ad8d47928977fcb2f8479963.r2.dev

# 1. Discover the latest hoodi reth snapshot.
BLOCK=$(curl -fsSL $BASE/hoodi/reth/latest)
PREFIX=$BASE/hoodi/reth/$BLOCK

# 2. Confirm it’s a finalized snapshot.
curl -fsI $PREFIX/.commit > /dev/null || { echo "not finalized"; exit 1; }

# 3. Download + verify.
curl -fSL  $PREFIX/snapshot.tar.zst -o snapshot.tar.zst
curl -fsSL $PREFIX/snapshot.tar.zst.sha256 | sha256sum -c

# 4. Restore into a fresh datadir.
mkdir -p /data/alethia-reth
zstd -d -c snapshot.tar.zst | tar -xf - -C /data/alethia-reth

# 5. Start your reth.
alethia-reth node --datadir /data/alethia-reth --chain taiko-hoodi …`;

export default function RecipeCard() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(RECIPE);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  return (
    <section className="card flex flex-col overflow-hidden">
      <header className="flex items-center justify-between border-b border-ink-600/60 px-5 py-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-200">
          Restore recipe
        </h3>
        <button type="button" onClick={copy} className="btn-pink">
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </header>
      <pre className="overflow-x-auto bg-ink-900/60 px-5 py-4 text-xs leading-relaxed text-ink-100">
        <code className="font-mono">{RECIPE}</code>
      </pre>
    </section>
  );
}
