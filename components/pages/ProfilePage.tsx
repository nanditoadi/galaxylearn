"use client"

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
    <div className="pt-20 md:pt-24 pb-20 md:pb-8 min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4">
        {/* Avatar Section */}
        <div className="text-center mb-12">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-6 shadow-lg">
            <span className="text-6xl">👤</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{profileData.name}</h1>
          <p className="text-gray-600 text-lg">{profileData.praktikum}</p>
        </div>

        {/* Info Cards */}
        <div className="space-y-4 mb-8">
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">NIM</p>
            <p className="text-2xl font-bold text-gray-900">{profileData.nim}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Kelompok</p>
            <p className="text-2xl font-bold text-gray-900">{profileData.kelompok}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="text-lg font-bold text-gray-900">{profileData.email}</p>
          </div>
        </div>

        {/* Project Info */}
        <div className="bg-gray-100 rounded-lg p-6 text-center border border-gray-300">
          <h2 className="text-lg font-bold text-gray-900 mb-2">CineHub PWA</h2>
          <p className="text-gray-700 mb-2">Tugas Praktikum Progressive Web App</p>
          <p className="text-sm text-gray-600">
            Dapat diinstall dan bekerja offline.
          </p>
        </div>
      </div>
    </div>
  )
}
