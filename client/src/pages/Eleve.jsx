import React, { use, useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import { PlusCircle, Filter } from "lucide-react";
import api from '../service/api'
import DataTable from '../components/DataTable'
import FeedbackService from '../service/FeedBackService'
import EleveForm from '../components/form/EleveForm';

const Eleve = () => {
  const [eleves, setEleves] = useState([])
  const [selectedEleve, setSelectedEleve] = useState({
    id: '', nom: '', prenom: '', genre: '', naissance: '', matricule: '', classe: ''
  })
  const [openModal, setOpenModal] = useState(false)
  const [filteredEleves, setFilteredEleves] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [classes, setClasses] = useState([])
  const [classeFilter, setClasseFilter] = useState('')
  const [genreFilter, setGenreFilter] = useState('')

  {/** Pour récupérer les données depuis l'API */ }
  const fetchEleves = async () => {
    try {
      const response = await api.get('/eleves/')
      setEleves(response.data)
      setFilteredEleves(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  {/** Fonctions pour avoir les données via l'API */ }
  const fetcClasses = async () => {
    const response = await api.get('/classes/')
    setClasses(response.data)
  }

  {/** Définition des colonnes pour le tableau */ }
  const tableHeader = [
    { key: 'id', label: 'ID' },
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénoms' },
    { key: 'genre', label: 'Genre' },
    { key: 'naissance', label: 'Date de naissance' },
    { key: 'matricule', label: 'Matricule' },
    { key: 'nomClasse', label: 'Classe' }
  ]

  {/** Fonction executer lorqu'on clique sur le bouton modifier */ }
  const handleEdit = (eleve) => {
    setSelectedEleve(eleve)
    setOpenModal(true)
  }

  {/** Fonction executer lorqu'on modifie un élève */ }
  const updateEleve = async (eleve) => {
    try {
      const response = await api.put(`/eleves/${eleve.id}`, eleve)
      setFilteredEleves((prev) => prev.map((value) => {
        if (value.id === selectedEleve.id) {
          return response.data
        }
        else {
          return value
        }
      }))
      onClose()
      FeedbackService.success()
    } catch (error) {
      console.log(error)
    }
  }

  {/** Fonction executer lorqu'on ajoute une nouvelle classe */ }
  const addEleve = async (eleve) => {
    try {
      const response = await api.post('/eleves/', eleve)
      setFilteredEleves([...eleves, response.data])
      setEleves([...eleves, response.data])
      onClose()
      FeedbackService.success()
    } catch (error) {
      console.log(error)
    }
  }

  {/** Fonction executer lorsqu'on clique sur le bouton d'ajout ou modifier dans le formulaire */ }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedEleve.id) {
      updateEleve(selectedEleve)
    } else {
      addEleve(selectedEleve)
    }
  }

  {/** Quand on change quelque chose dans le formulaire */ }
  const handleChange = (e) => {
    setSelectedEleve({ ...selectedEleve, [e.target.name]: e.target.value })
  }

  {/** Fonction executer lors de la suppression */ }
  const handleDelete = async (id) => {
    try {
      const confirm = await FeedbackService.confirm()
      if (confirm) {
        await api.delete(`/eleves/${id}`)
        fetchEleves()
        FeedbackService.success()
      }
    } catch (error) {
      FeedbackService.error()
    }
  }

  {/** Filtrer les données selon ce que l'utilisateur recherche */ }
  useEffect(() => {
  let result = [...eleves] // copie de la liste d'origine

  // Filtre par recherche (nom ou prénom)
  if (searchTerm.trim() !== "") {
    result = result.filter(
      (eleve) =>
        eleve.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eleve.prenom.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // Filtre par classe
  if (classeFilter) {
    result = result.filter((eleve) => {
      return eleve.classe === parseInt(classeFilter)
    })
  }

  // Filtre par genre
  if (genreFilter && genreFilter !== "Tous") {
    result = result.filter((eleve) => eleve.genre === genreFilter)
  }

  // Met à jour le tableau affiché
  setFilteredEleves(result)
}, [searchTerm, classeFilter, genreFilter, eleves])

  {/** Lorsqu'on annule ou ferme le formulaire */ }
  const onClose = () => {
    setOpenModal(false)
    setSelectedEleve({ id: '', nom: '', prenom: '', genre: '', naissance: '', matricule: '', classe: '' })
  }

  {/** Fonction executer quand le composant est monté */ }
  useEffect(() => {
    fetchEleves()
    fetcClasses()
  }, [])
  
  return (
    <div className='h-screen bg-gray-50 p-6'>
      {/** En tete du page */}
      <div className="max-w-7xl mx-auto">
        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white shadow px-5 py-4 rounded-2xl'>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">Gestion des élèves</h1>
            <p className="text-gray-600 text-sm md:text-base">Gérez et suivez tous vos élèves dans votre établissement en un seul endroit</p>
          </div>
          <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
            <SearchInput search={searchTerm} setSearch={setSearchTerm} />
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-sm hover:bg-emerald-700 transition-colors font-medium w-full sm:w-auto">
              <PlusCircle size={20} />
              Ajouter un élève
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 mt-5">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 justify-between">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={classeFilter}
                  onChange={(e)=>setClasseFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white">
                  <option value="">Toutes les classes</option>
                  {
                    classes.map((classe)=>(
                      <option value={classe.id} key={classe.id}>{classe.nom}</option>
                    ))
                  }
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={genreFilter}
                  onChange={(e)=>setGenreFilter(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white"
                >
                  <option value="Tous">Tous les genres</option>
                  <option value="F">F</option>
                  <option value="G">G</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/** Tableau de données */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-5">
          <DataTable columns={tableHeader} data={filteredEleves} onDelete={handleDelete} onEdit={handleEdit} />
        </div>

        {
          openModal && (
            <EleveForm eleve={selectedEleve} handleChange={handleChange} handleSubmit={handleSubmit} onClose={onClose} classes={classes} />
          )
        }

      </div>

    </div>
  )
}

export default Eleve
