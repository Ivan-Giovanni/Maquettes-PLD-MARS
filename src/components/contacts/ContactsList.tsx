import React from 'react';
import { ArrowLeft, Plus, Eye, Phone, Mail, MapPin, Calendar, User } from 'lucide-react';
import { Client } from '../../types';
import { Contact } from '../../types/contact';

interface ContactsListProps {
  client: Client;
  contacts: Contact[];
  onBack: () => void;
  onCreate: () => void;
  onViewContact: (contact: Contact) => void;
}

export default function ContactsList({
  client,
  contacts,
  onBack,
  onCreate,
  onViewContact
}: ContactsListProps) {
  const getContactTypeLabel = (type: string) => {
    switch (type) {
      case 'spontane':
        return 'Spontané';
      case 'commercial':
        return 'Commercial';
      case 'entretien':
        return 'Entretien';
      default:
        return type;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planifie':
        return 'Planifié';
      case 'realise':
        return 'Réalisé';
      case 'annule':
        return 'Annulé';
      case 'cloture':
        return 'Clôturé';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planifie':
        return 'bg-blue-100 text-blue-700';
      case 'realise':
        return 'bg-green-100 text-green-700';
      case 'annule':
        return 'bg-red-100 text-red-700';
      case 'cloture':
        return 'bg-neutral-100 text-neutral-700';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  const getModalityIcon = (modality: string) => {
    switch (modality) {
      case 'telephone':
        return <Phone className="w-4 h-4" />;
      case 'mail':
        return <Mail className="w-4 h-4" />;
      case 'sur_place':
        return <MapPin className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getModalityLabel = (modality: string) => {
    switch (modality) {
      case 'telephone':
        return 'Téléphone';
      case 'mail':
        return 'Mail';
      case 'sur_place':
        return 'Sur place';
      default:
        return modality;
    }
  };

  const sortedContacts = [...contacts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
              <p className="text-neutral-500">Contacts</p>
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-neutral-900">Historique des contacts</h2>
          <button
            onClick={onCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Créer un contact
          </button>
        </div>

        {/* Contacts List */}
        {sortedContacts.length === 0 ? (
          <div className="bg-white rounded-lg border border-neutral-200 p-12 text-center">
            <p className="text-neutral-500">Aucun contact pour ce client.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedContacts.map(contact => (
              <div
                key={contact.id}
                className="bg-white rounded-lg border border-neutral-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-neutral-900">{contact.motif}</h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                          contact.status
                        )}`}
                      >
                        {getStatusLabel(contact.status)}
                      </span>
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-900 border border-neutral-200 rounded-full text-sm font-medium uppercase tracking-wide">
                        {getContactTypeLabel(contact.type)}
                      </span>
                    </div>
                    <p className="text-neutral-600 mb-3">{contact.description}</p>
                    <div className="flex items-center gap-6 text-neutral-600">
                      <div className="flex items-center gap-2">
                        {getModalityIcon(contact.modality)}
                        <span>{getModalityLabel(contact.modality)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(contact.date).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{contact.agentName}</span>
                      </div>
                      {contact.personIds.length > 0 && (
                        <span>
                          {contact.personIds.length} personne(s) impliquée(s)
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onViewContact(contact)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Consulter"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 text-neutral-500">
          {contacts.length} contact{contacts.length > 1 ? 's' : ''} affiché
          {contacts.length > 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}