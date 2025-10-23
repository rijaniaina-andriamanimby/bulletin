import React, { use, useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import { PlusCircle } from "lucide-react";
import api from '../service/api'
import DataTable from '../components/DataTable'
import FeedbackService from '../service/FeedBackService'

const Eleve = () => {
  const [eleves, setEleves] = useState([])
  const [selectedEleve, setSelectedEleve] = useState({
    id: '', nom: '', prenom: '', genre: '', date_naissance: '', numero_inscription: '', classe: ''
  })
  const [openModal, setOpenModal] = useState(false)
  const [filteredEleves, setFilteredEleves] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

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

  {/** Définition des colonnes pour le tableau */ }
  const tableHeader = [
    { key: 'id', label: 'ID' },
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'Prénoms' },
    { key: 'genre', label: 'Genre' },
    { key: 'date_naissance', label: 'Date de naissance' },
    { key: 'numero_inscription', label: 'Matricule' },
    { key: 'classe', label: 'Classe' }
  ]

  {/** Fonction executer lorqu'on clique sur le bouton modifier */ }
  const handleEdit = (classe) => {
    selectedEleve(classe)
    setOpenModal(true)
  }

  {/** Fonction executer lorqu'on modifie un élève */ }
  const updateEleve = async (eleve) => {
    try {
      const response = await api.put(`/eleves/${eleve.id}`, eleve)
      selectedEleve([...eleves, response.data])
      setOpenModal(false)
      setSelectedEleve({ id: '', nom: '', prenom: '', genre: '', date_naissance: '', numero_inscription: '', classe: '' })
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
      setOpenModal(false)
      setSelectedEleve({ id: '', nom: '', prenom: '', genre: '', date_naissance: '', numero_inscription: '', classe: '' })
      FeedbackService.success()
    } catch (error) {
      console.log(error)
    }
  }

  {/** Fonction executer lorsqu'on clique sur le bouton d'ajout ou modifier dans le formulaire */ }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (selectedEleve.id) {
      updateClasse(selectedEleve)
    } else {
      addClasse(selectedEleve)
    }
  }

  {/** Quand on change quelque chose dans le formulaire */ }
  const handleChange = (e) => {
    setSelectedEleve({ ...selectedEleve, [e.target.name]: e.target.value })
    console.log(selectedClasse.nom)
  }

  {/** Fonction executer lors de la suppression */ }
  const handleDelete = async (id) => {
    try {
      const confirm = await FeedbackService.confirm()
      if (confirm) {
        await api.delete(`/eleves/${id}`)
        setFilteredEleves(eleves.filter((eleve) => eleve.id !== id))
        FeedbackService.success()
      }
    } catch (error) {
      FeedbackService.error()
    }
  }

  {/** Filtrer les données selon ce que l'utilisateur recherche */ }
  useEffect(() => {
    const result = eleves.filter(
      (eleve) => eleve.nom.toLowerCase().includes(searchTerm.toLowerCase())
    )
    setFilteredEleves(result)
  }, [searchTerm])

  {/** Fonction executer quand le composant est monté */ }
  useEffect(() => {
    fetchEleves()
  }, [])
  return (
    <div className='h-screen bg-gray-50 p-6'>
      {/** En tete du page */}
      <div className="max-w-7xl mx-auto">
        <div className='flex shadow px-3 p-4 rounded-2xl items-center justify-between'>
          <div className="">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestion des élèves</h1>
            <p className="text-gray-600">Gérez et suivez tous vos élèves dans votre établissement en un seul endroit</p>
          </div>
          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
            <SearchInput search={searchTerm} setSearch={searchTerm} />
            <button
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-sm hover:bg-emerald-700 transition-colors font-medium">
              <PlusCircle size={20} />
              Ajouter un élève
            </button>
          </div>
        </div>
      </div>

      {/** Tableau de données */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <DataTable columns={tableHeader} data={filteredEleves} onDelete={handleDelete} onEdit={handleEdit} />
      </div>
    </div>
  )
}

export default Eleve
