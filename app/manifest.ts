import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CineHub - Film Catalog",
    short_name: "CineHub",
    description: "Aplikasi katalog film dengan koleksi terbaik dunia",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1a1a2e",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/512x512.jpg",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["entertainment"],
  };
}
