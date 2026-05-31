import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  images: {
    qualities: [10, 25, 50, 75, 90],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
