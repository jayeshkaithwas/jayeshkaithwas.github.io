import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — GitHub Pages serves the contents of out/ as plain files.
  output: "export",

  // Emit out/projects/newsflow/index.html rather than out/projects/newsflow.html.
  // Directory-style URLs resolve unambiguously on Pages and keep the trailing
  // slashes the current site already uses.
  trailingSlash: true,

  // No basePath/assetPrefix: this is a user site served from the domain root.
  // Setting one here is only correct for project sites (user.github.io/repo)
  // and would break every asset path.

  // There is no image optimizer in a static export.
  images: { unoptimized: true },

  pageExtensions: ["ts", "tsx", "md", "mdx"],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm", {}]],
    rehypePlugins: [["rehype-slug", {}]],
  },
});

export default withMDX(nextConfig);
