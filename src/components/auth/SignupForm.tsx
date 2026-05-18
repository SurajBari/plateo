export default function SignupForm() {
  return (
    <form className="space-y-4">
      <label className="block text-sm font-semibold uppercase tracking-[0.08em] text-ink/80">
        Full Name
        <input
          type="text"
          placeholder="Your name"
          className="mt-2 w-full rounded-md border border-line bg-white px-4 py-3 text-base outline-none transition focus:border-terracotta"
        />
      </label>
      <label className="block text-sm font-semibold uppercase tracking-[0.08em] text-ink/80">
        Email
        <input
          type="email"
          placeholder="you@example.com"
          className="mt-2 w-full rounded-md border border-line bg-white px-4 py-3 text-base outline-none transition focus:border-terracotta"
        />
      </label>
      <label className="block text-sm font-semibold uppercase tracking-[0.08em] text-ink/80">
        Password
        <input
          type="password"
          placeholder="Create password"
          className="mt-2 w-full rounded-md border border-line bg-white px-4 py-3 text-base outline-none transition focus:border-terracotta"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-paper transition hover:bg-terracotta"
      >
        Create Account
      </button>
    </form>
  );
}
