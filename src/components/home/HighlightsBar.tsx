import { highlights } from "./types";

export default function HighlightsBar() {
  return (
    <section className="border-b border-line bg-paper px-6 py-9 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((item) => (
          <div key={item.title}>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink">{item.title}</p>
            <p className="mt-2 text-base text-muted">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
