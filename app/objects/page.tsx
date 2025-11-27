import { Suspense } from 'react';
import SpaceObjectPage from "@/components/pages/SpaceObjectPage";

export default function Objects() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">Loading Encyclopedia...</div>}>
      <SpaceObjectPage />
    </Suspense>
  );
}