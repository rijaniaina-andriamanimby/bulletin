import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import NavBar from '../components/NavBar'

const Layout = () => {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <div className="shrink-0">
        <SideBar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <NavBar />
        <div className="flex-1 overflow-y-auto">
          <div className="min-h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
