import { NETWORKS } from "@/lib/networks";
import { fetchNetworkIndex, type FetchResult } from "@/lib/fetch-index";
import NetworkSection from "./components/NetworkSection";
import RecipeCard from "./components/RecipeCard";
import SemanticsCard from "./components/SemanticsCard";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

// Dynamic rendering with response-level fetch caching.
//   - `dynamic = 'force-dynamic'` runs the page on every request, so the
//     index.json fetch happens at request time (not at build time on
//     Vercel, where a slow/flaky R2 hop could fail the whole build).
//   - The fetch itself still benefits from Next's per-URL cache via
//     `next: { revalidate: 60 }` inside `fetchNetworkIndex`. So a burst of
//     traffic only triggers one upstream fetch per 60-second window.
//   - `revalidate` is also re-stated here for clarity and as a safety net
//     in case the rendering mode is ever toggled back to static.
export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function Page() {
  // Fetch all networks in parallel so a slow tab doesn't gate the rest.
  const results: Array<{ slug: string; result: FetchResult }> = await Promise.all(
    NETWORKS.map(async (n) => ({
      slug: n.slug,
      result: await fetchNetworkIndex(n),
    }))
  );

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-5 py-10 sm:px-8 sm:py-14">
      <Hero />

      <section className="flex flex-col gap-8">
        {NETWORKS.map((n) => {
          const r = results.find((x) => x.slug === n.slug)!.result;
          return <NetworkSection key={n.slug} network={n} result={r} />;
        })}
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <RecipeCard />
        <SemanticsCard />
      </section>

      <Footer />
    </main>
  );
}
