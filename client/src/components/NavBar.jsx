import { useAuth } from "../context/AuthContext"

const NavBar = () => {
  const {logout} = useAuth()

  return (
    <div className="shrink-0 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold text-gray-900">Système de Gestion scolaires</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600" onClick={logout}>En ligne</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
