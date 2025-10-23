import React, { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import { PlusCircle } from 'lucide-react'
import api from '../service/api'
import DataTable from '../components/DataTable'
import FeedbackService from '../service/FeedBackService'
import EnseignantForm from '../components/form/EnseignantForm'

const Enseignant = () => {
  const [enseignants, setEnsignants] = useState([])
  const [selecetdEnseignant, setSelectedEnseignant] = useState({ id: '', nom: '', prenom: '', email: '' })
  const [openModal, setOpenModal] = useState(false)
  const [searchterm, setSearchTerm] = useState("")
  const [filteredEnseignant, setFilteredEnseignant] = useState([])

  {/** Pour récupérer les données depuis l'API */ }
  const fetchEnseignant = async () => {
    try {
      const respone = await api.get('/enseignants/')
      setEnsignants(respone.data);
      setFilteredEnseignant(respone.data);
    } catch (error) {
      console.log(error);
    }
  }

  {/** En tete du tableau et les clés pour le data*/ }
  const tableHeader = [
    { key: 'id', label: 'ID' },
    { key: 'nom', label: 'Nom' },
    { key: 'prenom', label: 'prenom' },
    { key: 'email', label: 'email' },
  ]

  {/** Fonction executer lorqu'on clique sur le bouton modifier */ }
  const handleEdit = (enseignant) => {
    setSelectedEnseignant(enseignant)
    setOpenModal(true)
  }

  {/** Quand on change quelque chose dans le formulaire */ }
  const handleChange = (e) => {
    setSelectedEnseignant({ ...selecetdEnseignant, [e.target.name]: e.target.value })
    console.log(selecetdEnseignant)
  }

  {/** Fonction executer lorqu'on ajoute une nouvelle classe */ }
  const addEnseignant = async (enseignant) => {
    try {
      const response = await api.post('/enseignants/', enseignant)
      setFilteredEnseignant([...enseignants, response.data])
      setEnsignants([...enseignants, response.data])
      onClose()
      FeedbackService.success()
    } catch (error) {
      FeedbackService.error()
      console.log(error)
    }
  }

  {/** Fonction executer lorqu'on modifie une nouvelle classe */ }
  const updateEnseignant = async (enseignant) => {
    try {
      const response = await api.put(`/enseignants/${classe.id}`, enseignant)
      setFilteredEnseignant((prev)=>prev.map((value)=>{
        if(value.id === selecetdEnseignant.id){
          return response.data
        }else{
          return value
        }
      }))
      onClose()
      FeedbackService.success()
    } catch (error) {
      FeedbackService.error()
      console.log(error)
    }
  }

  {/** Fonction executer lorsqu'on clique sur le bouton d'ajout ou modifier dans le formulaire */ }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (selecetdEnseignant.id) {
      updateEnseignant(selecetdEnseignant)
    } else {
      addEnseignant(selecetdEnseignant)
    }
  }

  {/** Fonction executer lors de la suppression */ }
  const handleDelete = async (id) => {
    try {
      const confirm = await FeedbackService.confirm()
      if (confirm) {
        await api.delete(`/enseignants/${id}`)
        fetchEnseignant()
        FeedbackService.success()
      }
    } catch (error) {
      FeedbackService.error()
    }
  }

  {/** Filtrer les données selon ce que l'utilisateur recherche */ }
  useEffect(() => {
    const result = enseignants.filter(
      (enseignant) => (
        enseignant.nom.toLowerCase().includes(searchterm.toLowerCase()) ||
        enseignant.prenom.toLowerCase().includes(searchterm.toLowerCase()) ||
        enseignant.email.toLowerCase().includes(searchterm.toLowerCase())
      )
    )
    setFilteredEnseignant(result)
  }, [searchterm])

  {/** Lorsqu'on annule ou ferme le formulaire */ }
  const onClose = () => {
    setOpenModal(false)
    setSelectedEnseignant({ id: '', nom: '', prenom: '', email: '' })
  }

  useEffect(() => {
    fetchEnseignant()
  }, [])
  return (
    <div className='h-screen bg-gray-50 p-6'>
      {/** En tete du page */}
      <div className="max-w-7xl mx-auto">
        <div className='flex px-3 p-4 items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-200'>
          <div className="">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestion des enseignants</h1>
            <p className="text-gray-600">Gérez et suivez tous vos enseignants dans votre établissement en un seul endroit</p>
          </div>
          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
            <SearchInput search={searchterm} setSearch={setSearchTerm} />
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-sm hover:bg-emerald-700 transition-colors font-medium">
              <PlusCircle size={20} />
              Ajouter un enseignant
            </button>
          </div>
        </div>
      </div>

      {/** Tableau de données */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-5">
        <DataTable columns={tableHeader} data={filteredEnseignant} onDelete={handleDelete} onEdit={handleEdit} />
      </div>

      {
        openModal && (
          <EnseignantForm
            enseignant={selecetdEnseignant}
            onClose={onClose}
            handleSubmit={handleSubmit}
            handleChange={handleChange} />
        )
      }
    </div>
  )
}

export default Enseignant
