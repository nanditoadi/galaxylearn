"use client";

import dynamic from "next/dynamic";

const SpacePlanetPage = dynamic(() => import("@/components/pages/PlanetPage"), {
  ssr: false,
});

export default function Planets() {
  return <SpacePlanetPage />;
}
