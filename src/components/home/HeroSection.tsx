import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero-mosaic border-b border-line px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.98fr_1fr] lg:items-center">
        <div>
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.28em] text-terracotta">
            Established 1924 - West Bengal
          </p>
          <h1 className="text-6xl leading-[0.88] font-semibold text-ink sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8rem]">
            Earthly
            <span className="red-grain-text block leading-[0.9] italic">Elegance.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-8 text-muted">
            Sustainably sourced from the Ganges basin, handcrafted by national award-winning terracotta artisans.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#collection"
              className="dark-grain rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-paper transition hover:brightness-110"
            >
              Explore Studio
            </a>
            <a
              href="#process"
              className="rounded-full border border-line bg-paper px-8 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition hover:border-terracotta hover:text-terracotta"
            >
              Our Process
            </a>
          </div>
        </div>

        <div className="relative rounded-sm border border-line/90 bg-paper p-3 shadow-[0_16px_32px_rgba(42,29,22,0.10)] sm:p-4 md:p-5">
          <div className="relative overflow-hidden rounded-sm bg-white p-3 sm:p-4">
            <Image
              src="https://m.media-amazon.com/images/I/51ZFsr-JbyL._SX679_.jpg"
              alt="Terracotta dining set"
              width={679}
              height={679}
              className="h-auto w-full object-contain saturate-110 contrast-110 brightness-[1.03]"
              priority
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-black/8 bg-white/90 p-3 backdrop-blur-[1px] sm:p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-terracotta sm:text-xs">Signature Set</p>
              <p className="mt-1 text-xl font-medium text-ink sm:text-2xl">Plate • Bowls • Kulhad</p>
              <Link
                href="/signup"
                className="mt-2 inline-block text-xs font-semibold uppercase tracking-[0.12em] text-terracotta underline underline-offset-4 sm:mt-3 sm:text-sm"
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
