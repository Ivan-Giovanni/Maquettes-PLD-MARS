import React, { useState } from 'react';
import { ArrowLeft, Edit2, UserMinus, Save, X, Link } from 'lucide-react';
import { Person, Client } from '../types';
import ConfirmationModal from './ConfirmationModal';
import PersonForm from './PersonForm';

interface PersonDetailsProps {
  person: Person;
  client?: Client;
  isAssociated?: boolean;
  showAttachButton?: boolean;
  onBack: () => void;
  onUpdate: (person: Person) => void;
  onRemove: (personId: string) => void;
  onAttach?: (person: Person) => void;
}

export default function PersonDetails({
  person,
  client,
  isAssociated = false,
  showAttachButton = false,
  onBack,
  onUpdate,
  onRemove,
  onAttach
}: PersonDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showAttachModal, setShowAttachModal] = useState(false);

  const handleUpdate = (updatedPerson: Person) => {
    onUpdate(updatedPerson);
    setIsEditing(false);
  };

  const handleConfirmRemove = () => {
    onRemove(person.id);
    setShowRemoveModal(false);
  };

  const handleConfirmAttach = () => {
    if (onAttach) {
      onAttach(person);
      setShowAttachModal(false);
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-neutral-600" />
              </button>
              <div>
                <p className="text-neutral-500">Détails de la personne</p>
                <h1 className="text-neutral-900">
                  {person.firstName} {person.lastName}
                </h1>
                {client && isAssociated && (
                  <p className="text-neutral-600 mt-1">
                    Associé(e) au client : <span className="font-medium">{client.name}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!isEditing && (
                <>
                  {showAttachButton && !isAssociated && client && (
                    <button
                      onClick={() => setShowAttachModal(true)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Link className="w-4 h-4" />
                      Rattacher au client
                    </button>
                  )}
                  {isAssociated && (
                    <>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                        Mettre à jour
                      </button>
                      <button
                        onClick={() => setShowRemoveModal(true)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <UserMinus className="w-4 h-4" />
                        Retirer du client
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {isEditing ? (
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-neutral-900">Modifier les informations</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-neutral-600" />
              </button>
            </div>
            <PersonForm
              person={person}
              onSubmit={handleUpdate}
              onCancel={() => setIsEditing(false)}
              submitLabel="Enregistrer les modifications"
            />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Informations personnelles */}
            <div className="bg-white rounded-lg border border-neutral-200">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-neutral-900">Informations personnelles</h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="block text-neutral-500 mb-1">Civilité</label>
                    <p className="text-neutral-900">{person.civility || '-'}</p>
                  </div>
                  <div>
                    <label className="block text-neutral-500 mb-1">Prénom</label>
                    <p className="text-neutral-900">{person.firstName}</p>
                  </div>
                  <div>
                    <label className="block text-neutral-500 mb-1">Nom</label>
                    <p className="text-neutral-900">{person.lastName}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-neutral-500 mb-1">Date de naissance</label>
                    <p className="text-neutral-900">{person.birthDate ? new Date(person.birthDate).toLocaleDateString('fr-FR') : '-'}</p>
                  </div>
                  <div>
                    <label className="block text-neutral-500 mb-1">Situation familiale</label>
                    <p className="text-neutral-900">{person.familyStatus || '-'}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-500 mb-1">Nom de la profession</label>
                  <p className="text-neutral-900">{person.profession || '-'}</p>
                </div>

                <div>
                  <label className="block text-neutral-500 mb-1">Identifiant</label>
                  <p className="text-neutral-600">{person.id}</p>
                </div>

                {/* Dernière modification - Only show in view mode for existing persons */}
                {person.lastModifiedDate && (
                  <div className="pt-4 border-t border-neutral-200">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-neutral-500 mb-1">Dernière modification</label>
                        <p className="text-neutral-900">
                          {new Date(person.lastModifiedDate).toLocaleDateString('fr-FR')} à{' '}
                          {new Date(person.lastModifiedDate).toLocaleTimeString('fr-FR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                      {person.lastModifiedBy && (
                        <div>
                          <label className="block text-neutral-500 mb-1">Modifié par</label>
                          <p className="text-neutral-900">{person.lastModifiedBy}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Adresse */}
            <div className="bg-white rounded-lg border border-neutral-200">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-neutral-900">Adresse</h2>
              </div>
              <div className="p-6 space-y-6">
                {person.address ? (
                  <>
                    <div>
                      <label className="block text-neutral-500 mb-1">Numéro et rue</label>
                      <p className="text-neutral-900">{person.address.street || '-'}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-neutral-500 mb-1">Code postal</label>
                        <p className="text-neutral-900">{person.address.postalCode || '-'}</p>
                      </div>
                      <div>
                        <label className="block text-neutral-500 mb-1">Ville</label>
                        <p className="text-neutral-900">{person.address.city || '-'}</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-neutral-500 mb-1">Pays</label>
                      <p className="text-neutral-900">{person.address.country || '-'}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-neutral-500">Aucune adresse renseignée</p>
                )}
              </div>
            </div>

            {/* Situation financière */}
            <div className="bg-white rounded-lg border border-neutral-200">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-neutral-900">Situation financière</h2>
              </div>
              <div className="p-6 space-y-6">
                {person.financialSituation ? (
                  <>
                    <div>
                      <label className="block text-neutral-500 mb-1">Revenus</label>
                      <p className="text-neutral-900">{person.financialSituation.income || '-'}</p>
                    </div>

                    <div>
                      <label className="block text-neutral-500 mb-1">Dépenses</label>
                      <p className="text-neutral-900">{person.financialSituation.expenses || '-'}</p>
                    </div>

                    <div>
                      <label className="block text-neutral-500 mb-1">Impôt</label>
                      <p className="text-neutral-900">{person.financialSituation.taxation || '-'}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-neutral-500">Aucune information financière renseignée</p>
                )}
              </div>
            </div>

            {/* Logement */}
            <div className="bg-white rounded-lg border border-neutral-200">
              <div className="p-6 border-b border-neutral-200">
                <h2 className="text-neutral-900">Logement</h2>
              </div>
              <div className="p-6 space-y-6">
                {person.residence ? (
                  <>
                    <div>
                      <label className="block text-neutral-500 mb-1">Type de logement</label>
                      <p className="text-neutral-900">{person.residence.housingType || '-'}</p>
                    </div>

                    <div>
                      <label className="block text-neutral-500 mb-1">Statut d'occupation</label>
                      <p className="text-neutral-900">{person.residence.occupancyStatus || '-'}</p>
                    </div>
                  </>
                ) : (
                  <p className="text-neutral-500">Aucune information de logement renseignée</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Remove Confirmation Modal */}
      {showRemoveModal && (
        <ConfirmationModal
          title="Retirer la personne du client"
          message={`Êtes-vous sûr de vouloir retirer ${person.firstName} ${person.lastName} de ce client ? Cette action ne supprime pas la personne de la base de données.`}
          confirmLabel="Retirer du client"
          confirmVariant="danger"
          onConfirm={handleConfirmRemove}
          onCancel={() => setShowRemoveModal(false)}
        />
      )}

      {/* Attach Confirmation Modal */}
      {showAttachModal && (
        <ConfirmationModal
          title="Rattacher la personne au client"
          message={`Êtes-vous sûr de vouloir rattacher ${person.firstName} ${person.lastName} à ce client ?`}
          confirmLabel="Rattacher au client"
          confirmVariant="success"
          onConfirm={handleConfirmAttach}
          onCancel={() => setShowAttachModal(false)}
        />
      )}
    </div>
  );
}