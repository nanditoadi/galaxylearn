"use client"

interface NavigationProps {
  currentPage: "home" | "planets" | "catalog" | "profile" // Tambah "planets"
  onNavigate: (page: "home" | "planets" | "catalog" | "profile") => void
}

export default function Navigation({ currentPage, onNavigate }: NavigationProps) {
  // 2. Update List Item
  const navItems = [
    { id: "home" as const, label: "Home", symbol: "🏠" },
    { id: "planets" as const, label: "Planet", symbol: "🌍" }, // ITEM BARU
    { id: "catalog" as const, label: "Galaksi", symbol: "☄️" },
    { id: "profile" as const, label: "Profil", symbol: "👤" },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300">🌌</span>
              <div className="absolute inset-0 blur-xl bg-purple-500/30 group-hover:bg-purple-500/50 transition-all duration-300"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300 bg-clip-text text-transparent">
                GalaxyLearn
              </h1>
              <p className="text-xs text-slate-400">Jelajahi Galaksi</p>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex items-center gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-6 py-3 rounded-full transition-all duration-300 font-semibold overflow-hidden group ${
                  currentPage === item.id
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/40"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {/* Hover Background Effect */}
                {currentPage !== item.id && (
                  <div className="absolute inset-0 bg-slate-800/50 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
                
                {/* Glow Effect on Hover */}
                {currentPage !== item.id && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                )}
                
                <span className="relative flex items-center gap-2 z-10">
                  <span className="text-xl">{item.symbol}</span>
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Glow Line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/50">
        {/* Top Glow Line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        
        <div className="flex justify-around h-20 relative">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`relative flex flex-col items-center justify-center w-full h-20 transition-all duration-300 ${
                currentPage === item.id
                  ? "text-cyan-400"
                  : "text-slate-400"
              }`}
            >
              {/* Active Indicator - Top Bar */}
              {currentPage === item.id && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50"></div>
              )}

              {/* Icon with Glow */}
              <div className="relative mb-1">
                <span className={`text-3xl transition-transform duration-300 ${
                  currentPage === item.id ? "scale-110" : ""
                }`}>
                  {item.symbol}
                </span>
                {currentPage === item.id && (
                  <div className="absolute inset-0 blur-xl bg-cyan-500/40 animate-pulse"></div>
                )}
              </div>

              {/* Label */}
              <span className={`text-xs font-semibold transition-all duration-300 ${
                currentPage === item.id ? "text-cyan-300" : ""
              }`}>
                {item.label}
              </span>

              {/* Background Glow on Active */}
              {currentPage === item.id && (
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/30 to-transparent"></div>
              )}
            </button>
          ))}
        </div>

        {/* Floating Stars Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: Math.random() * 0.5 + 0.3
              }}
            ></div>
          ))}
        </div>
      </nav>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}