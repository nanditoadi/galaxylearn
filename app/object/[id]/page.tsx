"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Ruler, 
  RefreshCcw, 
  Globe, 
  Scale 
} from "lucide-react"

interface SpaceObjectDetail {
  id: string
  name: string
  type: string
  image_url: string
  description: string
  diameter: string
  mass: string
  orbital_period: string
  discovery_year: number
  discovered_by: string
  fun_facts: string[] // Ini array string di database
  parent_planet_id: string
  planets?: {
    id: string
    name: string
  }
}

export default function ObjectDetail() {
  const { id } = useParams()
  const [object, setObject] = useState<SpaceObjectDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getObject = async () => {
      setLoading(true)
      // Join dengan tabel planets untuk mendapatkan nama planet induknya (jika ada)
      const { data, error } = await supabase
        .from("space_objects")
        .select(`
          *,
          planets (
            id,
            name
          )
        `)
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching object:", error)
      } else {
        setObject(data)
      }
      setLoading(false)
    }

    if (id) getObject()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400">
      <div className="animate-pulse flex flex-col items-center">
        <Globe className="w-10 h-10 animate-spin mb-2" />
        <p>Mendeteksi Objek...</p>
      </div>
    </div>
  )

  if (!object) return <div className="text-white p-10">Objek tidak ditemukan.</div>

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      {/* --- HERO IMAGE SECTION --- */}
      <div className="relative h-[50vh] w-full">
        <Link 
          href="/" 
          className="absolute top-6 left-6 z-20 bg-black/40 backdrop-blur-md p-3 rounded-full hover:bg-black/60 transition border border-white/10 group"
        >
          <ArrowLeft className="text-white group-hover:-translate-x-1 transition-transform" />
        </Link>

        {/* Image Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950 z-10" />
        
        <img 
          src={object.image_url} 
          alt={object.name} 
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 w-full p-6 z-20 max-w-4xl mx-auto">
            {/* Badge Type */}
            <span className="inline-block bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-cyan-500/30">
                {object.type}
            </span>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg">
              {object.name}
            </h1>

            {/* Link ke Parent Planet (Jika ada) */}
            {object.planets ? (
              <Link href={`/planet/${object.planets.id}`} className="inline-flex items-center gap-2 text-slate-300 hover:text-cyan-400 transition">
                 <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                 Mengorbit Planet <span className="underline font-bold">{object.planets.name}</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2 text-slate-300">
                <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                Mengorbit Matahari
              </div>
            )}
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="px-6 max-w-4xl mx-auto -mt-6 relative z-30">
        
        {/* Description */}
        <p className="text-lg text-slate-300 leading-relaxed mb-8 font-light">
          {object.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Ruler size={14} /> Diameter
                </div>
                <div className="font-bold text-lg">{object.diameter || "N/A"}</div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <RefreshCcw size={14} /> Periode Orbit
                </div>
                <div className="font-bold text-lg">{object.orbital_period || "N/A"}</div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Calendar size={14} /> Ditemukan
                </div>
                <div className="font-bold text-lg">{object.discovery_year || "Kuno"}</div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <User size={14} /> Penemu
                </div>
                <div className="font-bold text-lg truncate" title={object.discovered_by}>
                    {object.discovered_by || "Tidak Diketahui"}
                </div>
            </div>
        </div>

        {/* Extra Data (Mass & Gravity Placeholder) */}
        {object.mass && (
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-4 rounded-xl border border-slate-700 mb-8 flex items-center gap-4">
                <div className="bg-slate-800 p-3 rounded-full text-purple-400">
                    <Scale size={24} />
                </div>
                <div>
                    <p className="text-slate-400 text-sm">Massa Objek</p>
                    <p className="font-mono text-xl">{object.mass}</p>
                </div>
            </div>
        )}

        {/* Fun Facts Section */}
        {object.fun_facts && object.fun_facts.length > 0 && (
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-yellow-400">
                <span>⚡</span> Fakta Menarik
            </h3>
            <div className="grid gap-4">
                {object.fun_facts.map((fact, index) => (
                    <div 
                        key={index} 
                        className="bg-slate-900 p-5 rounded-xl border-l-4 border-yellow-500 flex gap-4 shadow-lg"
                    >
                        <span className="text-4xl text-slate-700 font-bold opacity-50">
                            {index + 1}
                        </span>
                        <p className="text-slate-200 mt-1">{fact}</p>
                    </div>
                ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}