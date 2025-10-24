import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Classe from './pages/Classe'
import Eleve from './pages/Eleve'
import Enseignant from './pages/Enseignant'
import Matiere from './pages/Matiere'
import Note from './pages/Note'
import Layout from './layout/Layout'
import Bulletin from './pages/Bulletin'
import { AuthProvider } from './context/AuthContext'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/application' element={<Layout/>}>
          <Route index element ={<h1>Dashboard</h1>}/>
          <Route path='classe' element={<Classe/>}/>
          <Route path='eleve' element={<Eleve/>}/>
          <Route path='enseignant' element={<Enseignant/>}/>
          <Route path='matiere' element={<Matiere/>}/>
          <Route path='note' element={<Note/>}/>
          <Route path='bulletin' element={<Bulletin/>}/>
        </Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
