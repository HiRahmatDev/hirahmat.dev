import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menimbang Ulang Utang Budi: Dari Etika ke Kerusakan Struktural",
  description:
    "Analisis interaktif mengenai distorsi makna utang budi dari ranah etika personal ke kerusakan struktural negara.",
};

export default function NalarPublikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
