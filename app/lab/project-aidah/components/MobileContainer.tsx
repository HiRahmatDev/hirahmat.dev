"use client";

export function MobileContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="mobile-container">
      <main>{children}</main>
    </div>
  );
}
