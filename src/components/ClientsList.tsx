import React, { useState } from 'react';
import { Search, Eye, Building2, Filter, FileText, MessageSquare } from 'lucide-react';
import { Client } from '../types';

interface ClientsListProps {
  clients: Client[];
  onSelectClient: (client: Client) => void;
  onViewSubscriptions: (client: Client) => void;
  onViewContacts: (client: Client) => void;
}

export default function ClientsList({ clients, onSelectClient, onViewSubscriptions, onViewContacts }: ClientsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'Active' | 'Inactive'>('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || client.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const activeCount = clients.filter(c => c.status === 'Active').length;
  const inactiveCount = clients.filter(c => c.status === 'Inactive').length;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="w-8 h-8 text-blue-600" />
            <h1 className="text-neutral-900">Gestion des Clients</h1>
          </div>
          <p className="text-neutral-500">
            Consultez et gérez vos clients, leurs personnes associées et leurs souscriptions
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <p className="text-neutral-500 mb-1">Total clients</p>
            <p className="text-neutral-900">{clients.length}</p>
          </div>
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <p className="text-neutral-500 mb-1">Clients actifs</p>
            <p className="text-green-600">{activeCount}</p>
          </div>
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <p className="text-neutral-500 mb-1">Clients inactifs</p>
            <p className="text-neutral-600">{inactiveCount}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Rechercher par nom ou ID..."
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <select
                value={filterStatus}
                onChange={e => setFilterStatus(e.target.value as 'all' | 'Active' | 'Inactive')}
                className="w-full pl-10 pr-4 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="Active">Actif</option>
                <option value="Inactive">Inactif</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clients List */}
        <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden">
          {filteredClients.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-neutral-500">Aucun client trouvé</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-neutral-900">ID Client</th>
                    <th className="px-6 py-4 text-left text-neutral-900">Nom</th>
                    <th className="px-6 py-4 text-left text-neutral-900">Statut</th>
                    <th className="px-6 py-4 text-left text-neutral-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredClients.map(client => (
                    <tr
                      key={client.id}
                      className="hover:bg-neutral-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-neutral-600">{client.id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-neutral-400" />
                          <span className="text-neutral-900">{client.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full ${
                            client.status === 'Active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          {client.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onSelectClient(client)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            Détails
                          </button>
                          <button
                            onClick={() => onViewSubscriptions(client)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            Souscriptions
                          </button>
                          <button
                            onClick={() => onViewContacts(client)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <MessageSquare className="w-4 h-4" />
                            Contacts
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-4 text-neutral-500">
          {filteredClients.length} client{filteredClients.length > 1 ? 's' : ''} affiché
          {filteredClients.length > 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}