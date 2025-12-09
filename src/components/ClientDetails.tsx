import React, { useState } from 'react';
import { ArrowLeft, Plus, Eye } from 'lucide-react';
import { Person, Client } from '../types';
import PersonCard from './PersonCard';
import AddPersonModal from './AddPersonModal';

interface ClientDetailsProps {
  client: Client;
  persons: Person[];
  allPersons: Person[];
  onBack?: () => void;
  onViewPerson: (person: Person, fromAddModal?: boolean) => void;
  onCreatePerson: (person: Person) => void;
  onAddPerson: (person: Person) => void;
  onRemovePerson: (personId: string) => void;
}

export default function ClientDetails({
  client,
  persons,
  allPersons,
  onBack,
  onViewPerson,
  onCreatePerson,
  onAddPerson,
  onRemovePerson
}: ClientDetailsProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleViewPersonFromModal = (person: Person) => {
    setShowAddModal(false);
    onViewPerson(person, true);
  };

  const handleCreatePersonFromModal = (newPerson: Person) => {
    // Add to global list and view the person with attach button
    setShowAddModal(false);
    onCreatePerson(newPerson);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </button>
            <div>
              <p className="text-neutral-500">Client</p>
              <h1 className="text-neutral-900">{client.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
              {client.status}
            </span>
            <span className="text-neutral-500">ID: {client.id}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-neutral-900">Personnes associées</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Ajouter une personne
            </button>
          </div>

          {/* Persons List */}
          {persons.length === 0 ? (
            <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
              <p className="text-neutral-500">
                Aucune personne associée à ce client.
              </p>
            </div>
          ) : (
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
                  {persons.map((person) => (
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
                            onClick={() => onViewPerson(person)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Voir les détails"
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
          )}

          <div className="mt-4 text-neutral-500">
            {persons.length} personne{persons.length > 1 ? 's' : ''} affichée{persons.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Add Person Modal */}
      {showAddModal && (
        <AddPersonModal
          allPersons={allPersons}
          associatedPersonIds={persons.map(p => p.id)}
          onClose={() => setShowAddModal(false)}
          onViewPerson={handleViewPersonFromModal}
          onCreatePerson={handleCreatePersonFromModal}
        />
      )}
    </div>
  );
}