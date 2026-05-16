export default function SemanticsCard() {
  return (
    <section className="card flex flex-col overflow-hidden">
      <header className="border-b border-ink-600/60 px-5 py-3">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-200">
          What to know
        </h3>
      </header>
      <ul className="flex flex-col divide-y divide-ink-700/60 text-sm text-ink-200">
        <Item title="block_number is a verifiable lower bound">
          The CSI snapshot takes a few minutes; reth keeps producing during the
          window. The snapshot is{" "}
          <span className="font-medium text-white">guaranteed to contain</span>{" "}
          the advertised block at the advertised hash, but likely contains a few
          hundred more. Your local reth on restore will see the actual on-disk
          head.
        </Item>
        <Item title=".commit is the finalization marker">
          It’s written last, after all sidecars. If you don’t see a{" "}
          <code className="rounded bg-ink-700/60 px-1 py-0.5 font-mono text-xs">
            .commit
          </code>{" "}
          file in a block prefix, the snapshot is incomplete — skip it.
        </Item>
        <Item title="Retention: newest four">
          Older snapshots are garbage-collected after each successful run. Pin
          to a specific block in your CI if you need reproducibility.
        </Item>
        <Item title="client_version may say “unknown”">
          Production reth often runs with{" "}
          <code className="rounded bg-ink-700/60 px-1 py-0.5 font-mono text-xs">
            --http.api
          </code>{" "}
          omitting <code className="font-mono text-xs">web3</code>. The snapshot
          itself is unaffected; the field is informational.
        </Item>
        <Item title="Public hostname is rate-limited (for now)">
          The{" "}
          <code className="rounded bg-ink-700/60 px-1 py-0.5 font-mono text-xs">
            pub-*.r2.dev
          </code>{" "}
          domain has Cloudflare R2’s shared rate limit. Migration to{" "}
          <code className="font-mono text-xs">https://snapshots.taiko.xyz/</code>{" "}
          is pending the DNS move; URLs in{" "}
          <code className="font-mono text-xs">index.json</code> will rewrite
          automatically.
        </Item>
      </ul>
    </section>
  );
}

function Item({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex flex-col gap-1 px-5 py-3">
      <span className="text-sm font-medium text-white">{title}</span>
      <span className="text-sm text-ink-300">{children}</span>
    </li>
  );
}
