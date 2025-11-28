import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GalaxyLearn - Jelajahi planet dan objek angkasa",
    short_name: "GalaxyLearn",
    description: "GalaxyLearn adalah ensiklopedia interaktif yang menyajikan informasi lengkap tentang tata surya kita. Pelajari karakteristik unik setiap planet, dari planet berbatu seperti Merkurius dan Mars, hingga raksasa gas seperti Jupiter dan Saturnus.",
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
