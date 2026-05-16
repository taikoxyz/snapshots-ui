import { NETWORKS } from "@/lib/networks";
import { fetchNetworkIndex, type FetchResult } from "@/lib/fetch-index";
import NetworkSection from "./components/NetworkSection";
import RecipeCard from "./components/RecipeCard";
import SemanticsCard from "./components/SemanticsCard";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

// ISR revalidation. The producer publishes ~2x/week, so 60s is plenty;
// it just bounds how stale the rendered page can be after a fresh run.
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
