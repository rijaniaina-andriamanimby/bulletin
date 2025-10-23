import React, { useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import { PlusCircle } from 'lucide-react'
import api from '../service/api'
import DataTable from '../components/DataTable'
import FeedbackService from '../service/FeedBackService'
import MatiereForm from '../components/form/MatiereForm'

const Matiere = () => {
  const [matieres, setmatieres] = useState([])
  const [selectedMatiere, setSelectedMatiere] = useState({id: "", nom:""})
  const [openModal, setOpenModal] = useState(false)
  const [searchterm, setSearchTerm] = useState("")
  const [filteredMatiere, setFilteredMatiere] = useState([])

  {/** Définition des colonnes pour le tableau */}
  const tableHeader = [
    {key : 'id', label : "ID"},
    {key: 'nom', label: "Matière"}
  ]

  {/** Pour récupérer les données depuis l'API */}
  const fetchMatieres = async()=>{
    try {
      const response = await api.get('/matieres')
      setmatieres(response.data);
      setFilteredMatiere(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  {/** Fonction executer lorqu'on clique sur le bouton modifier */}
  const handleEdit = (matiere)=>{
    setSelectedMatiere(matiere)
    setOpenModal(true)
  }

    {/** Fonction executer lorqu'on modifie une nouvelle classe */}
  const updateMatiere = async(matiere)=>{
    try {
      const response = await api.put(`/matieres/${matiere.id}`, matiere)
      setFilteredMatiere(
        (prev)=> prev.map((value)=>{
          if(value.id == selectedMatiere.id){
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

  {/** Fonction executer lorqu'on ajoute une nouvelle classe */}
  const addMatiere = async (matiere)=>{
    try {
      const response = await api.post('/matieres/', matiere)
      setFilteredMatiere([...matieres, response.data])
      setmatieres([...matieres, response.data])
      onClose()
      FeedbackService.success()
    } catch (error) {
      FeedbackService.error()
      console.log(error)
    }
  }

  {/** Fonction executer lorsqu'on clique sur le bouton d'ajout ou modifier dans le formulaire */}
  const handleSubmit = (e)=> {
    e.preventDefault()
    if(selectedMatiere.id){
      updateMatiere(selectedMatiere)
    }else{
      addMatiere(selectedMatiere)
    }
  }

    {/** Quand on change quelque chose dans le formulaire */}
  const handleChange = (e)=>{
    setSelectedMatiere({...selectedMatiere, [e.target.name]: e.target.value})
  }

  {/** Fonction executer lors de la suppression */}
  const handleDelete = async (id)=>{
    try {
      const confirm = await FeedbackService.confirm()
      if(confirm){
        await api.delete(`/matieres/${id}`)
        fetchMatieres()
        FeedbackService.success()
      }
    } catch (error) {
      FeedbackService.error()
    }
  }

    {/** Filtrer les données selon ce que l'utilisateur recherche */}
    useEffect(()=>{
      const result = matieres.filter(
        (matiere)=> matiere.nom.toLowerCase().includes(searchterm.toLowerCase())
      )
      setFilteredMatiere(result)
    },[searchterm])

    {/** Lorsqu'on annule ou ferme le formulaire */ }
  const onClose = () => {
    setOpenModal(false)
    setSelectedMatiere({ id: '', nom: ''})
  }
  
  {/** Fonction executer quand le composant est monté */}
  useEffect(()=>{
    fetchMatieres()
  }, [])

  return (
    <div className='h-screen bg-gray-50 p-6'>
      {/** En tete du page */}
      <div className="max-w-7xl mx-auto">
        <div className='flex px-3 p-4 items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-200'>
          <div className="">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Gestion des matières</h1>
            <p className="text-gray-600">Gérez et suivez tous vos matières dans votre établissement en un seul endroit</p>
          </div>
          <div className='flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between'>
            <SearchInput search={searchterm} setSearch={setSearchTerm}/>
            <button
            onClick={()=>setOpenModal(true)}
              className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-sm hover:bg-emerald-700 transition-colors font-medium">
              <PlusCircle size={20} />
              Ajouter un matières
            </button>
          </div>
        </div>
      </div>

      {/** Tableau de données */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-5">
        <DataTable columns={tableHeader} data={filteredMatiere} onDelete={handleDelete} onEdit={handleEdit}/>
      </div>

      {
        openModal && (
          <MatiereForm matiere={selectedMatiere} handleChange={handleChange} onClose={onClose} handleSubmit={handleSubmit} />
        )
      }
    </div>
  )
}

export default Matiere
