"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { Search, Thermometer, Activity, Globe } from "lucide-react";

interface Planet {
  id: string;
  name: string;
  type: string;
  image_url: string;
  temperature: string;
  gravity: string;
  order_from_sun: number;
}

// 1. Tambahkan interface untuk style bintang agar Type Safe
interface StarStyle {
  top: string;
  left: string;
  animationDelay: string;
  opacity: number;
}

const PLANET_TYPES = ["Semua", "Terrestrial", "Gas Giant", "Ice Giant"];

export default function PlanetsPage() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("Semua");

  // 2. Tambahkan state untuk menyimpan posisi bintang
  const [stars, setStars] = useState<StarStyle[]>([]);

  // 3. Generate posisi bintang hanya di Client (Browser)
  useEffect(() => {
    const generatedStars = [...Array(40)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    const fetchPlanets = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("planets")
        .select("*")
        .order("order_from_sun", { ascending: true });

      if (error) {
        console.error("Error fetching planets:", error);
      } else {
        setPlanets(data || []);
      }
      setLoading(false);
    };

    fetchPlanets();
  }, []);

  const filteredPlanets = planets.filter((planet) => {
    const matchesSearch = planet.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType =
      selectedType === "Semua" || planet.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] animate-pulse"></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        {/* 4. Render bintang menggunakan data dari state, BUKAN random langsung */}
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.animationDelay,
              opacity: star.opacity,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* HEADER SECTION */}
        <div className="mb-10 text-center">
          <div className="relative inline-block mb-4">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-purple-500 bg-clip-text text-transparent animate-gradient pb-2">
              Tata Surya
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur-2xl opacity-20 animate-pulse"></div>
          </div>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
            🌍 Jelajahi 8 planet utama yang mengelilingi Matahari kita
          </p>
        </div>

        {/* CONTROLS SECTION */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-purple-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-orange-400" />
              <input
                type="text"
                placeholder="🔍 Cari planet (misal: Mars, Jupiter)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-900/70 backdrop-blur-xl border border-slate-700/50 text-white placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition shadow-lg shadow-black/20"
              />
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {PLANET_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedType === type
                    ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/40 scale-105"
                    : "bg-slate-900/70 backdrop-blur-xl text-slate-300 hover:bg-slate-800/70 border border-slate-700/50 hover:border-orange-500/50 hover:scale-105"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-800 border-t-orange-500 mb-4"></div>
              <div className="absolute inset-0 rounded-full bg-orange-500/20 blur-xl animate-pulse"></div>
            </div>
            <p className="text-slate-300 font-medium">
              🚀 Menyiapkan peluncuran...
            </p>
          </div>
        )}

        {/* GRID PLANETS */}
        {!loading && filteredPlanets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPlanets.map((planet) => (
              <Link
                href={`/planet/${planet.id}`}
                key={planet.id}
                className="group"
              >
                <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 hover:border-orange-500/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/20 h-full flex flex-col">
                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-600 via-red-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Image Container */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                      <img
                        src={planet.image_url}
                        alt={planet.name}
                        className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-125 group-hover:rotate-6 transition-all duration-700"
                      />

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>

                      {/* Order Badge (Nomor Urut) */}
                      <div className="absolute top-3 left-3">
                        <span className="flex items-center justify-center w-8 h-8 bg-black/60 backdrop-blur-md border border-white/10 rounded-full text-white font-bold text-sm shadow-lg">
                          {planet.order_from_sun}
                        </span>
                      </div>

                      {/* Type Badge */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-orange-500/20 backdrop-blur-md border border-orange-400/30 text-xs font-bold px-3 py-1 rounded-full text-orange-300">
                          {planet.type}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex-1 flex flex-col bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-sm">
                      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-400 group-hover:bg-clip-text transition-all duration-300">
                        {planet.name}
                      </h3>

                      {/* Stats Grid */}
                      <div className="mt-auto grid grid-cols-2 gap-2">
                        <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800 flex flex-col items-center justify-center text-center">
                          <Thermometer
                            size={16}
                            className="text-red-400 mb-1"
                          />
                          <span className="text-[10px] text-slate-400 uppercase">
                            Suhu
                          </span>
                          <span className="text-xs font-bold text-slate-200">
                            {planet.temperature.split("°")[0]}°
                          </span>
                        </div>
                        <div className="bg-slate-950/50 p-2 rounded-lg border border-slate-800 flex flex-col items-center justify-center text-center">
                          <Activity size={16} className="text-green-400 mb-1" />
                          <span className="text-[10px] text-slate-400 uppercase">
                            Gravitasi
                          </span>
                          <span className="text-xs font-bold text-slate-200">
                            {planet.gravity.split(" ")[0]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          !loading && (
            /* EMPTY STATE */
            <div className="text-center py-20 bg-slate-900/30 backdrop-blur-xl rounded-3xl border border-slate-700/50 border-dashed relative overflow-hidden">
              <div className="relative z-10">
                <Globe className="mx-auto h-16 w-16 text-slate-600 animate-pulse mb-4" />
                <h3 className="text-2xl font-bold text-slate-300 mb-2">
                  🔭 Planet Tidak Ditemukan
                </h3>
                <p className="text-slate-400">Coba cari nama planet lain.</p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Styles */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
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
  );
}
