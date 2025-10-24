import React, { useState, useEffect } from 'react'
import SearchInput from '../components/SearchInput'
import { PlusCircle } from 'lucide-react'
import api from '../service/api'
import DataTable from '../components/DataTable'
import ClasseForm from '../components/form/ClasseForm'
import FeedbackService from '../service/FeedBackService'

const Classe = () => {
  const [classes, setClasses] = useState([])
  const [selectedClasse, setSelectedClasse] = useState({id: "", nom:""})
  const [openModal, setOpenModal] = useState(false)
  const [searchterm, setSearchTerm] = useState("")
  const [filteredClasse, setFilteredClasse] = useState([])

  {/** Définition des colonnes pour le tableau */}
  const tableHeader = [
    { key: "id", label: "ID" },
    { key: "nom", label: "Nom de la classe" },
  ];

  {/** Pour récupérer les données depuis l'API */}
  const fetchClasses = async () => {
    try {
      const response = await api.get('/classes/')
      setClasses(response.data)
      setFilteredClasse(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  {/** Fonction executer lorqu'on clique sur le bouton modifier */}
  const handleEdit = (classe)=>{
    setSelectedClasse(classe)
    setOpenModal(true)
  }

  {/** Fonction executer lorqu'on modifie une nouvelle classe */}
  const updateClasse = async(classe)=>{
    try {
      const response = await api.put(`/classes/${classe.id}`, classe)
      setFilteredClasse([...classes, response.data])
      setOpenModal(false)
      setSelectedClasse({id:"", nom:""})
      FeedbackService.success()
    } catch (error) {
      FeedbackService.error()
      console.log(error)
    }
  }

  {/** Fonction executer lorqu'on ajoute une nouvelle classe */}
  const addClasse = async (classe)=>{
    try {
      const response = await api.post('/classes/', classe)
      setFilteredClasse([...classes, response.data])
      setOpenModal(false)
      setSelectedClasse({id:"", nom:""})
      FeedbackService.success()
    } catch (error) {
      FeedbackService.error()
      console.log(error)
    }
  }

  {/** Fonction executer lorsqu'on clique sur le bouton d'ajout ou modifier dans le formulaire */}
  const handleSubmit = (e)=> {
    e.preventDefault()
    if(selectedClasse.id){
      updateClasse(selectedClasse)
    }else{
      addClasse(selectedClasse)
    }
  }

  {/** Quand on change quelque chose dans le formulaire */}
  const handleChange = (e)=>{
    setSelectedClasse({...selectedClasse, [e.target.name]: e.target.value})
  }

  {/** Fonction executer lors de la suppression */}
  const handleDelete = async (id)=>{
    try {
      const confirm = await FeedbackService.confirm()
      if(confirm){
        await api.delete(`/classes/${id}`)
        setFilteredClasse(classes.filter((classe)=> classe.id !== id))
        FeedbackService.success()
      }
    } catch (error) {
      FeedbackService.error()
    }
  }

  {/** Filtrer les données selon ce que l'utilisateur recherche */}
  useEffect(()=>{
    const result = classes.filter(
      (classe)=> classe.nom.toLowerCase().includes(searchterm.toLowerCase())
    )
    setFilteredClasse(result)
  },[searchterm])

  {/** Fonction executer quand le composant est monté */}
  useEffect(() => {
    fetchClasses()
  }, [])

  return (
    <div className='h-screen bg-gray-50 p-6'>
      {/** En tete du page */}
      <div className="max-w-7xl mx-auto">
        <div className='flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white shadow px-5 py-4 rounded-2xl'>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">Gestion des classes</h1>
            <p className="text-gray-600 text-sm md:text-base">Gérez et suivez tous vos classes en un seul endroit</p>
          </div>
          <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
            <SearchInput search={searchterm} setSearch={setSearchTerm} />
            <button
            onClick={()=>setOpenModal(!openModal)}
              className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-lg shadow-sm hover:bg-emerald-700 transition-colors font-medium w-full sm:w-auto">
              <PlusCircle size={20} />
              Ajouter une classe
            </button>
          </div>
        </div>

        {/** Tableau de données */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-5">
          <DataTable 
            columns={tableHeader} 
            data={filteredClasse} 
            onEdit={handleEdit}
            onDelete={handleDelete}/>
        </div>

        {/** Modal pour ajouter ou modifier une classe */}
        {openModal && 
          (<ClasseForm 
            classe={selectedClasse} 
            handleSubmit={handleSubmit} 
            onClose={()=>{setOpenModal(false)}}
            handleChange={handleChange}/>
          )
        }
      </div>
    </div>
  )
}

export default Classe