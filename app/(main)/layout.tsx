import { FooterCopyrights } from "@/app/(main)/components/FooterCopyrights";
import { Navbar } from "@/app/(main)/components/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <footer>
        <FooterCopyrights />
      </footer>
    </>
  );
}
