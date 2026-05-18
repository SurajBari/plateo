import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-footer px-6 py-14 text-paper lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 md:flex-row md:justify-between">
        <div>
          <Image src="/logo.png" alt="Plateo logo" width={120} height={42} />
          <p className="mt-5 max-w-md text-lg leading-8 text-paper/70">
            Preserving the terracotta heritage of Bishnupur and Kumartuli. We bring the soul of Bengal to your table.
          </p>
          <div className="mt-8 flex gap-7 text-sm font-bold uppercase tracking-[0.16em]">
            <a href="#" className="transition hover:text-terracotta">
              Instagram
            </a>
            <a href="#" className="transition hover:text-terracotta">
              Journal
            </a>
            <a href="#" className="transition hover:text-terracotta">
              Contact
            </a>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold uppercase tracking-[0.2em]">Copyright 2026 Plateo Bengal Edition.</p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-paper/55">Designed for heritage enthusiasts.</p>
          <div className="mt-8 flex justify-end gap-3">
            <Link
              href="/login"
              className="rounded-full border border-paper/25 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] hover:border-terracotta hover:text-terracotta"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-full bg-paper px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink hover:bg-[#ecd8c5]"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
