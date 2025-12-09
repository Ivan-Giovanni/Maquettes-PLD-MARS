import React, { useState, useMemo } from 'react';
import { X, Search, Eye } from 'lucide-react';
import { Person } from '../types';
import PersonForm from './PersonForm';

interface AddPersonModalProps {
  allPersons: Person[];
  associatedPersonIds: string[];
  onClose: () => void;
  onCreatePerson: (person: Person) => void;
  onViewPerson: (person: Person) => void;
}

export default function AddPersonModal({
  allPersons,
  associatedPersonIds,
  onClose,
  onCreatePerson,
  onViewPerson
}: AddPersonModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Filter out persons already associated with the client
  const availablePersons = useMemo(() => {
    return allPersons.filter(p => !associatedPersonIds.includes(p.id));
  }, [allPersons, associatedPersonIds]);

  const filteredPersons = useMemo(() => {
    if (!searchQuery) return [];
    
    const query = searchQuery.toLowerCase();
    return availablePersons.filter(person =>
      person.firstName.toLowerCase().includes(query) ||
      person.lastName.toLowerCase().includes(query) ||
      (person.profession && person.profession.toLowerCase().includes(query)) ||
      (person.civility && person.civility.toLowerCase().includes(query)) ||
      (person.familyStatus && person.familyStatus.toLowerCase().includes(query)) ||
      (person.address?.city && person.address.city.toLowerCase().includes(query))
    );
  }, [searchQuery, availablePersons]);

  const handleCreatePerson = (newPerson: Person) => {
    onCreatePerson(newPerson);
  };

  const handleViewPerson = (person: Person) => {
    onViewPerson(person);
  };

  const showNoResults = searchQuery.length > 0 && filteredPersons.length === 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-200">
          <h2 className="text-neutral-900">Ajouter une personne</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Search Input */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Rechercher par nom, prénom, profession, ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>

          {/* Search Results */}
          {!searchQuery ? (
            <div className="text-center py-12 text-neutral-500">
              Commencez à taper pour rechercher une personne
            </div>
          ) : filteredPersons.length > 0 ? (
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-neutral-600">Civilité</th>
                    <th className="px-6 py-4 text-left text-neutral-600">Nom</th>
                    <th className="px-6 py-4 text-left text-neutral-600">Prénom</th>
                    <th className="px-6 py-4 text-left text-neutral-600">Date de naissance</th>
                    <th className="px-6 py-4 text-left text-neutral-600">Profession</th>
                    <th className="px-6 py-4 text-left text-neutral-600">Ville</th>
                    <th className="px-6 py-4 text-right text-neutral-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredPersons.map((person) => (
                    <tr key={person.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4 text-neutral-600">{person.civility || '-'}</td>
                      <td className="px-6 py-4 text-neutral-900">{person.lastName}</td>
                      <td className="px-6 py-4 text-neutral-900">{person.firstName}</td>
                      <td className="px-6 py-4 text-neutral-600">
                        {person.birthDate ? new Date(person.birthDate).toLocaleDateString('fr-FR') : '-'}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {person.profession || '-'}
                      </td>
                      <td className="px-6 py-4 text-neutral-600">
                        {person.address?.city || '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleViewPerson(person)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Consulter"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          {/* No Results - Show button to create */}
          {showNoResults && !showCreateForm && (
            <div className="text-center py-12">
              <p className="text-neutral-500 mb-4">
                Aucune personne trouvée pour "{searchQuery}"
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Créer une nouvelle personne
              </button>
            </div>
          )}

          {/* Create Person Form - Only shown when user clicks create button */}
          {showNoResults && showCreateForm && (
            <div>
              <div className="text-center py-6 mb-6">
                <p className="text-neutral-600">
                  Créer une nouvelle personne
                </p>
              </div>
              <div className="border-t border-neutral-200 pt-6">
                <PersonForm
                  onSubmit={handleCreatePerson}
                  onCancel={() => setShowCreateForm(false)}
                  submitLabel="Créer la personne"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}