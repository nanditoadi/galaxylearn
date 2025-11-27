"use client" // 👈 WAJIB ADA DI BARIS PERTAMA

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { ArrowLeft, Thermometer, Activity, Wind, Disc } from "lucide-react"

interface PlanetDetail {
  id: string
  name: string
  type: string
  image_url: string
  description: string
  diameter: string
  temperature: string
  distance_from_sun: string
  rotation_period: string
  orbital_period: string
  gravity: string
  moons: number
}

interface PlanetFact {
  id: string
  fact: string
}

// 👇 INI YANG PENTING: Harus 'export default function'
export default function PlanetDetail() {
  const { id } = useParams()
  const [planet, setPlanet] = useState<PlanetDetail | null>(null)
  const [facts, setFacts] = useState<PlanetFact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      if (!id) return

      setLoading(true)
      
      // 1. Ambil Data Planet
      const { data: pData, error: pError } = await supabase
        .from("planets")
        .select("*")
        .eq("id", id)
        .single()
      
      if (pError) console.error("Error planet:", pError)
      else setPlanet(pData)
      
      // 2. Ambil Fakta
      const { data: fData, error: fError } = await supabase
        .from("planet_facts")
        .select("*")
        .eq("planet_id", id)
      
      if (fError) console.error("Error facts:", fError)
      else setFacts(fData || [])

      setLoading(false)
    }
    
    getData()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-400">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p>Mendarat di permukaan...</p>
      </div>
    </div>
  )

  if (!planet) return <div className="min-h-screen bg-slate-950 text-white p-10">Planet tidak ditemukan.</div>

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-20">
      
      {/* --- HERO SECTION --- */}
      <div className="relative h-[50vh] w-full">
        <Link 
          href="/" // Kembali ke Home (atau ganti /planets jika mau ke list)
          className="absolute top-6 left-6 z-20 bg-black/40 backdrop-blur-md p-3 rounded-full hover:bg-black/60 transition border border-white/10 group"
        >
          <ArrowLeft className="text-white group-hover:-translate-x-1 transition-transform" />
        </Link>

        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950 z-10" />
        
        <img 
          src={planet.image_url} 
          alt={planet.name} 
          className="w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-0 w-full p-6 z-20 max-w-4xl mx-auto">
          <span className="inline-block bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-cyan-500/30">
            {planet.type}
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-2 drop-shadow-lg text-white">
            {planet.name}
          </h1>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="px-6 max-w-4xl mx-auto -mt-6 relative z-30">
        
        <p className="text-lg text-slate-300 leading-relaxed mb-8 font-light border-l-4 border-cyan-500 pl-4">
          {planet.description}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Thermometer size={14} className="text-red-400" /> Suhu Rata-rata
                </div>
                <div className="font-bold text-lg">{planet.temperature}</div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Activity size={14} className="text-green-400" /> Gravitasi
                </div>
                <div className="font-bold text-lg">{planet.gravity}</div>
            </div>
            <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Disc size={14} className="text-yellow-400" /> Diameter
                </div>
                <div className="font-bold text-lg">{planet.diameter}</div>
            </div>
             <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center gap-2 text-slate-500 text-xs mb-1">
                    <Wind size={14} className="text-blue-400" /> Rotasi
                </div>
                <div className="font-bold text-lg">{planet.rotation_period}</div>
            </div>
        </div>

        {/* Fun Facts */}
        {facts.length > 0 && (
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-yellow-400">
                <span>⚡</span> Fakta Menarik
            </h3>
            <div className="grid gap-4">
                {facts.map((item, index) => (
                    <div 
                        key={item.id} 
                        className="bg-slate-900 p-5 rounded-xl border-l-4 border-yellow-500 flex gap-4 shadow-lg hover:scale-[1.02] transition-transform"
                    >
                        <span className="text-4xl text-slate-700 font-bold opacity-50">
                            {index + 1}
                        </span>
                        <p className="text-slate-200 mt-1">{item.fact}</p>
                    </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}