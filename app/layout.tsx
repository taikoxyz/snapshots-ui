import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://snapshots.taiko.xyz"),
  title: "Taiko L2 Snapshots",
  description:
    "Periodic reth datadir snapshots for Taiko L2 networks (hoodi, mainnet). " +
    "Published twice weekly to Cloudflare R2 with sha256 verification, " +
    "compatible with the EthPandaOps snapshot URL conventions.",
  openGraph: {
    title: "Taiko L2 Snapshots",
    description:
      "Periodic reth datadir snapshots for Taiko L2 networks. Public, " +
      "free, sha256-verified.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Taiko L2 Snapshots" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link
          rel="preconnect"
          href="https://pub-9249a947ad8d47928977fcb2f8479963.r2.dev"
        />
        <link
          rel="preconnect"
          href="https://pub-22709b59ef4247f2a0ec31a6a3679564.r2.dev"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
