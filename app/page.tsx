"use client"

import { useState } from "react"
import Navigation from "@/components/Navigation"
import HomePage from "@/components/pages/HomePage"
import PlanetsPage from "@/components/pages/PlanetPage" // 👈 Pastikan ini di-import
import CatalogPage from "@/components/pages/SpaceObjectPage"
import ProfilePage from "@/components/pages/ProfilePage"

export default function MainApp() {
  // State default bisa 'home'
  const [currentPage, setCurrentPage] = useState<"home" | "planets" | "catalog" | "profile">("home")

  return (
    <main className="bg-slate-950 min-h-screen">
      
      {/* --- SAKLAR HALAMAN (ROUTING MANUAL) --- */}
      
      {/* Jika state = 'home', tampilkan HomePage */}
      {currentPage === "home" && <HomePage onNavigate={setCurrentPage} />}
      
      {/* 👇 INI YANG PENTING: Tambahkan kondisi untuk 'planets' */}
      {currentPage === "planets" && <PlanetsPage />}
      
      {/* Halaman lainnya */}
      {currentPage === "catalog" && <CatalogPage />}
      {currentPage === "profile" && <ProfilePage />}

      {/* --- NAVIGASI --- */}
      <Navigation 
        currentPage={currentPage} 
        onNavigate={(page) => setCurrentPage(page)} 
      />
      
    </main>
  )
}