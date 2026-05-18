"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { navLinks } from "./types";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/95 backdrop-blur">
      <nav className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
            <Image src="/logo.png" alt="Plateo logo" width={120} height={42} priority />
          </Link>

          <div className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.18em] text-ink/70 md:flex">
            {navLinks.map((item) => (
              <Link key={item.label} href={item.href} className="transition hover:text-terracotta">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-paper transition hover:bg-terracotta sm:px-5 sm:text-sm"
            >
              Basket
            </Link>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper md:hidden"
              aria-label="Toggle navigation"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <span className="relative block h-4 w-5">
                <span className={`absolute left-0 top-0 h-[2px] w-5 bg-ink transition ${isOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`absolute left-0 top-[7px] h-[2px] w-5 bg-ink transition ${isOpen ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 top-[14px] h-[2px] w-5 bg-ink transition ${isOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="mt-4 rounded-sm border border-line bg-paper p-4 md:hidden">
            <div className="flex flex-col gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-ink/80">
              {navLinks.map((item) => (
                <Link key={item.label} href={item.href} className="py-2 transition hover:text-terracotta" onClick={() => setIsOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
