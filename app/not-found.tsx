import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container h-[620px]">
      <div className="pb-20 text-center flex flex-col gap-6 justify-center h-full">
        <div>
          <h1 className="font-bold text-5xl/[58px] tracking-[-2.5px]">
            <span className="text-red-600/6 text-[200px] tracking-[-16px]">404</span>
            <br />
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-base/[24px] tracking-[-0.4px]">
            Sepertinya halaman yang kamu cari tidak tersedia atau sudah
            dipindahkan.
          </p>
        </div>
        <Link href="/" className="cta-button max-w-fit mx-auto animate-hover">
          Kembali ke Halaman Awal
        </Link>
      </div>
    </div>
  );
}
