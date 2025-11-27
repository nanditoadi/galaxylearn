"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { Search, Filter, Rocket } from "lucide-react" // Pastikan install lucide-react

// Interface sesuai tabel space_objects
interface SpaceObject {
  id: string
  name: string
  type: string
  image_url: string
  parent_planet?: {
    name: string
  }
}

const OBJECT_TYPES = ["Semua", "Moon", "Dwarf Planet", "Asteroid", "Comet"]

export default function CatalogPage() {
  // State Data
  const [objects, setObjects] = useState<SpaceObject[]>([])
  const [loading, setLoading] = useState(true)

  // State Filter & Search
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("Semua")

  // 1. Fetch Data dari Supabase saat halaman dibuka
  useEffect(() => {
    const fetchObjects = async () => {
      setLoading(true)
      // Join ke tabel planets untuk ambil nama planet induk (jika ada)
      const { data, error } = await supabase
        .from("space_objects")
        .select(`
          *,
          planets ( name )
        `)
      
      if (error) {
        console.error("Error fetching objects:", error)
      } else {
        setObjects(data || [])
      }
      setLoading(false)
    }

    fetchObjects()
  }, [])

  // 2. Logika Filter (Search + Kategori)
  const filteredObjects = objects.filter((obj) => {
    const matchesSearch = obj.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "Semua" || obj.type === selectedType
    return matchesSearch && matchesType
  })

  return (
    // Galaxy Background dengan Animasi
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-20 px-4 relative overflow-hidden">
      {/* Animated Galaxy Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Nebula */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Stars */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER SECTION dengan Glow Effect */}
        <div className="mb-10 text-center">
          <div className="relative inline-block mb-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent animate-gradient pb-2">
              Ensiklopedia Angkasa
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-2xl opacity-20 animate-pulse"></div>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            ✨ Jelajahi bulan, asteroid, dan objek misterius lainnya di galaksi kita
          </p>
        </div>

        {/* SEARCH & FILTER CONTROLS dengan Glass Effect */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar dengan Glow */}
          <div className="relative flex-1 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-cyan-400" />
              <input
                type="text"
                placeholder="🔍 Cari objek (misal: Titan, Pluto)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition shadow-lg shadow-black/20"
              />
            </div>
          </div>

          {/* Filter Types dengan Hover Animation */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {OBJECT_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedType === type
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/40 scale-105"
                    : "bg-slate-900/70 backdrop-blur-xl text-slate-300 hover:bg-slate-800/70 border border-slate-700/50 hover:border-cyan-500/50 hover:scale-105"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* LOADING STATE dengan Animasi */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-800 border-t-cyan-500 mb-4"></div>
              <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl animate-pulse"></div>
            </div>
            <p className="text-slate-300 font-medium">🛸 Mengunduh data dari satelit...</p>
          </div>
        )}

        {/* GRID HASIL dengan Galaxy Cards */}
        {!loading && filteredObjects.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredObjects.map((obj) => (
              <Link href={`/object/${obj.id}`} key={obj.id} className="group">
                <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/30 h-full flex flex-col">
                  
                  {/* Glow Effect on Hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
                  
                  <div className="relative z-10 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                      <img
                        src={obj.image_url}
                        alt={obj.name}
                        className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-125 group-hover:rotate-3 transition-all duration-700"
                      />
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                      
                      {/* Badge Type dengan Glow */}
                      <div className="absolute top-3 right-3">
                        <span className="relative bg-black/70 backdrop-blur-md border border-cyan-400/30 text-xs font-bold px-3 py-1.5 rounded-full text-cyan-300 shadow-lg shadow-cyan-500/20">
                          {obj.type}
                        </span>
                      </div>
                    </div>

                    {/* Content dengan Glass Effect */}
                    <div className="p-5 flex-1 flex flex-col bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-sm">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                        {obj.name}
                      </h3>
                      
                      {obj.parent_planet ? (
                        <p className="text-sm text-slate-400 mt-auto flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                          Bulan dari {obj.parent_planet.name}
                        </p>
                      ) : (
                        <p className="text-sm text-slate-400 mt-auto flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                          Mengorbit Matahari
                        </p>
                      )}
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>
        ) : !loading && (
          /* EMPTY STATE dengan Galaxy Theme */
          <div className="text-center py-20 bg-slate-900/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 border-dashed relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10"></div>
            <div className="relative z-10">
              <div className="relative inline-block mb-4">
                <Rocket className="mx-auto h-16 w-16 text-slate-600 animate-bounce" />
                <div className="absolute inset-0 blur-xl bg-cyan-500/20 animate-pulse"></div>
              </div>
              <h3 className="text-2xl font-bold text-slate-300 mb-2">🌌 Objek Tidak Ditemukan</h3>
              <p className="text-slate-400">Coba ganti kata kunci pencarian Anda.</p>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS untuk Animasi */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}