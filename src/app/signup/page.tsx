import SignupForm from "@/components/auth/SignupForm";
import Image from "next/image";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="terracotta-grain flex min-h-screen items-center justify-center px-4 py-12">
      <div className="paper-card w-full max-w-md rounded-sm p-7 md:p-9">
        <Link href="/" className="inline-flex items-center">
          <Image src="/logo.png" alt="Plateo logo" width={120} height={42} priority />
        </Link>
        <h1 className="mt-5 text-5xl font-semibold leading-tight text-ink">Join The Studio</h1>
        <p className="mt-3 text-base text-muted">
          Create your account and shop handcrafted terracotta plates, glasses, and more.
        </p>
        <div className="mt-7">
          <SignupForm />
        </div>
        <p className="mt-5 text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-terracotta hover:text-terracotta-dark">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
