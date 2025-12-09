import React, { useState, useMemo } from 'react';
import { Building2, User, FileText, MessageSquare, Phone, Mail, Calendar, Edit2, Check, X } from 'lucide-react';
import { Client, Person } from '../types';
import { Subscription, mockDomains } from '../types/subscription';
import { mockDomains as globalMockDomains } from '../data/mockSubscriptions';

interface Client360Props {
  client: Client;
  persons: Person[];
  subscriptions: Subscription[];
  onViewDetails: () => void;
  onViewSubscriptions: () => void;
  onViewContacts: () => void;
}

export default function Client360({
  client,
  persons,
  subscriptions,
  onViewDetails,
  onViewSubscriptions,
  onViewContacts
}: Client360Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(client);

  const clientSubscriptions = useMemo(() =>
    subscriptions.filter(s => s.clientId === client.id),
    [subscriptions, client.id]
  );

  const subsByDomain = useMemo(() => {
    const grouped: Record<string, Subscription[]> = {};
    globalMockDomains.forEach(d => {
      grouped[d.name] = [];
    });

    clientSubscriptions.forEach(sub => {
      if (grouped[sub.domainName]) {
        grouped[sub.domainName].push(sub);
      }
    });
    return grouped;
  }, [clientSubscriptions]);

  const calculateAge = (birthDate?: string) => {
    if (!birthDate) return '-';
    const year = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - year;
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(client);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-neutral-50">

      {/* HEADER: Client Info & Edit */}
      <div className="bg-white border-b border-neutral-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900">{client.name}</h1>
                  <span className="text-sm text-neutral-500">Client #{client.id}</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">

                <div className="space-y-1">
                  <span className="text-neutral-500 font-medium">Adresse complète</span>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        value={editForm.address.street}
                        onChange={e => setEditForm({ ...editForm, address: { ...editForm.address, street: e.target.value } })}
                        className="w-full px-2 py-1 border rounded"
                      />
                      <div className="flex gap-2">
                        <input
                          value={editForm.address.postalCode}
                          onChange={e => setEditForm({ ...editForm, address: { ...editForm.address, postalCode: e.target.value } })}
                          className="w-20 px-2 py-1 border rounded"
                        />
                        <input
                          value={editForm.address.city}
                          onChange={e => setEditForm({ ...editForm, address: { ...editForm.address, city: e.target.value } })}
                          className="flex-1 px-2 py-1 border rounded"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-neutral-900">
                      <div>{client.address.street}</div>
                      <div>{client.address.postalCode} {client.address.city}</div>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-500 font-medium">Agence</span>
                  {isEditing ? (
                    <input
                      value={editForm.agency}
                      onChange={e => setEditForm({ ...editForm, agency: e.target.value })}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    <div className="text-neutral-900">{client.agency}</div>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-500 font-medium">Conseiller</span>
                  {isEditing ? (
                    <input
                      value={editForm.advisor}
                      onChange={e => setEditForm({ ...editForm, advisor: e.target.value })}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    <div className="text-neutral-900">{client.advisor}</div>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-neutral-500 font-medium">Segment</span>
                  {isEditing ? (
                    <input
                      value={editForm.segment}
                      onChange={e => setEditForm({ ...editForm, segment: e.target.value })}
                      className="w-full px-2 py-1 border rounded"
                    />
                  ) : (
                    <div className="inline-block px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium">
                      {client.segment}
                    </div>
                  )}
                </div>

              </div>
            </div>

            <div className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-700 hover:bg-neutral-50"
                  >
                    <X className="w-4 h-4" /> Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <Check className="w-4 h-4" /> Valider
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
                >
                  <Edit2 className="w-4 h-4" /> Modifier le client
                </button>
              )}
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* BLOCK 1: ZONE CLIENT */}
        <section className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-200 flex justify-between items-center bg-neutral-50">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" /> Zone Client
            </h2>
            <button
              onClick={onViewDetails}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
            >
              Gérer les informations clients
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

            <div className="lg:col-span-2">
              <h3 className="text-sm font-medium text-neutral-500 mb-3 uppercase tracking-wider">Personnes clés ({persons.length})</h3>
              <div className="bg-neutral-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {persons.map(p => (
                  <div key={p.id} className="flex items-center justify-between bg-white p-3 rounded border border-neutral-200">
                    <div>
                      <div className="font-semibold text-neutral-900">{p.firstName} {p.lastName}</div>
                      <div className="text-xs text-neutral-500">{p.profession}</div>
                    </div>
                    <div className="text-sm font-medium text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
                      {calculateAge(p.birthDate)} ans
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-neutral-500 mb-3 uppercase tracking-wider">Indicateurs</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">Cotation</span>
                  <span className="font-bold text-neutral-900">{client.scores.quotation}/100</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${client.scores.quotation}%` }}></div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-neutral-50 p-3 rounded border border-neutral-200 text-center">
                    <div className="text-xs text-neutral-500 mb-1">Risque</div>
                    <div className={`font-bold ${client.scores.risk === 'Faible' ? 'text-green-600' :
                        client.scores.risk === 'Moyen' ? 'text-orange-600' : 'text-red-600'
                      }`}>{client.scores.risk}</div>
                  </div>
                  <div className="bg-neutral-50 p-3 rounded border border-neutral-200 text-center">
                    <div className="text-xs text-neutral-500 mb-1">Potentiel</div>
                    <div className="font-bold text-blue-600">{client.scores.potential}</div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                  <div className="text-sm text-neutral-600">Réciprocité</div>
                  <div className="font-medium text-neutral-900">{client.scores.reciprocity} ans</div>
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* BLOCK 2: ZONE CONTRATS */}
        <section className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" /> Zone Contrats
            </h2>
            <button
              onClick={onViewSubscriptions}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              Voir les contrats
            </button>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(subsByDomain).map(([domainName, domainSubs]) => (
                <div key={domainName} className="flex flex-col h-full border border-neutral-200 rounded-lg overflow-hidden">
                  <div className="bg-neutral-50 px-4 py-3 border-b border-neutral-200 font-semibold text-neutral-800 truncate">
                    {domainName}
                  </div>
                  <div className="p-4 flex-1 overflow-y-auto max-h-48 space-y-2">
                    {domainSubs.length === 0 ? (
                      <p className="text-sm text-neutral-400 italic">Aucun contrat</p>
                    ) : (
                      domainSubs.map(sub => (
                        <div key={sub.id} className="text-sm pb-2 border-b border-neutral-100 last:border-0">
                          <div className="font-medium text-neutral-900">{sub.contractName}</div>
                          <div className="text-xs text-neutral-500">{sub.id} • {new Date(sub.startDate).toLocaleDateString()}</div>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="bg-neutral-50 px-4 py-2 border-t border-neutral-200 text-xs flex justify-between items-center">
                    <span className="font-medium">{domainSubs.length} contrat{domainSubs.length > 1 ? 's' : ''}</span>
                    {domainSubs.length > 0 && (
                      <span className="text-neutral-500">Dernier: {new Date(Math.max(...domainSubs.map(s => new Date(s.startDate).getTime()))).toLocaleDateString()}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* BLOCK 3: RELATION BANQUE/CLIENT */}
        <section className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex justify-between items-center">
            <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-600" /> Relation Banque / Client
            </h2>
            <button
              onClick={onViewContacts}
              className="text-sm font-medium text-emerald-600 hover:text-emerald-800 hover:underline"
            >
              Voir les échanges
            </button>
          </div>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="text-blue-800 font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" /> Prochain contact
                  </h4>
                  {client.relationship.nextContactDate ? (
                    <div>
                      <div className="text-lg font-bold text-blue-900">
                        {new Date(client.relationship.nextContactDate).toLocaleDateString()}
                      </div>
                      <div className="text-blue-700">avec {client.relationship.nextContactPerson}</div>
                    </div>
                  ) : (
                    <span className="text-blue-400 italic">Aucun prévu</span>
                  )}
                </div>

                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200">
                  <h4 className="text-neutral-700 font-semibold mb-2">Dernier contact</h4>
                  {client.relationship.lastContactDate ? (
                    <div className="text-neutral-900 font-medium">
                      {new Date(client.relationship.lastContactDate).toLocaleDateString()}
                    </div>
                  ) : (
                    <span className="text-neutral-400 italic">Aucun</span>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-neutral-500 mb-2 uppercase tracking-wider">Canal privilégié</h4>
                <div className="flex gap-3">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded border ${client.relationship.preferredContactMethod === 'Email' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-neutral-200 text-neutral-600'}`}>
                    <Mail className="w-4 h-4" /> Email
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded border ${client.relationship.preferredContactMethod === 'Téléphone' ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-neutral-200 text-neutral-600'}`}>
                    <Phone className="w-4 h-4" /> Téléphone
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-neutral-500 mb-4 uppercase tracking-wider">Historique récent</h4>
              <div className="flow-root">
                <ul className="-mb-8">
                  {client.interactions.length === 0 ? (
                    <li className="text-neutral-500 italic text-sm">Aucune interaction récente</li>
                  ) : (
                    client.interactions.map((interaction, idx) => (
                      <li key={interaction.id}>
                        <div className="relative pb-8">
                          {idx !== client.interactions.length - 1 && (
                            <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-neutral-200" aria-hidden="true"></span>
                          )}
                          <div className="relative flex space-x-3">
                            <div className="h-8 w-8 rounded-full bg-neutral-100 flex items-center justify-center ring-8 ring-white">
                              <MessageSquare className="h-4 w-4 text-neutral-500" />
                            </div>
                            <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                              <div>
                                <p className="text-sm text-neutral-900 font-medium">{interaction.type}</p>
                                <p className="text-sm text-neutral-500">{interaction.notes}</p>
                              </div>
                              <div className="text-right text-sm whitespace-nowrap text-neutral-500">
                                <time dateTime={interaction.date}>{new Date(interaction.date).toLocaleDateString()}</time>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>

          </div>
        </section>


        {/* BLOCK 4: ZONE PRODUITS (Vide) */}
        <section className="bg-white rounded-xl border border-neutral-200 shadow-sm h-32 flex items-center justify-center">
          <span className="text-neutral-400 font-medium italic">Zone Produits (Vide)</span>
        </section>

      </div>
    </div>
  );
}
