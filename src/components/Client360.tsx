import React from 'react';
import { Building2, Eye, FileText, MessageSquare } from 'lucide-react';
import { Client } from '../types';

interface Client360Props {
    client: Client;
    onViewDetails: () => void;
    onViewSubscriptions: () => void;
    onViewContacts: () => void;
}

export default function Client360({
    client,
    onViewDetails,
    onViewSubscriptions,
    onViewContacts
}: Client360Props) {
    return (
        <div className="min-h-screen bg-neutral-50">
            {/* Header */}
            <div className="bg-white border-b border-neutral-200">
                <div className="max-w-4xl mx-auto px-6 py-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Building2 className="w-8 h-8 text-blue-600" />
                        <h1 className="text-2xl font-bold text-neutral-900">Vue Client 360</h1>
                    </div>
                    <p className="text-neutral-500">
                        Vue d'ensemble du client {client.name}
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-8">

                {/* Client Info Card */}
                <div className="bg-white rounded-lg border border-neutral-200 p-6 mb-8 shadow-sm">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-neutral-900 mb-2">{client.name}</h2>
                            <div className="flex items-center gap-2 text-neutral-600 mb-1">
                                <span className="font-medium">ID:</span> {client.id}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${client.status === 'Active'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-neutral-100 text-neutral-700'
                                    }`}>
                                    {client.status}
                                </span>
                            </div>
                        </div>
                        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                            <Building2 className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Action Buttons Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <button
                        onClick={onViewDetails}
                        className="flex flex-col items-center justify-center p-8 bg-white border border-neutral-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group"
                    >
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                            <Eye className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">Détails Client</h3>
                        <p className="text-center text-neutral-500 text-sm">
                            Voir les personnes et informations administratives
                        </p>
                    </button>

                    <button
                        onClick={onViewSubscriptions}
                        className="flex flex-col items-center justify-center p-8 bg-white border border-neutral-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group"
                    >
                        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
                            <FileText className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">Souscriptions</h3>
                        <p className="text-center text-neutral-500 text-sm">
                            Gérer les contrats et abonnements
                        </p>
                    </button>

                    <button
                        onClick={onViewContacts}
                        className="flex flex-col items-center justify-center p-8 bg-white border border-neutral-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group"
                    >
                        <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
                            <MessageSquare className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">Contacts</h3>
                        <p className="text-center text-neutral-500 text-sm">
                            Historique des échanges et interactions
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}
