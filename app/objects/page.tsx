"use client";

import dynamic from "next/dynamic";

const SpaceObjectPage = dynamic(
  () => import("@/components/pages/SpaceObjectPage"),
  { ssr: false }
);

export default function Objects() {
  return <SpaceObjectPage />;
}
