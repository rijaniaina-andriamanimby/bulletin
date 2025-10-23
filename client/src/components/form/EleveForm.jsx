import React, { useEffect, useState } from 'react'
import api from '../../service/api'

const EleveForm = ({ eleve, handleSubmit, onClose, handleChange, classes }) => {

  return (
    <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {eleve.id ? "Modifier l'eleve" : "Ajouter un eleve"}
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {eleve.id
              ? "Modifiez l'elève"
              : "Remplissez les informations sur le nouveau eleve"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4" autoComplete='off'>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nom <span className='text-red-500'>*</span></label>
              <input
                type="text"
                name="nom"
                value={eleve.nom}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prénoms <span className='text-red-500'>*</span>
              </label>
              <input
                type="text"
                name="prenom"
                value={eleve.prenom}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date de naissance <span className='text-red-500'>*</span></label>
            <input
              type="date"
              name="naissance"
              value={eleve.naissance}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Genre <span className='text-red-500'>*</span></label>
              <select 
              name="genre" 
              id="genre" 
              className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors' 
              onChange={handleChange} value={eleve.genre}
              required>
                <option value="F">F</option>
                <option value="G">G</option>
              </select>
              
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Matricule <span className='text-red-500'>*</span></label>
              <input
                type="text"
                name="matricule"
                value={eleve.matricule}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Classe <span className='text-red-500'>*</span></label>
            <select 
            name="classe" 
            id="classe" 
            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors' 
            onChange={handleChange} 
            value={eleve.classe} required>
              <option value="">Séléctionner</option>
              {
                classes.map((classe=>(
                  <option value={classe.id} key={classe.id}>{classe.nom}</option>
                )))
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
              {eleve.id ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EleveForm
