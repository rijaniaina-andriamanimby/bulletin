import React, { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import { PlusCircle } from 'lucide-react'
import api from '../service/api'
import DataTable from '../components/DataTable'

const Note = () => {
  const [notes, setNotes] = useState([])

  const fetchNotes = async() =>{
    try {
      const response = await api.get('/notes')
      setNotes(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const tableHeader = [
    {key: 'id', label: 'ID'},
    {key: 'eleve', label: 'Elève'},
    {key: 'coefficient', label: 'coefficient'},
    {key: 'matiere', label: 'Matière'},
    {key: 'typeNote', label: 'Type de note'},
    {key: 'session', label: 'Session'},
    {key: 'enseignant', label: 'Enseignant'},
  ]

  useEffect(()=>{
    fetchNotes()
  }, [])

  return (
    <div className='h-screen bg-gray-50 p-6'>
      {/** En tete du page */}
      <div className="max-w-7xl mx-auto">
        <div className='flex shadow px-3 p-4 rounded-2xl items-center justify-between'>
          <div className="">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestion des notes</h1>
            <p className="text-gray-600">Gérez et suivez tous vos notes dans votre établissement en un seul endroit</p>
          </div>
          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
            <SearchInput/>
            <button
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-sm hover:bg-emerald-700 transition-colors font-medium">
              <PlusCircle size={20} />
              Ajouter un note
            </button>
          </div>
        </div>
      </div>

      {/** Tableau de données */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <DataTable columns={tableHeader} data={notes}/>
      </div>
    </div>
  )
}

export default Note
