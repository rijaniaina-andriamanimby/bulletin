import React from 'react'

const MatiereForm = ({ matiere, handleSubmit, onClose, handleChange }) => {
  return (
    <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {matiere.id ? "Modifier la matiere" : "Ajouter une matiere"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        {matiere.id
                            ? "Modifiez la matiere"
                            : "Remplissez le nom du nouveau matiere"}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="p-6 space-y-4" autoComplete='off'>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nom du matière <span className='text-red-500'>*</span></label>
                        <input
                            type="text"
                            name="nom"
                            value={matiere.nom}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            required
                        />
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
                            {matiere.id ? "Modifier" : "Ajouter"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default MatiereForm
