import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, X, Calendar, User, Phone, Mail, MapPin, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { Contact, ContactModality, ContactStatus } from '../../types/contact';
import { Person, Agent } from '../../types';

interface ContactDetailsProps {
  contact: Contact;
  persons: Person[];
  agents: Agent[];
  onBack: () => void;
  onUpdate: (updatedContact: Contact) => void;
  onPlanInterview: () => void;
  onRealizeInterview: () => void;
}

export default function ContactDetails({
  contact,
  persons,
  agents,
  onBack,
  onUpdate,
  onPlanInterview,
  onRealizeInterview
}: ContactDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContact, setEditedContact] = useState<Contact>(contact);

  // Sync state if contact prop changes
  useEffect(() => {
    setEditedContact(contact);
  }, [contact]);

  const handleSave = () => {
    onUpdate({
      ...editedContact,
      lastModifiedDate: new Date().toISOString()
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContact(contact);
    setIsEditing(false);
  };

  const handleCancelInterview = () => {
    if (window.confirm('Êtes-vous sûr de vouloir annuler cet entretien ?')) {
      onUpdate({
        ...contact,
        status: 'annule',
        lastModifiedDate: new Date().toISOString()
      });
    }
  };

  const handleRealizeInterview = () => {
    onRealizeInterview();
  };

  const getStatusColor = (status: ContactStatus) => {
    switch (status) {
      case 'planifie': return 'bg-blue-100 text-blue-700';
      case 'realise': return 'bg-green-100 text-green-700';
      case 'annule': return 'bg-red-100 text-red-700';
      case 'cloture': return 'bg-neutral-100 text-neutral-700';
      default: return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getStatusLabel = (status: ContactStatus) => {
    switch (status) {
      case 'planifie': return 'Planifié';
      case 'realise': return 'Réalisé';
      case 'annule': return 'Annulé';
      case 'cloture': return 'Clôturé';
      default: return status;
    }
  };

  const isEntretien = contact.type === 'entretien';

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4 mb-2">
            <button
              onClick={onBack}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </button>
            <h1 className="text-xl font-semibold text-neutral-900">
              Détail contact
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Informations */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Informations
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">Motif</label>
              <p className="text-neutral-900">{contact.motif}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-500 mb-1">Description</label>
              <p className="text-neutral-900 whitespace-pre-wrap">{contact.description}</p>
            </div>
          </div>
        </div>

        {/* Propositions faites (if realised) */}
        {contact.status === 'realise' && contact.proposals && contact.proposals.length > 0 && (
          <div className="bg-white rounded-xl border border-neutral-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              Propositions effectuées
            </h2>
            <div className="space-y-3">
              {contact.proposals.map((proposal) => (
                <div key={proposal.id} className="p-4 rounded-lg bg-neutral-50 border border-neutral-100 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-neutral-900">{proposal.itemName}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full capitalize ${proposal.type === 'contrat' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                        {proposal.type}
                      </span>
                    </div>
                    {proposal.annotation && (
                      <p className="text-sm text-neutral-600">{proposal.annotation}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          {/* Header Actions */}
          <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-neutral-50/50">
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contact.status)}`}>
                {getStatusLabel(contact.status)}
              </span>
              <span className="text-sm text-neutral-500 uppercase tracking-wide font-medium">
                {contact.type}
              </span>
            </div>

            <div className="flex gap-4"> {/* Increased gap from gap-3 to gap-4 */}
              {!isEditing && (
                <>
                  <button
                    onClick={onPlanInterview}
                    className="px-4 py-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Planifier un entretien
                  </button>

                  {isEntretien && (
                    <>
                      <button
                        onClick={handleCancelInterview}
                        disabled={contact.status === 'realise' || contact.status === 'annule'}
                        className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${contact.status === 'realise' || contact.status === 'annule'
                          ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                          : 'text-red-600 bg-red-50 hover:bg-red-100'
                          }`}
                      >
                        Annuler l'entretien
                      </button>
                      <button
                        onClick={handleRealizeInterview}
                        disabled={contact.status === 'realise' || contact.status === 'annule'}
                        className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium flex items-center gap-2 ${contact.status === 'realise' || contact.status === 'annule'
                          ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                          : 'text-white bg-green-600 hover:bg-green-700'
                          }`}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Réaliser l'entretien
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    Modifier le contact
                  </button>
                </>
              )}
              {isEditing && (
                <>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors text-sm font-medium"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Enregistrer
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* General Info */}
            <section className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-100 pb-2">Informations générales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Motif</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editedContact.motif}
                      onChange={(e) => setEditedContact({ ...editedContact, motif: e.target.value })}
                    />
                  ) : (
                    <p className="text-neutral-900">{contact.motif}</p>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
                  {isEditing ? (
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editedContact.description}
                      onChange={(e) => setEditedContact({ ...editedContact, description: e.target.value })}
                    />
                  ) : (
                    <p className="text-neutral-900 whitespace-pre-wrap">{contact.description}</p>
                  )}
                </div>
              </div>
            </section>

            {/* Specific Entretien Info - Only editable if Entretien type */}
            <section className="space-y-4">
              <h3 className="text-lg font-medium text-neutral-900 border-b border-neutral-100 pb-2">Détails de l'échange</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Date</label>
                  {isEditing && isEntretien ? (
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="datetime-local"
                        className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={editedContact.date}
                        onChange={(e) => setEditedContact({ ...editedContact, date: e.target.value })}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-neutral-900">
                      <Calendar className="w-4 h-4 text-neutral-500" />
                      {new Date(contact.date).toLocaleString('fr-FR')}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Modalité</label>
                  {isEditing && isEntretien ? (
                    <select
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editedContact.modality}
                      onChange={(e) => setEditedContact({ ...editedContact, modality: e.target.value as ContactModality })}
                    >
                      <option value="telephone">Téléphone</option>
                      <option value="mail">Mail</option>
                      <option value="sur_place">Sur place</option>
                    </select>
                  ) : (
                    <div className="flex items-center gap-2 text-neutral-900">
                      {contact.modality === 'telephone' && <Phone className="w-4 h-4 text-neutral-500" />}
                      {contact.modality === 'mail' && <Mail className="w-4 h-4 text-neutral-500" />}
                      {contact.modality === 'sur_place' && <MapPin className="w-4 h-4 text-neutral-500" />}
                      <span className="capitalize">{contact.modality.replace('_', ' ')}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Agent</label>
                  {isEditing && isEntretien ? (
                    <select
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={editedContact.agentId}
                      onChange={(e) => {
                        const agent = agents.find(a => a.id === e.target.value);
                        if (agent) {
                          setEditedContact({
                            ...editedContact,
                            agentId: agent.id,
                            agentName: agent.name
                          });
                        }
                      }}
                    >
                      {agents.map(agent => (
                        <option key={agent.id} value={agent.id}>{agent.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center gap-2 text-neutral-900">
                      <User className="w-4 h-4 text-neutral-500" />
                      {contact.agentName}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Personnes impliquées</label>
                  {isEditing && isEntretien ? (
                    <div className="flex flex-wrap gap-2">
                      {persons.map(person => {
                        const isSelected = editedContact.personIds.includes(person.id);
                        return (
                          <button
                            key={person.id}
                            onClick={() => {
                              const newIds = isSelected
                                ? editedContact.personIds.filter(id => id !== person.id)
                                : [...editedContact.personIds, person.id];
                              setEditedContact({ ...editedContact, personIds: newIds });
                            }}
                            className={`px-3 py-1 rounded-full text-sm border transition-colors ${isSelected
                              ? 'bg-blue-100 border-blue-200 text-blue-700'
                              : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                              }`}
                          >
                            {person.firstName} {person.lastName}
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {contact.personIds.map(id => {
                        const person = persons.find(p => p.id === id);
                        return person ? (
                          <span key={id} className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-sm">
                            {person.firstName} {person.lastName}
                          </span>
                        ) : null;
                      })}
                      {contact.personIds.length === 0 && <span className="text-neutral-400 italic">Aucune personne impliquée</span>}
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
