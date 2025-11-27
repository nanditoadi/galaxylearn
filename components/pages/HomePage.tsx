"use client"

import Image from "next/image"

export default function HomePage() {
  const stats = [
    { label: "Planet", value: "8", icon: "🪐" },
    { label: "Objek Angkasa", value: "10+", icon: "🌙" },
    { label: "Fakta Planet", value: "8", icon: "☄️" }
  ]

  const featured = [
    { title: "Jupiter", subtitle: "Planet Gas Raksasa", description: "Planet terbesar di tata surya", image: "/jupiter.jpg", icon: "🪐" },
    { title: "Mars", subtitle: "Planet Merah", description: "Calon hunian manusia masa depan", image: "/mars.jpg", icon: "🔴" },
    { title: "Saturn", subtitle: "Planet Bercincin", description: "Keindahan cincin es dan batu", image: "/saturn.jpg", icon: "💍" },
  ]

  return (
    <div className="pt-20 md:pt-24 pb-20 md:pb-6 min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Animated Galaxy Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Nebula */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* Floating Stars */}
        {[...Array(100)].map((_, i) => (
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

      {/* Hero Section with 3D Earth */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left order-2 md:order-1">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-semibold backdrop-blur-sm">
                ✨ Jelajahi Alam Semesta
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
                Petualangan
              </span>
              <br />
              <span className="text-white">Lintas Galaksi</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Temukan keajaiban tata surya kita, dari planet raksasa hingga asteroid misterius yang mengelilingi matahari.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full font-semibold shadow-lg shadow-cyan-500/40 hover:shadow-cyan-500/60 hover:scale-105 transition-all duration-300">
                🚀 Mulai Eksplorasi
              </button>
              <button className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-full font-semibold hover:bg-slate-800 hover:border-cyan-500/50 transition-all duration-300">
                📖 Pelajari Lebih Lanjut
              </button>
            </div>
          </div>

          {/* Right - Floating Solar System */}
          <div className="relative order-1 md:order-2 h-[400px] md:h-[500px] flex items-center justify-center">
            {/* Central Sun */}
            <div className="absolute">
              <div className="relative w-32 h-32 md:w-40 md:h-40">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 bg-yellow-500/50 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl md:text-7xl">☀️</span>
                </div>
              </div>
            </div>

            {/* Orbiting Planets */}
            <div className="absolute w-64 h-64 md:w-80 md:h-80 animate-spin-slow">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-12 h-12 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50">
                  <span className="absolute inset-0 flex items-center justify-center text-2xl">🌍</span>
                </div>
              </div>
            </div>

            <div className="absolute w-48 h-48 md:w-64 md:h-64 animate-spin-slower">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-10 h-10 bg-orange-500 rounded-full shadow-lg shadow-orange-500/50">
                  <span className="absolute inset-0 flex items-center justify-center text-xl">🔴</span>
                </div>
              </div>
            </div>

            <div className="absolute w-80 h-80 md:w-96 md:h-96 animate-spin-slowest">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="relative w-14 h-14 bg-yellow-600 rounded-full shadow-lg shadow-yellow-600/50">
                  <span className="absolute inset-0 flex items-center justify-center text-3xl">🪐</span>
                </div>
              </div>
            </div>

            {/* Info Badge */}
            <div className="absolute -bottom-4 -right-4 bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl px-6 py-4 shadow-xl z-20">
              <p className="text-cyan-400 font-semibold text-sm mb-1">☀️ Tata Surya</p>
              <p className="text-slate-400 text-xs">8 Planet Mengorbit</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="relative bg-slate-900/50 backdrop-blur-xl rounded-2xl p-6 text-center border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/20 group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <p className="text-4xl mb-2">{stat.icon}</p>
                <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Objects */}
        <div className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              🌟 Objek Angkasa Terpilih
            </h2>
            <p className="text-slate-400">Kenali lebih dekat planet-planet di tata surya kita</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((item, i) => (
              <div
                key={i}
                className="relative bg-slate-900/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/30 group"
              >
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
                
                <div className="relative z-10">
                  {/* Image Container */}
                  <div className="relative aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl group-hover:scale-125 transition-transform duration-700">{item.icon}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-sm">
                    <h3 className="font-bold text-xl text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-cyan-400 text-sm font-semibold mb-2">{item.subtitle}</p>
                    <p className="text-slate-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slower {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-slowest {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 30s linear infinite;
        }
        .animate-spin-slowest {
          animation: spin-slowest 40s linear infinite;
        }
      `}</style>
    </div>
  )
}