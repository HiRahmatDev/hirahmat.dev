export function PageWrapper({ children }: { children?: React.ReactNode }) {
  return (
    <article
      lang="ar"
      dir="rtl"
      className="w-[600px] min-h-[900px] shrink-0 bg-[#f6f5ee] pt-7.5 px-12.5 pb-12"
    >
      {children}
    </article>
  );
}
