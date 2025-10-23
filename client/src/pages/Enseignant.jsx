import React, { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import { PlusCircle } from 'lucide-react'
import api from '../service/api'
import DataTable from '../components/DataTable'

const Enseignant = () => {
  const [enseignants, setEnsignants] = useState([])

  const fetchEnseignant = async()=>{
    try {
      const respone = await api.get('/enseignants/')
      setEnsignants(respone.data);
    } catch (error) {
      console.log(error);
    }
  }

  {/** En tete du tableau et les clés pour le data*/}
  const tableHeader = [
    {key: 'id', label: 'ID'},
    {key: 'nom', label: 'Nom'},
    {key: 'prenom', label: 'prenom'},
    {key: 'email', label: 'email'},
  ]

  useEffect(()=>{
   fetchEnseignant() 
  }, [])
  return (
    <div className='h-screen bg-gray-50 p-6'>
      {/** En tete du page */}
      <div className="max-w-7xl mx-auto">
        <div className='flex shadow px-3 p-4 rounded-2xl items-center justify-between'>
          <div className="">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestion des enseignants</h1>
            <p className="text-gray-600">Gérez et suivez tous vos enseignants dans votre établissement en un seul endroit</p>
          </div>
          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
            <SearchInput/>
            <button
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-sm hover:bg-emerald-700 transition-colors font-medium">
              <PlusCircle size={20} />
              Ajouter un enseignant
            </button>
          </div>
        </div>
      </div>

      {/** Tableau de données */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
       <DataTable columns={tableHeader} data={enseignants}/>
      </div>
    </div>
  )
}

export default Enseignant
