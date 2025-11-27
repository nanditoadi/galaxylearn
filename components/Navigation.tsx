"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home", icon: "🏠" },
    { href: "/planets", label: "Planet", icon: "🌍" },
    { href: "/objects", label: "Galaksi", icon: "☄️" },
    { href: "/profile", label: "Profil", icon: "👤" },
  ]

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50
        bg-[#0A0F1F]/95 backdrop-blur-xl border-b border-[#1a2337]">
        
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="logo"
              className="h-10 w-10 rounded-xl shadow-lg"
            />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                GalaxyLearn
              </h1>
              <p className="text-[10px] text-slate-400">Jelajahi Galaksi</p>
            </div>
          </div>

          {/* Menu */}
          <div className="flex gap-3">
            {navItems.map(item => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-5 py-2 rounded-full flex items-center gap-2 text-sm font-semibold transition-all
                    ${
                      active
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/40"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    }`}
                >
                  <span>{item.icon}</span>
                  {item.label}
                </Link>
              )
            })}
          </div>

        </div>
      </nav>

      {/* Mobile Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0A0F1F]/95 backdrop-blur-xl border-t border-[#1a2337]">
        <div className="flex justify-around h-16">
          {navItems.map(item => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center w-full ${
                  active ? "text-cyan-400" : "text-slate-400"
                }`}
              >
                <span className={`text-2xl ${active ? "scale-110" : ""}`}>
                  {item.icon}
                </span>
                <span className="text-[10px] font-semibold">
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
