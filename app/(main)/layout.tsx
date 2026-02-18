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
      <main role="main">{children}</main>
      <footer role="contentinfo">
        <FooterCopyrights />
      </footer>
    </>
  );
}
