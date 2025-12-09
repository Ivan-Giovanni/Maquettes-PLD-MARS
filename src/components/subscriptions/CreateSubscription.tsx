import React, { useState, useMemo } from 'react';
import { ArrowLeft, Check, X } from 'lucide-react';
import { Client } from '../../types';
import { Domain, Contract, ContractOption, PaymentPeriodicity, Subscription } from '../../types/subscription';
import SubscriptionConfiguration from './SubscriptionConfiguration';

interface CreateSubscriptionProps {
  client: Client;
  domain: Domain;
  contracts: Contract[];
  onBack: () => void;
  onCreate: (subscription: Subscription) => void;
}

export default function CreateSubscription({
  client,
  domain,
  contracts,
  onBack,
  onCreate
}: CreateSubscriptionProps) {
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);

  const selectedContract = useMemo(
    () => contracts.find(c => c.id === selectedContractId),
    [selectedContractId, contracts]
  );

  const handleConfigSave = (values: { periodicity: PaymentPeriodicity; selectedOptions: string[]; price: number }) => {
    if (!selectedContract) return;

    const newSubscription: Subscription = {
      id: `SUB${Date.now()}`,
      clientId: client.id,
      contractId: selectedContract.id,
      contractName: selectedContract.name,
      domainId: domain.id,
      domainName: domain.name,
      periodicity: values.periodicity,
      selectedOptions: values.selectedOptions,
      price: values.price,
      startDate: new Date().toISOString(),
      status: 'active',
      createdDate: new Date().toISOString(),
      createdBy: 'Agent en cours'
    };

    onCreate(newSubscription);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </button>
            <div>
              <p className="text-neutral-500">Nouvelle souscription</p>
              <h1 className="text-neutral-900">{domain.name}</h1>
              <p className="text-neutral-600 mt-1">Client : {client.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {/* Step 1: Select Contract */}
          <div className="bg-white rounded-lg border border-neutral-200">
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-neutral-900">1. Choisir le contrat</h2>
            </div>
            <div className="p-6 space-y-3">
              {contracts.map(contract => (
                <div
                  key={contract.id}
                  onClick={() => setSelectedContractId(contract.id)}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedContractId === contract.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-neutral-900 mb-1">{contract.name}</h3>
                      <p className="text-neutral-600 mb-3">{contract.description}</p>
                      <div className="flex items-center gap-4 text-neutral-700">
                        <span>{contract.baseMonthlyPrice} € / mois</span>
                        <span className="text-neutral-400">ou</span>
                        <span>{contract.baseAnnualPrice} € / an</span>
                      </div>
                    </div>
                    {selectedContractId === contract.id && (
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2 & 3: Configuration */}
          {selectedContract && (
            <SubscriptionConfiguration
              contract={selectedContract}
              mode="create"
              onCancel={onBack}
              onSave={handleConfigSave}
            />
          )}
        </div>
      </div>
    </div>
  );
}
