import React, { use, useState } from 'react'

const NoteForm = ({ note, handleSubmit, onClose, handleChange, eleve, matiere, enseignant, classe }) => {
  const [eleveFiltered, setEleveFiltered] = useState([...eleve])

  const filter = (id) => {
    if (id) {
      return setEleveFiltered(eleve.filter(item => item.classe === parseInt(id)))
    } else {
      return setEleveFiltered(eleve)
    }
  }

  return (
    <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {note.id ? "Modifier une note" : "Ajouter une note"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {note.id
              ? "Modifiez la note"
              : "Remplissez les informations sur la nouvelle note"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4" autoComplete='off'>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Classe</label>
              <select name="classe" id="classe" className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors'
                onChange={(e) => filter(e.target.value)}>
                <option value="">Séléctionner</option>
                {
                  classe.map((item) => (
                    <option value={item.id} key={item.id}>{item.nom}</option>
                  ))
                }
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session <span className='text-red-500'>*</span>
              </label>
              <select
                name="session"
                id="session"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                onChange={handleChange}
                value={note.session} required>
                <option value="">Séléctionner</option>
                <option value="Trimestre 1">Trimestre 1</option>
                <option value="Trimestre 2">Trimestre 2</option>
                <option value="Trimestre 3">Trimestre 3</option>
              </select>
            </div>

          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Elève <span className='text-red-500'>*</span></label>
            <select name="eleve" id="eleve" value={note.eleve} onChange={handleChange} className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors' required>
              <option value="">Séléctionner</option>
              {
                eleveFiltered.map((item) => (
                  <option value={item.id} key={item.id}>{item.nom + " " + item.prenom}</option>
                ))
              }
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Coéfficient <span className='text-red-500'>*</span>
              </label>
              <input
                type="number"
                name="coefficient"
                value={note.coefficient}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Matière <span className='text-red-500'>*</span></label>
              <select
                name="matiere"
                id="matiere"
                value={note.matiere}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" required>
                <option value="">Séléctionner</option>
                {
                  matiere.map((item) => (
                    <option value={item.id} key={item.id}>{item.nom}</option>
                  ))
                }
              </select>

            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type du note <span className='text-red-500'>*</span></label>
              <select
                name="typeNote"
                id="typeNote"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                onChange={handleChange}
                value={note.typeNote} required>
                <option value="">Séléctionner</option>
                <option value="Note 1">Note 1</option>
                <option value="Note 2">Note 2</option>
                <option value="Examen">Examen</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Note <span className='text-red-500'>*</span>
              </label>
              <input
                type="number"
                name="valeur"
                value={note.valeur}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Enseignant <span className='text-red-500'>*</span></label>
            <select
              name="enseignant"
              id="enseignant"
              value={note.enseignant}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" required>
              <option value="">Séléctionner</option>
              {
                enseignant.map((item) => (
                  <option value={item.id} key={item.id}>{item.nom + " " + item.prenom}</option>
                ))
              }
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg transition-colors font-medium"
            >
              {note.id ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NoteForm
