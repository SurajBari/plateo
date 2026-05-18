export default function StorySection() {
  return (
    <section id="heritage" className="border-y border-line bg-paper px-6 py-20 lg:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">Heritage Chronicle</p>
          <h2 className="mt-3 text-5xl font-semibold leading-tight text-ink md:text-6xl">Crafted with Bengal Soul</h2>
        </div>
        <div className="space-y-5 text-lg leading-8 text-muted">
          <p>
            From Bishnupur wheels to your dinner table, each terracotta piece is slow-fired, naturally cooled, and hand-finished.
          </p>
          <p>
            Inspired by the long terracotta history across the Indian subcontinent, this collection preserves clay craft as living heritage.
          </p>
        </div>
      </div>
    </section>
  );
}
