export default function Footer() {
  return (
    <footer className="mt-4 flex flex-col gap-3 border-t border-ink-700/60 pt-6 text-sm text-ink-300 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
        <span>
          Source:{" "}
          <a
            href="https://github.com/taikoxyz/k8s-configs/tree/main/snapshotter"
            className="text-taiko-300 underline-offset-4 hover:underline"
            rel="noopener noreferrer"
          >
            snapshotter (taikoxyz/k8s-configs)
          </a>
        </span>
        <span>
          UI:{" "}
          <a
            href="https://github.com/taikoxyz/snapshots-ui"
            className="text-taiko-300 underline-offset-4 hover:underline"
            rel="noopener noreferrer"
          >
            taikoxyz/snapshots-ui
          </a>
        </span>
      </div>
      <span className="text-xs text-ink-300">
        Inspired by{" "}
        <a
          href="https://snapshots.ethpandaops.io/"
          className="text-taiko-300 underline-offset-4 hover:underline"
          rel="noopener noreferrer"
        >
          ethpandaops snapshots
        </a>
        . Built for Taiko.
      </span>
    </footer>
  );
}
