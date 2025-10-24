import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Menu, X, GraduationCap, School, BookText, UserPen, BookOpen, CheckCheck, BookMarked, LayoutDashboard } from 'lucide-react'
// import logo from '../assets/logo.png';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => setIsOpen(!isOpen)

  const baseClass = "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group"
  const activeClass = "text-emerald-700 bg-emerald-50 border border-emerald-200 shadow-sm"
  const inactiveClass = "text-gray-600 hover:text-emerald-700 hover:bg-emerald-50 hover:border hover:border-emerald-100"

  const NavItem = ({ to, label, icon: Icon }) => (
    <NavLink
    onClick={toggleSidebar}
      to={to}
      end
      className={({ isActive }) => `${baseClass} ${isActive ? activeClass : inactiveClass}`}
      aria-label={label}>
      <Icon size={20} className="shrink-0 group-hover:scale-110 transition-transform duration-200" />
      <span className="font-medium">{label}</span>
    </NavLink>
  )

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-black">
      <aside
        className={`fixed inset-y-0 left-0 z-30 bg-white shadow-xl border-r border-gray-200 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static w-72`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <NavLink to="/" aria-label="Accueil" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold text-gray-900 tracking-tight">Bulletin Maker</span>
                  <p className="text-xs text-gray-500 mt-0.5">Gestion scolaires</p>
                </div>
              </NavLink>
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                onClick={toggleSidebar}
                aria-label="Fermer"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          <nav className="flex-1 p-6">
            <div className="space-y-2">
              <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Navigation</h3>
              </div>
              <NavItem to="/application" label="Tableau de bord" icon={LayoutDashboard} />
              <NavItem to="classe" label="Classe" icon={School} />
              <NavItem to="eleve" label="Elève" icon={GraduationCap} />
              <NavItem to="enseignant" label="Enseignant" icon={UserPen} />
              <NavItem to="matiere" label="Matière" icon={BookText} />
              <NavItem to="note" label="Note" icon={CheckCheck} />
              <NavItem to="bulletin" label="Bulletin" icon={BookMarked} />
            </div>
          </nav>

          <div className="p-6 border-t border-gray-100">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-emerald-900">Bulletin</p>
                  <p className="text-xs text-emerald-600">Optimisé et efficace</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <button
        className="fixed top-6 left-6 p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl lg:hidden shadow-lg hover:shadow-xl transition-all duration-200 z-40"
        onClick={toggleSidebar}
        aria-label="Ouvrir le menu"
      >
        <Menu size={20} />
      </button>

      {isOpen && (
        <div
          className="fixed mt-20 inset-0 bg-opacity-50 z-20 lg:hidden transition-opacity duration-200 backdrop-blur-md"
          onClick={toggleSidebar}
        />
      )}
    </div>
  )
}

export default SideBar