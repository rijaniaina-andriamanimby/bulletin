import React, { use, useEffect, useState } from 'react'
import SearchInput from '../components/SearchInput'
import { PlusCircle, Filter, School, Calendar, Book, User } from 'lucide-react'
import api from '../service/api'
import DataTable from '../components/DataTable'
import FeedbackService from '../service/FeedBackService'
import NoteForm from '../components/form/NoteForm'

const Note = () => {
  const [notes, setNotes] = useState([])
  const [selectedNote, setSelectedNote] = useState({ id: '', eleve: '', coefficient: 1, valeur: 0, matiere: '', typeNote: '', session: '', enseignant: '' })
  const [openModal, setOpenModal] = useState(false)
  const [searchterm, setSearchTerm] = useState("")
  const [filteredNote, setFilteredNote] = useState([])
  const [eleves, setEleves] = useState([])
  const [matieres, setMatieres] = useState([])
  const [enseignants, setEnseignants] = useState([])
  const [classes, setClasses] = useState([])
  const [classeFilter, setClasseFilter] = useState('')
  const [matiereFilter, setMatiereFilter] = useState('')
  const [typeNoteFilter, setTypeNoteFilter] = useState('')
  const [sessionFilter, setSessionFilter] = useState('')
  const [enseignantFilter, setEnseignantFilter] = useState('')

  {/** Pour récupérer les données depuis l'API */ }
  const fetchNotes = async () => {
    try {
      const response = await api.get('/notes')
      setNotes(response.data)
      setFilteredNote(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  {/** Pour récupérer les données des clés étrangère */ }
  const fecthForeignKeyData = async () => {
    try {
      const responseEleves = await api.get('/eleves/')
      const responseMatieres = await api.get('/matieres/')
      const responseEnseignants = await api.get('/enseignants/')
      const responseClasses = await api.get('/classes/')
      setEleves(responseEleves.data)
      setMatieres(responseMatieres.data)
      setEnseignants(responseEnseignants.data)
      setClasses(responseClasses.data)
    } catch (error) {
      console.log(error)
    }
  }

  {/** En tete du tableau et les clés pour le data*/ }
  const tableHeader = [
    { key: 'id', label: 'ID' },
    { key: 'nomEleveComplet', label: 'Elève' },
    { key: 'coefficient', label: 'coefficient' },
    { key: 'valeur', label: 'Note' },
    { key: 'matiereNom', label: 'Matière' },
    { key: 'typeNote', label: 'Type de note' },
    { key: 'session', label: 'Session' },
    { key: 'nomEnseignantComplet', label: 'Enseignant' },
  ]

  {/** Fonction executer lorqu'on clique sur le bouton modifier */ }
  const handleEdit = (note) => {
    setSelectedNote(note)
    setOpenModal(true)
  }

  {/** Quand on change quelque chose dans le formulaire */ }
  const handleChange = (e) => {
    setSelectedNote({ ...selectedNote, [e.target.name]: e.target.value })
    console.log(selectedNote)
  }

  {/** Fonction executer lorqu'on ajoute une nouvelle classe */ }
  const addNote = async (note) => {
    try {
      const response = await api.post('/notes/', note)
      setFilteredNote([...notes, response.data])
      setNotes([...notes, response.data])
      onClose()
      FeedbackService.success()
    } catch (error) {
      FeedbackService.error()
      console.log(error)
    }
  }

  {/** Fonction executer lorqu'on modifie une nouvelle classe */ }
  const updateNote = async (note) => {
    try {
      const response = await api.put(`/notes/${note.id}/`, note)
      setFilteredNote((prev) => prev.map((value) => {
        if (value.id === note.id) {
          return response.data
        } else {
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
    if (selectedNote.id) {
      updateNote(selectedNote)
    } else {
      addNote(selectedNote)
    }
  }

  {/** Fonction executer lors de la suppression */ }
  const handleDelete = async (id) => {
    try {
      const confirm = await FeedbackService.confirm()
      if (confirm) {
        await api.delete(`/notes/${id}/`)
        fetchNotes()
        FeedbackService.success()
      }
    } catch (error) {
      FeedbackService.error()
    }
  }

  {/** Lorsqu'on annule ou ferme le formulaire */ }
  const onClose = () => {
    setOpenModal(false)
    setSelectedNote({ id: '', eleve: '', coefficient: '', valeur: '', matiere: '', typeNote: '', session: '', enseignant: '' })
  }

  {/** Filtrer les données selon ce que l'utilisateur recherche */ }
  useEffect(() => {
    let result = [...notes] // copie de la liste d'origine

    // Filtre par recherche (nom ou prénom)
    if (searchterm.trim() !== "") {
      result = result.filter(
        (item) =>
          item.nomEleveComplet.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.nomEnseignantComplet.toLowerCase().includes(searchterm.toLowerCase()) ||
          item.matiereNom.toLowerCase().includes(searchterm.toLowerCase())
      )
    }

    // Filtre par classe
    if (classeFilter) {
      result = result.filter((note) => {
        return note.classe === classeFilter
      })
    }

    // Filtre par matière
    if (matiereFilter) {
      result = result.filter((note) => {
        return note.matiere === parseInt(matiereFilter)
      })
    }

    // Filtre par enseignant
    if (enseignantFilter) {
      result = result.filter((note) => {
        return note.enseignant === parseInt(enseignantFilter)
      })
    }

    // Filtre par session
    if (sessionFilter) {
      result = result.filter((note) => {
        return note.session === sessionFilter
      })
    }

    // Filtre par enseignant
    if (typeNoteFilter) {
      result = result.filter((note) => {
        return note.typeNote === typeNoteFilter
      })
    }

    // Met à jour le tableau affiché
    setFilteredNote(result)
  }, [searchterm, classeFilter, matiereFilter, sessionFilter, enseignantFilter, typeNoteFilter])

  useEffect(() => {
    fetchNotes()
    fecthForeignKeyData()
  }, [])

  return (
    <div className='h-screen bg-gray-50 p-6'>
      <div className="max-w-7xl mx-auto">
        {/* En-tête de la page */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white shadow px-5 py-4 rounded-2xl">
          {/* Titre et description */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
              Gestion des notes
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Gérez et suivez toutes les notes de votre établissement en un seul endroit
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
              <span>Ajouter une note</span>
            </button>
          </div>
        </div>
        {/* Bouton filtre */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 mt-5">
          <div className="flex flex-col gap-6">
            {/* Titre du filtre (facultatif) */}
            <h2 className="text-lg font-semibold text-gray-700">Filtrer les notes</h2>

            {/* Filtres sous forme de grille responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {/* Filtrer par classe */}
              <div className="relative">
                <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={classeFilter}
                  onChange={(e) => setClasseFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white text-sm">
                  <option value="">Toutes les classes</option>
                  {classes.map((classe) => (
                    <option key={classe.id} value={classe.id}>{classe.nom}</option>
                  ))}
                </select>
              </div>

              {/* Filtrer par matière */}
              <div className="relative pr-1">
                <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={matiereFilter}
                  onChange={(e) => setMatiereFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white text-sm">
                  <option value="">Toutes les matières</option>
                  {matieres.map((item) => (
                    <option key={item.id} value={item.id}>{item.nom}</option>
                  ))}
                </select>
              </div>

              {/* Filtrer par type de note */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={typeNoteFilter}
                  onChange={(e) => setTypeNoteFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white text-sm">
                  <option value="">Notes</option>
                  <option value="Note 1">Note 1</option>
                  <option value="Note 2">Note 2</option>
                  <option value="Examen">Examen</option>
                </select>
              </div>

              {/* Filtrer par session */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={sessionFilter}
                  onChange={(e) => setSessionFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white text-sm">
                  <option value="">Session</option>
                  <option value="Trimestre 1">Trimestre 1</option>
                  <option value="Trimestre 2">Trimestre 2</option>
                  <option value="Trimestre 3">Trimestre 3</option>
                </select>
              </div>

              {/* Filtrer par enseignant */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={enseignantFilter}
                  onChange={(e) => setEnseignantFilter(e.target.value)}
                  className="w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors bg-white text-sm">
                  <option value="">Tous les enseignants</option>
                  {enseignants.map((item) => (
                    <option key={item.id} value={item.id}>{item.nom} {item.prenom}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/** Tableau de données */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <DataTable columns={tableHeader} data={filteredNote} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
      {
        openModal && (
          <NoteForm
            note={selectedNote}
            handleChange={handleChange}
            onClose={onClose}
            handleSubmit={handleSubmit}
            eleve={eleves}
            matiere={matieres}
            enseignant={enseignants}
            classe={classes}
          />
        )
      }
    </div>
  )
}

export default Note