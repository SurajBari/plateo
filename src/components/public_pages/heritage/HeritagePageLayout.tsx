import Image from "next/image";

const timeline = [
  {
    era: "1905",
    title: "The Clay Guilds",
    text: "Dummy text: early terracotta guilds shaped ritual cookware, water vessels, and decorative plaques for homes and temples.",
  },
  {
    era: "1948",
    title: "Studio Revival",
    text: "Dummy text: post-independence craft studios revived hand-thrown forms and glazing methods adapted for modern kitchens.",
  },
  {
    era: "2026",
    title: "Global Heritage",
    text: "Dummy text: contemporary terracotta now blends artisan tradition with sustainable and export-ready production standards.",
  },
];

const gallery = [
  "https://i.pinimg.com/1200x/ef/21/1d/ef211d0bdc836affe149bbba4307bdea.jpg",
  "https://i.pinimg.com/1200x/ee/7c/52/ee7c52f031f7cb7545afc41fcaded03a.jpg",
  "https://i.pinimg.com/736x/4e/3c/e2/4e3ce2c9916365b93ab68f279330cf2b.jpg",
];

export default function HeritagePageLayout() {
  return (
    <main className="px-4 py-10 sm:px-6 lg:px-10">
      <section className="hero-mosaic mx-auto max-w-6xl rounded-sm border border-line p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-terracotta">Heritage Chapter</p>
        <h1 className="mt-2 text-5xl font-semibold text-ink sm:text-6xl">Terracotta Legacy</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-muted sm:text-lg">
          Dummy text: this page narrates the journey of terracotta from riverbank clay to timeless tableware through artisan knowledge and cultural memory.
        </p>
      </section>

      <section className="mx-auto mt-8 grid max-w-6xl gap-6 lg:grid-cols-3">
        {gallery.map((src, index) => (
          <article key={src} className="paper-card overflow-hidden rounded-sm">
            <div className="relative h-64">
              <Image src={src} alt={`Heritage gallery ${index + 1}`} fill className="object-cover" />
            </div>
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-terracotta">Archive {index + 1}</p>
              <p className="mt-2 text-sm leading-6 text-muted">
                Dummy text: archival terracotta imagery preserving motifs, kiln marks, and regional craft signatures.
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-10 max-w-6xl">
        <h2 className="text-4xl font-semibold text-ink sm:text-5xl">Craft Timeline</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {timeline.map((item) => (
            <article key={item.era} className="paper-card rounded-sm p-5">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-terracotta">{item.era}</p>
              <h3 className="mt-2 text-3xl font-medium text-ink">{item.title}</h3>
              <p className="mt-3 text-base leading-7 text-muted">{item.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
