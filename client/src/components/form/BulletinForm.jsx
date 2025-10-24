import React from "react";

const BulletinForm = ({bulletin, classe, handleChange, handleSubmit, onClose}) => {
    return (
        <div className="fixed inset-0 bg-opacity-20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {bulletin.id ? "Modifier une bulletin" : "Génerer des bulletins"}
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        {bulletin.id
                            ? "Génerer des bulletins"
                            : "Remplissez les informations pour avoir les bulletins"}
                    </p>
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-4"
                    autoComplete="off"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Classe <span className="text-red-500">*</span>
                        </label>
                        <select
                        value={bulletin.classe}
                        onChange={handleChange}
                            name="classe"
                            id="classe"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors" required
                        >
                            <option value="">Séléctionner</option>
                            {classe.map((item) => (
                                <option value={item.id} key={item.id}>
                                    {item.nom}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Session <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="session"
                            id="session"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                            onChange={handleChange}
                            value={bulletin.session}
                            required
                        >
                            <option value="">Séléctionner</option>
                            <option value="Trimestre 1">Trimestre 1</option>
                            <option value="Trimestre 2">Trimestre 2</option>
                            <option value="Trimestre 3">Trimestre 3</option>
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
                            {bulletin.id ? "Modifier" : "Générer"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BulletinForm;