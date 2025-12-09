import React, { useState } from 'react';
import { Search, Building2, User } from 'lucide-react';
import { Client, Person } from '../types';

interface ClientSearchProps {
    clients: Client[];
    persons: Person[]; // All persons, to find matches
    onSelectClient: (client: Client) => void;
}

type SearchType = 'id' | 'name' | 'person';

export default function ClientSearch({ clients, persons, onSelectClient }: ClientSearchProps) {
    const [searchType, setSearchType] = useState<SearchType>('id');
    const [searchValue, setSearchValue] = useState('');

    // City filter state
    const [isCityFilterEnabled, setIsCityFilterEnabled] = useState(false);
    const [cityValue, setCityValue] = useState('');

    const [searchResults, setSearchResults] = useState<Client[]>([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

    const handleSearch = () => {
        const query = searchValue.toLowerCase().trim();
        const cityQuery = cityValue.toLowerCase().trim();

        const results = clients.filter(client => {
            // 1. Primary Filter based on Search Type
            let matchesPrimary = false;

            if (!query) {
                matchesPrimary = true; // If empty, match all (or should we require input? Match all is finer for "browsing")
            } else {
                switch (searchType) {
                    case 'id':
                        matchesPrimary = client.id.toLowerCase().includes(query);
                        break;
                    case 'name':
                        matchesPrimary = client.name.toLowerCase().includes(query);
                        break;
                    case 'person':
                        // Placeholder logic for Person Search
                        matchesPrimary = client.name.toLowerCase().includes(query);
                        break;
                }
            }

            // 2. City Filter (Optional)
            let matchesCity = true;
            if (isCityFilterEnabled && cityQuery) {
                matchesCity = client.address.city.toLowerCase().includes(cityQuery);
            }

            return matchesPrimary && matchesCity;
        });

        setSearchResults(results);
        setHasSearched(true);
        setSelectedClientId(null);
    };

    const getClientPersons = (clientId: string) => {
        if (clientId === 'CLI-001') return 'Jean Dupont, Marie Martin';
        return '-';
    };

    const getPlaceholder = () => {
        switch (searchType) {
            case 'id': return 'Ex: CLI-001';
            case 'name': return 'Ex: Acme Corp';
            case 'person': return 'Ex: Dupont';
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Search Form */}
                <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
                    <h1 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                        <Search className="w-6 h-6 text-blue-600" />
                        Recherche Client
                    </h1>

                    <div className="space-y-6">

                        {/* Radio Buttons for Search Type */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="searchType"
                                    value="id"
                                    checked={searchType === 'id'}
                                    onChange={() => setSearchType('id')}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                                />
                                <span className="text-neutral-700 font-medium">Numéro Client</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="searchType"
                                    value="name"
                                    checked={searchType === 'name'}
                                    onChange={() => setSearchType('name')}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                                />
                                <span className="text-neutral-700 font-medium">Dénomination</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="searchType"
                                    value="person"
                                    checked={searchType === 'person'}
                                    onChange={() => setSearchType('person')}
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-neutral-300"
                                />
                                <span className="text-neutral-700 font-medium">Nom Personne</span>
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                            {/* Main Search Input */}
                            <div className="w-full">
                                <label className="block text-sm font-medium text-neutral-700 mb-1">
                                    {searchType === 'id' ? 'Numéro Client' :
                                        searchType === 'name' ? 'Dénomination' : 'Nom de la personne'}
                                </label>
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={e => setSearchValue(e.target.value)}
                                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder={getPlaceholder()}
                                />
                            </div>

                            {/* Optional City Filter */}
                            <div className="w-full bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                                <div className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id="cityFilter"
                                        checked={isCityFilterEnabled}
                                        onChange={e => setIsCityFilterEnabled(e.target.checked)}
                                        className="w-4 h-4 text-blue-600 rounded border-neutral-300 focus:ring-blue-500"
                                    />
                                    <label htmlFor="cityFilter" className="ml-2 text-sm font-medium text-neutral-700 cursor-pointer">
                                        Filtrer par ville
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    value={cityValue}
                                    onChange={e => setCityValue(e.target.value)}
                                    disabled={!isCityFilterEnabled}
                                    className={`w-full px-3 py-2 border rounded-md text-sm outline-none transition-all ${isCityFilterEnabled
                                            ? 'bg-white border-neutral-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
                                            : 'bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed'
                                        }`}
                                    placeholder="Ex: Paris"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                onClick={handleSearch}
                                className="px-8 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium shadow-sm hover:shadow-md"
                            >
                                <Search className="w-4 h-4" />
                                Rechercher
                            </button>
                        </div>
                    </div>
                </div>

                {/* Results */}
                {hasSearched && (
                    <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex justify-between items-center">
                            <h2 className="font-semibold text-neutral-900">Résultats de recherche ({searchResults.length})</h2>
                            <button
                                disabled={!selectedClientId}
                                onClick={() => {
                                    const client = searchResults.find(c => c.id === selectedClientId);
                                    if (client) onSelectClient(client);
                                }}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                            >
                                Consulter le dossier client
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white border-b border-neutral-200">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider w-16">Sélection</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Dénomination</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Adresse</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Personnes</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-200">
                                    {searchResults.map(client => (
                                        <tr
                                            key={client.id}
                                            className={`hover:bg-blue-50 transition-colors cursor-pointer ${selectedClientId === client.id ? 'bg-blue-50' : ''}`}
                                            onClick={() => setSelectedClientId(client.id)}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <input
                                                    type="radio"
                                                    name="clientSelect"
                                                    checked={selectedClientId === client.id}
                                                    onChange={() => setSelectedClientId(client.id)}
                                                    className="h-4 w-4 text-blue-600 border-neutral-300 focus:ring-blue-500 cursor-pointer"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <Building2 className="flex-shrink-0 h-5 w-5 text-neutral-400 mr-3" />
                                                    <div>
                                                        <div className="text-sm font-medium text-neutral-900">{client.name}</div>
                                                        <div className="text-xs text-neutral-500">{client.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-neutral-900">{client.address.street}</div>
                                                <div className="text-sm text-neutral-500">{client.address.postalCode} {client.address.city}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center text-sm text-neutral-600">
                                                    <User className="flex-shrink-0 h-4 w-4 text-neutral-400 mr-2" />
                                                    {getClientPersons(client.id)}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {searchResults.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">
                                                <Search className="w-12 h-12 text-neutral-200 mx-auto mb-3" />
                                                <p>Aucun résultat trouvé pour ces critères.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
