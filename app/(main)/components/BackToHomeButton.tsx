import { clsx } from "clsx";
import Link from "next/link";

export function BackToHomeButton({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={clsx("cta-button max-w-fit animate-hover", className)}
    >
      Kembali ke Halaman Awal
    </Link>
  );
}
