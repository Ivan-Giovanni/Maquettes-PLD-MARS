import React, { useState, useMemo } from 'react';
import { ArrowLeft, Calendar, User, Users } from 'lucide-react';
import { Client, Person } from '../../types';
import { Contact, ContactType, ContactModality, Agent } from '../../types/contact';

interface CreateContactProps {
  client: Client;
  persons: Person[];
  agents: Agent[];
  initialType?: ContactType;
  forceType?: boolean;
  originContact?: Contact;
  onBack: () => void;
  onCreate: (contact: Contact) => void;
}

export default function CreateContact({
  client,
  persons,
  agents,
  initialType = 'spontane',
  forceType = false,
  originContact,
  onBack,
  onCreate
}: CreateContactProps) {
  const [type, setType] = useState<ContactType>(initialType);
  const [modality, setModality] = useState<ContactModality>('telephone');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [motif, setMotif] = useState('');
  const [description, setDescription] = useState('');
  const [selectedPersonIds, setSelectedPersonIds] = useState<string[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState('');

  const availableAgents = useMemo(() => {
    return agents.filter(agent => agent.available);
  }, [agents]);

  const handlePersonToggle = (personId: string) => {
    setSelectedPersonIds(prev =>
      prev.includes(personId)
        ? prev.filter(id => id !== personId)
        : [...prev, personId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time || !motif || !description || selectedPersonIds.length === 0 || !selectedAgentId) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const selectedAgent = agents.find(a => a.id === selectedAgentId);
    if (!selectedAgent) return;

    const newContact: Contact = {
      id: `CNT-${Date.now()}`,
      clientId: client.id,
      type,
      status: type === 'entretien' ? 'planifie' : 'realise',
      modality,
      date: `${date}T${time}:00`,
      motif,
      description,
      personIds: selectedPersonIds,
      agentId: selectedAgentId,
      agentName: selectedAgent.name,
      originContactId: originContact?.id,
      originContactMotif: originContact?.motif,
      createdDate: new Date().toISOString(),
      createdBy: selectedAgent.name
    };

    onCreate(newContact);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </button>
            <div>
              <p className="text-neutral-500">Créer un contact</p>
              <h1 className="text-neutral-900">{client.name}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-neutral-200 p-8">

          {/* Origin Contact Display */}
          {originContact && (
            <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-3">
              <ArrowLeft className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-800 font-medium">Suite à l'échange :</p>
                <p className="text-blue-900 font-semibold">{originContact.motif} <span className="text-blue-600 font-normal">- {new Date(originContact.date).toLocaleDateString()}</span></p>
              </div>
            </div>
          )}

          {/* Type de contact */}
          <div className="mb-8">
            <h2 className="text-neutral-900 mb-4">Type de contact</h2>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => !forceType && setType('spontane')}
                disabled={forceType}
                className={`p-4 border-2 rounded-lg transition-all ${type === 'spontane'
                  ? 'border-blue-600 bg-blue-50'
                  : forceType
                    ? 'border-neutral-100 bg-neutral-50 opacity-50 cursor-not-allowed'
                    : 'border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                <div className="text-center">
                  <p className="text-neutral-900">Spontané</p>
                  <p className="text-neutral-500 text-sm">Contact à l{"'"}initiative du client</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => !forceType && setType('commercial')}
                disabled={forceType}
                className={`p-4 border-2 rounded-lg transition-all ${type === 'commercial'
                  ? 'border-blue-600 bg-blue-50'
                  : forceType
                    ? 'border-neutral-100 bg-neutral-50 opacity-50 cursor-not-allowed'
                    : 'border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                <div className="text-center">
                  <p className="text-neutral-900">Commercial</p>
                  <p className="text-neutral-500 text-sm">Démarche commerciale</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => { }}
                disabled={true}
                className={`p-4 border-2 rounded-lg transition-all ${type === 'entretien'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-neutral-100 bg-neutral-50 opacity-50 cursor-not-allowed text-neutral-400'
                  }`}
              >
                <div className="text-center">
                  <p className={type === 'entretien' ? 'text-neutral-900' : 'text-neutral-400'}>Entretien</p>
                  <p className="text-neutral-400 text-sm">Via "Planifier" uniquement</p>
                </div>
              </button>
            </div>
          </div>

          {/* Modalité */}
          <div className="mb-8">
            <label className="block text-neutral-900 mb-4">Modalité</label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => setModality('sur_place')}
                className={`p-4 border-2 rounded-lg transition-all ${modality === 'sur_place'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                <p className="text-neutral-900 text-center">Sur place</p>
              </button>
              <button
                type="button"
                onClick={() => setModality('telephone')}
                className={`p-4 border-2 rounded-lg transition-all ${modality === 'telephone'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                <p className="text-neutral-900 text-center">Téléphone</p>
              </button>
              <button
                type="button"
                onClick={() => setModality('mail')}
                className={`p-4 border-2 rounded-lg transition-all ${modality === 'mail'
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-neutral-200 hover:border-neutral-300'
                  }`}
              >
                <p className="text-neutral-900 text-center">Mail</p>
              </button>
            </div>
          </div>

          {/* Date et heure */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-neutral-900 mb-2">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-neutral-900 mb-2">
                Heure <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Sélection des personnes */}
          <div className="mb-8">
            <label className="block text-neutral-900 mb-4">
              Personnes concernées <span className="text-red-500">*</span>
            </label>
            <div className="border border-neutral-200 rounded-lg p-4 max-h-60 overflow-y-auto">
              {persons.length === 0 ? (
                <p className="text-neutral-500 text-center py-4">
                  Aucune personne associée au client
                </p>
              ) : (
                <div className="space-y-2">
                  {persons.map(person => (
                    <label
                      key={person.id}
                      className="flex items-center gap-3 p-3 hover:bg-neutral-50 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedPersonIds.includes(person.id)}
                        onChange={() => handlePersonToggle(person.id)}
                        className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-neutral-400" />
                        <span className="text-neutral-900">
                          {person.civility} {person.firstName} {person.lastName}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
            {selectedPersonIds.length > 0 && (
              <p className="text-neutral-500 mt-2">
                {selectedPersonIds.length} personne(s) sélectionnée(s)
              </p>
            )}
          </div>

          {/* Sélection de l'agent */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-neutral-900">
                Agent <span className="text-red-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  if (agents.length > 0) {
                    setSelectedAgentId(agents[0].id);
                  }
                }}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Me l'assigner
              </button>
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <select
                value={selectedAgentId}
                onChange={e => setSelectedAgentId(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Sélectionner un agent</option>
                {availableAgents.map(agent => (
                  <option key={agent.id} value={agent.id}>
                    {agent.name} - {agent.email}
                  </option>
                ))}
              </select>
            </div>
            {availableAgents.length === 0 && (
              <p className="text-red-500 mt-2">Aucun agent disponible</p>
            )}
          </div>

          {/* Motif */}
          <div className="mb-8">
            <label className="block text-neutral-900 mb-2">
              Motif <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={motif}
              onChange={e => setMotif(e.target.value)}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: Demande d'information, Présentation produits..."
              required
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="block text-neutral-900 mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Décrivez l'objet du contact..."
              required
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Enregistrer le contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
