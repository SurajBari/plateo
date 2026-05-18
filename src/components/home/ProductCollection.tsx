import Image from "next/image";
import Link from "next/link";
import { products } from "./types";

export default function ProductCollection() {
  return (
    <section id="collection" className="px-6 py-20 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-terracotta">Curated Archive</p>
        <h2 className="mt-3 text-5xl font-semibold leading-tight text-ink md:text-6xl">The Studio Collection</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted">
          Small-batch terracotta tableware inspired by Nawabi and Maharaja craft traditions, adapted for contemporary dining.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className="paper-card overflow-hidden rounded-sm">
              <div className="relative aspect-square overflow-hidden bg-[#efe5dc]">
                <Image src={product.image} alt={product.name} fill className="object-cover transition duration-300 hover:scale-105" />
              </div>
              <div className="p-3">
                <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-terracotta">{product.subtitle}</p>
                <h3 className="mt-1 line-clamp-2 text-xl leading-tight font-medium text-ink">{product.name}</h3>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">Rs. {product.price.toLocaleString("en-IN")}</p>
                  <button className="rounded-full border border-line px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink transition hover:border-terracotta hover:text-terracotta">
                    Add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/collection"
            className="inline-flex rounded-full border border-line bg-paper px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink transition hover:border-terracotta hover:text-terracotta"
          >
            View Full Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
