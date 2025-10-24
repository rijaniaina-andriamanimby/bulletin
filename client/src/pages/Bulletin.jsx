import React, { use, useState, useEffect } from 'react'
import { PlusCircle } from 'lucide-react'
import SearchInput from '../components/SearchInput'
import DataTable from '../components/DataTable'
import BulletinForm from '../components/form/BulletinForm'
import api from '../service/api'
import FeedbackService from '../service/FeedBackService'

const Bulletin = () => {
  const [bulletins, setBulletins] = useState([])
  const [filteredBulletin, setFilteredBulletin] = useState([])
  const [openModal, setOpenModal] = useState(false)
  const [searchterm, setSearchTerm] = useState('')
  const [classes, setClasses] = useState([])
  const [selectedBulletin, setSelectedBulletin] = useState({id: '', classe: '', session: ''})

  {/** Pour récupérer les données depuis l'API */ }
  const fetchBulletins = async () => {
    try {
      const response = await api.get('/notes/bulletin')
      setBulletins(response.data)
      setFilteredBulletin(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  {/** Pour récupérer les données des clés étrangère */ }
  const fetchClasse = async () => {
    try {
      const responseClasses = await api.get('/classes/')
      setClasses(responseClasses.data)
    } catch (error) {
      console.log(error)
    }
  }



  {/** Définition des colonnes pour le tableau */ }
  const tableHeader = [
    { key: 'id', label: 'ID' },
    { key: 'eleve', label: 'Elève' },
    { key: 'session', label: 'Session' },
    { key: 'moyenne_generale', label: 'Moyenne' },
    { key: 'appreciation', label: 'Appréciation' },
  ]

  {/** Fonction executer lorsqu'on clique sur le bouton d'ajout ou modifier dans le formulaire */ }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Bulletin généré avec succès !")
    console.log(selectedBulletin)
  }

  {/** Quand on change quelque chose dans le formulaire */ }
  const handleChange = (e) => {
    setSelectedBulletin({ ...selectedBulletin, [e.target.name]: e.target.value })
  }

  {/** Fonction executer lors de la suppression */ }
  const handleDelete = async (id) => {
    try {
      const confirm = await FeedbackService.confirm()
      if (confirm) {
        await api.delete(`/notes/bulletin/${id}`)
        fetchBulletins()
        FeedbackService.success()
      }
    } catch (error) {
      FeedbackService.error()
    }
  }

    {/** Lorsqu'on annule ou ferme le formulaire */ }
  const onClose = () => {
    setOpenModal(false)
    setSelectedBulletin({id: '', classe: '', session: ''})
  }

  {/** Fonction executer quand le composant est monté */ }
  useEffect(() => {
    fetchBulletins()
    fetchClasse()
  }, [])

  return (
    <div className='h-screen bg-gray-50 p-6'>
      <div className="max-w-7xl mx-auto">
        {/* En-tête de la page */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white shadow px-5 py-4 rounded-2xl">
          {/* Titre et description */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              Gestion des bulletins
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Gérez et suivez toutes les bulletins de votre établissement en un seul endroit
            </p>
          </div>

          {/* Zone de recherche + bouton d’ajout */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            {/* Champ de recherche */}
            <SearchInput search={searchterm} setSearch={setSearchTerm} />

            {/* Bouton d’ajout */}
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-sm hover:bg-emerald-700 transition-colors font-medium w-full sm:w-auto">
              <PlusCircle size={20} />
              <span>Gérer un bulletin</span>
            </button>
          </div>
        </div>
        {/* Bouton filtre */}

      </div>
      {/** Tableau de données */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-5">
        <DataTable data={filteredBulletin} columns={tableHeader} onDelete={handleDelete}/>
      </div>

      {
        openModal && (
          <BulletinForm 
            bulletin={selectedBulletin} 
            classe={classes} 
            handleSubmit={handleSubmit} 
            onClose={onClose} 
            handleChange={handleChange}
          />
        )
      }
    </div>
  )
}

export default Bulletin
