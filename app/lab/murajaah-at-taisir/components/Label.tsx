"use client";

export function Label(props: Readonly<{ children: React.ReactNode }>) {
  return <label className="text-sm font-medium text-zinc-600" {...props} />;
}
