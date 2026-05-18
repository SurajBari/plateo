"use client";

import { products } from "@/data/products";
import Image from "next/image";
import { useMemo, useState } from "react";

const qualities = ["All", "Standard", "Premium", "Royal"] as const;
const categories = ["All", "Tableware", "Serveware", "Decor"] as const;
const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Name: A-Z"] as const;

export default function CollectionCatalog() {
  const [query, setQuery] = useState("");
  const [quality, setQuality] = useState<(typeof qualities)[number]>("All");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [maxPrice, setMaxPrice] = useState(3500);
  const [sort, setSort] = useState<(typeof sortOptions)[number]>("Featured");

  const filteredProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    let items = products.filter((p) => {
      const searchHit =
        normalized.length === 0 ||
        p.name.toLowerCase().includes(normalized) ||
        p.subtitle.toLowerCase().includes(normalized);
      const qualityHit = quality === "All" || p.quality === quality;
      const categoryHit = category === "All" || p.category === category;
      const priceHit = p.price <= maxPrice;
      return searchHit && qualityHit && categoryHit && priceHit;
    });

    if (sort === "Price: Low to High") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") items = [...items].sort((a, b) => b.price - a.price);
    if (sort === "Name: A-Z") items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    return items;
  }, [category, maxPrice, quality, query, sort]);

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="hero-mosaic rounded-sm border border-line p-5 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-terracotta">Plateo Collection</p>
          <h1 className="mt-2 text-4xl font-semibold text-ink sm:text-5xl md:text-6xl">Shop Terracotta Heritage</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted sm:text-lg">
            Explore handcrafted plates, glasses, serveware and decor in authentic terracotta finish.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[280px_1fr]">
          <aside className="paper-card rounded-sm p-4 sm:p-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta">Filters</p>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.12em] text-ink/80">
              Search
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="mt-2 w-full rounded-sm border border-line bg-white px-3 py-2 text-sm outline-none focus:border-terracotta"
              />
            </label>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.12em] text-ink/80">
              Quality
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value as (typeof qualities)[number])}
                className="mt-2 w-full rounded-sm border border-line bg-white px-3 py-2 text-sm outline-none focus:border-terracotta"
              >
                {qualities.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.12em] text-ink/80">
              Category
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as (typeof categories)[number])}
                className="mt-2 w-full rounded-sm border border-line bg-white px-3 py-2 text-sm outline-none focus:border-terracotta"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink/80">Price Range</p>
              <input
                type="range"
                min={500}
                max={3500}
                step={50}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-3 w-full accent-terracotta"
              />
              <p className="mt-2 text-sm text-muted">Up to Rs. {maxPrice.toLocaleString("en-IN")}</p>
            </div>

            <label className="mt-4 block text-xs font-semibold uppercase tracking-[0.12em] text-ink/80">
              Sort By
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as (typeof sortOptions)[number])}
                className="mt-2 w-full rounded-sm border border-line bg-white px-3 py-2 text-sm outline-none focus:border-terracotta"
              >
                {sortOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </aside>

          <div>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted">{filteredProducts.length} products found</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
              {filteredProducts.map((product) => (
                <article key={product.id} className="paper-card overflow-hidden rounded-sm">
                  <div className="relative aspect-square overflow-hidden bg-[#efe5dc]">
                    <Image src={product.image} alt={product.name} fill className="object-cover transition duration-300 hover:scale-105" />
                  </div>
                  <div className="p-3">
                    <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-terracotta">{product.subtitle}</p>
                    <h3 className="mt-1 line-clamp-2 text-lg leading-tight font-medium text-ink sm:text-xl">{product.name}</h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-muted">{product.quality} • {product.category}</p>
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
          </div>
        </div>
      </div>
    </section>
  );
}
