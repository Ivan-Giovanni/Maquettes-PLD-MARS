import React, { useState, useMemo } from 'react';
import { ArrowLeft, Edit2, XCircle, Check, Calendar } from 'lucide-react';
import { Client } from '../../types';
import { Subscription, Contract, PaymentPeriodicity } from '../../types/subscription';
import ConfirmationModal from '../ConfirmationModal';
import SubscriptionConfiguration from './SubscriptionConfiguration';

interface SubscriptionDetailsProps {
  subscription: Subscription;
  client: Client;
  contract: Contract;
  onBack: () => void;
  onUpdate: (updatedSubscription: Subscription) => void;
  onTerminate: (subscriptionId: string, endDate: string) => void;
}

export default function SubscriptionDetails({
  subscription,
  client,
  contract,
  onBack,
  onUpdate,
  onTerminate
}: SubscriptionDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showTerminateModal, setShowTerminateModal] = useState(false);
  const [endDate, setEndDate] = useState('');

  const handleSaveChanges = (values: { periodicity: PaymentPeriodicity; selectedOptions: string[]; price: number }) => {
    const updatedSubscription: Subscription = {
      ...subscription,
      periodicity: values.periodicity,
      selectedOptions: values.selectedOptions,
      price: values.price,
      lastModifiedDate: new Date().toISOString(),
      lastModifiedBy: 'Agent en cours'
    };
    onUpdate(updatedSubscription);
    setIsEditing(false);
  };

  const handleConfirmTerminate = () => {
    if (!endDate) return;
    onTerminate(subscription.id, endDate);
    setShowTerminateModal(false);
  };

  const hasScheduledTermination = subscription.endDate && subscription.status === 'active';

  const selectedOptionsDetails = contract.availableOptions.filter(opt =>
    subscription.selectedOptions.includes(opt.id)
  );

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
                <p className="text-neutral-500">Détails de la souscription</p>
                <h1 className="text-neutral-900">{subscription.contractName}</h1>
                <p className="text-neutral-600 mt-1">
                  {subscription.domainName} - {client.name}
                </p>
              </div>
            </div>
            {subscription.status === 'active' && !isEditing && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Modifier
                </button>
                <button
                  onClick={() => setShowTerminateModal(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Résilier
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* General Information (Always Visible) */}
          <div className="bg-white rounded-lg border border-neutral-200">
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-neutral-900">Informations générales</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-500 mb-1">Contrat</label>
                  <p className="text-neutral-900">{contract.name}</p>
                  <p className="text-neutral-600 mt-1">{contract.description}</p>
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Statut</label>
                  <div className="flex flex-col gap-2">
                    <span
                      className={`inline-block px-3 py-1 rounded-full w-fit ${subscription.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                        }`}
                    >
                      {subscription.status === 'active' ? 'Actif' : 'Résilié'}
                    </span>
                    {hasScheduledTermination && (
                      <p className="text-orange-600">
                        {subscription.endDate && (
                          <> - Valable jusqu{"'"}à {new Date(subscription.endDate).toLocaleDateString('fr-FR')}</>
                        )}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-500 mb-1">Date de début</label>
                  <p className="text-neutral-900">
                    {new Date(subscription.startDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
                {subscription.endDate && (
                  <div>
                    <label className="block text-neutral-500 mb-1">Date de fin</label>
                    <p className="text-neutral-900">
                      {new Date(subscription.endDate).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">Identifiant</label>
                <p className="text-neutral-600">{subscription.id}</p>
              </div>
            </div>
          </div>

          {isEditing ? (
            <SubscriptionConfiguration
              contract={contract}
              initialValues={{
                periodicity: subscription.periodicity,
                selectedOptions: subscription.selectedOptions
              }}
              mode="edit"
              onCancel={() => setIsEditing(false)}
              onSave={handleSaveChanges}
            />
          ) : (
            <>
              {/* View: Cost & Periodicity */}
              <div className="bg-white rounded-lg border border-neutral-200">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-neutral-900">Coût et fréquence</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-neutral-500 mb-1">Périodicité</label>
                      <p className="text-neutral-900">
                        {subscription.periodicity === 'monthly' ? 'Mensuel' : 'Annuel'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-neutral-500 mb-1">Prix</label>
                      <p className="text-neutral-900">
                        {subscription.price} €{' '}
                        {subscription.periodicity === 'monthly' ? '/ mois' : '/ an'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* View: Options */}
              <div className="bg-white rounded-lg border border-neutral-200">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-neutral-900">Options souscrites</h2>
                </div>
                <div className="p-6">
                  {selectedOptionsDetails.length === 0 ? (
                    <p className="text-neutral-500 text-center py-4">
                      Aucune option souscrite
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {selectedOptionsDetails.map(option => {
                        const price =
                          subscription.periodicity === 'monthly'
                            ? option.monthlyPrice
                            : option.annualPrice;

                        return (
                          <div
                            key={option.id}
                            className="p-4 border border-neutral-200 rounded-lg"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                  <h3 className="text-neutral-900">{option.name}</h3>
                                  <span className="text-blue-600">
                                    +{price} €{' '}
                                    {subscription.periodicity === 'monthly' ? '/ mois' : '/ an'}
                                  </span>
                                </div>
                                <p className="text-neutral-600">{option.description}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* View: History */}
              <div className="bg-white rounded-lg border border-neutral-200">
                <div className="p-6 border-b border-neutral-200">
                  <h2 className="text-neutral-900">Historique</h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-neutral-500 mb-1">Créé le</label>
                      <p className="text-neutral-900">
                        {new Date(subscription.createdDate).toLocaleDateString('fr-FR')} à{' '}
                        {new Date(subscription.createdDate).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <div>
                      <label className="block text-neutral-500 mb-1">Créé par</label>
                      <p className="text-neutral-900">{subscription.createdBy}</p>
                    </div>
                  </div>

                  {subscription.lastModifiedDate && (
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-neutral-500 mb-1">
                          Dernière modification
                        </label>
                        <p className="text-neutral-900">
                          {new Date(subscription.lastModifiedDate).toLocaleDateString('fr-FR')} à{' '}
                          {new Date(subscription.lastModifiedDate).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      {subscription.lastModifiedBy && (
                        <div>
                          <label className="block text-neutral-500 mb-1">Modifié par</label>
                          <p className="text-neutral-900">{subscription.lastModifiedBy}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {subscription.terminatedDate && (
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-neutral-500 mb-1">Résilié le</label>
                        <p className="text-neutral-900">
                          {new Date(subscription.terminatedDate).toLocaleDateString('fr-FR')} à{' '}
                          {new Date(subscription.terminatedDate).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      {subscription.terminatedBy && (
                        <div>
                          <label className="block text-neutral-500 mb-1">Résilié par</label>
                          <p className="text-neutral-900">{subscription.terminatedBy}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Terminate Modal */}
      {showTerminateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>

              <h2 className="text-neutral-900 mb-2">Résilier la souscription</h2>
              <p className="text-neutral-600 mb-6">
                Veuillez renseigner la date de fin de souscription. Cette action ne peut pas être
                annulée.
              </p>

              <div className="mb-6">
                <label className="block text-neutral-700 mb-2">Date de fin</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowTerminateModal(false)}
                  className="flex-1 px-4 py-2.5 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleConfirmTerminate}
                  disabled={!endDate}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirmer la résiliation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}