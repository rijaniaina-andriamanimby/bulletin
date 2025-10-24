import { Search } from 'lucide-react'

const SearchInput = ({search, setSearch}) => {
    return (
        <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
                type="text"
                placeholder="Rechercher"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-400"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
            />
        </div>
    )
}

export default SearchInput
