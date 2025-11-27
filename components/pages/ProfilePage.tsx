"use client"

import { Mail, Users, Hash, Sparkles, Code, Rocket } from "lucide-react"

export default function ProfilePage() {
  const profileData = {
    name: "Nandito Adi Syahputra",
    nim: "21120123120023",
    kelompok: "Kelompok 13",
    email: "nanditoadi42@gmail.com",
    praktikum: "Praktikum Perangkat Lunak Bergerak",
  }

  const skills = ["React", "Next.js", "PWA", "Tailwind CSS", "TypeScript", "JavaScript"]

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-24 pb-20 px-4 relative overflow-hidden">
    
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] animate-pulse" style={{animationDelay: '2s'}}></div>
        
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

      <div className="max-w-4xl mx-auto relative z-10">
        
        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-40 h-40 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/50 border-4 border-slate-800">
              <span className="text-7xl">🚀</span>
            </div>
          </div>

          <div className="relative inline-block mb-4">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient pb-2">
              {profileData.name}
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg blur-xl opacity-20"></div>
          </div>
          
          <p className="text-slate-300 text-lg flex items-center justify-center gap-2">
            <Sparkles size={20} className="text-cyan-400" />
            {profileData.praktikum}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-slate-900/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Hash className="text-cyan-400" size={20} />
                </div>
                <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">NIM</p>
              </div>
              <p className="text-2xl font-bold text-white">{profileData.nim}</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-slate-900/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Users className="text-purple-400" size={20} />
                </div>
                <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Kelompok</p>
              </div>
              <p className="text-2xl font-bold text-white">{profileData.kelompok}</p>
            </div>
          </div>

          <div className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-slate-900/70 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 h-full">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Mail className="text-blue-400" size={20} />
                </div>
                <p className="text-sm text-slate-400 uppercase tracking-wider font-semibold">Email</p>
              </div>
              <p className="text-lg font-bold text-white break-all">{profileData.email}</p>
            </div>
          </div>
        </div>


        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
          <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-950/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 text-center overflow-hidden">
            
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="inline-block mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/50 animate-bounce">
                  <Rocket className="text-white" size={32} />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                GalaxyLearn PWA
              </h2>
              
              <p className="text-slate-300 text-lg mb-4 leading-relaxed">
                🌌 TA Praktikum PPB
              </p>
              
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-950/50 border border-cyan-500/30 rounded-full text-cyan-300 font-semibold">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                Dapat diinstall dan bekerja offline
              </div>
            </div>
          </div>
        </div>

      </div>
      
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
      `}</style>
    </div>
  )
}