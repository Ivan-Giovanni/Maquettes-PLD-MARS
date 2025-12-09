import React, { useState } from 'react';
import { ArrowLeft, Plus, Eye, FileText } from 'lucide-react';
import { Client } from '../../types';
import { Domain, Subscription } from '../../types/subscription';

interface DomainSubscriptionsProps {
  client: Client;
  domains: Domain[];
  subscriptions: Subscription[];
  onBack: () => void;
  onCreateSubscription: (domainId: string) => void;
  onViewSubscription: (subscription: Subscription) => void;
}

export default function DomainSubscriptions({
  client,
  domains,
  subscriptions,
  onBack,
  onCreateSubscription,
  onViewSubscription
}: DomainSubscriptionsProps) {
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
              <p className="text-neutral-500">Souscriptions du client</p>
              <h1 className="text-neutral-900">{client.name}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
              {client.status}
            </span>
            <span className="text-neutral-500">ID: {client.id}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-8">
          {domains.map(domain => {
            const domainSubscriptions = subscriptions.filter(
              sub => sub.domainId === domain.id
            );

            return (
              <div key={domain.id} className="bg-white rounded-lg border border-neutral-200">
                {/* Domain Header */}
                <div className="p-6 border-b border-neutral-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-neutral-900">{domain.name}</h2>
                      {domain.description && (
                        <p className="text-neutral-600 mt-1">{domain.description}</p>
                      )}
                    </div>
                    <button
                      onClick={() => onCreateSubscription(domain.id)}
                      className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Nouvelle souscription
                    </button>
                  </div>
                </div>

                {/* Subscriptions List */}
                <div className="p-6">
                  {domainSubscriptions.length === 0 ? (
                    <div className="text-center py-8 text-neutral-500">
                      <FileText className="w-12 h-12 mx-auto mb-3 text-neutral-300" />
                      <p>Aucune souscription pour ce domaine</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {domainSubscriptions.map(subscription => (
                        <div
                          key={subscription.id}
                          className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-neutral-900">
                                {subscription.contractName}
                              </h3>
                              <span
                                className={`px-2 py-1 rounded-full text-xs ${
                                  subscription.status === 'active'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {subscription.status === 'active' ? 'Actif' : 'Résilié'}
                              </span>
                              {subscription.endDate && subscription.status === 'active' && (
                                <span className="px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-700">
                                  Valable jusqu{"'"}à{' '}
                                  {new Date(subscription.endDate).toLocaleDateString('fr-FR')}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-6 text-neutral-600">
                              <span>
                                {subscription.price} €{' '}
                                {subscription.periodicity === 'monthly' ? '/ mois' : '/ an'}
                              </span>
                              <span>
                                Depuis le{' '}
                                {new Date(subscription.startDate).toLocaleDateString('fr-FR')}
                              </span>
                              <span>{subscription.selectedOptions.length} option(s)</span>
                            </div>
                          </div>
                          <button
                            onClick={() => onViewSubscription(subscription)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Consulter"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}