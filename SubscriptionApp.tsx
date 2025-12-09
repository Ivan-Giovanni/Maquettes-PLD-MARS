import React, { useState } from 'react';
import ClientDetails from './components/ClientDetails';
import DomainSubscriptions from './components/subscriptions/DomainSubscriptions';
import CreateSubscription from './components/subscriptions/CreateSubscription';
import SubscriptionDetails from './components/subscriptions/SubscriptionDetails';
import { Client } from './types';
import { Domain, Subscription, Contract } from './types/subscription';
import { mockDomains, mockContracts, mockSubscriptions } from './data/mockSubscriptions';

const mockClient: Client = {
  id: 'CLI-001',
  name: 'Acme Corporation',
  status: 'Active'
};

type View = 'client-details' | 'domain-subscriptions' | 'create-subscription' | 'subscription-details';

export default function SubscriptionApp() {
  const [currentView, setCurrentView] = useState<View>('domain-subscriptions');
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  const handleCreateSubscription = (domainId: string) => {
    setSelectedDomainId(domainId);
    setCurrentView('create-subscription');
  };

  const handleViewSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setCurrentView('subscription-details');
  };

  const handleBackToDomains = () => {
    setCurrentView('domain-subscriptions');
    setSelectedDomainId(null);
    setSelectedSubscription(null);
  };

  const handleSaveSubscription = (newSubscription: Subscription) => {
    setSubscriptions(prev => [...prev, newSubscription]);
    setCurrentView('domain-subscriptions');
    setSelectedDomainId(null);
  };

  const handleUpdateSubscription = (updatedSubscription: Subscription) => {
    setSubscriptions(prev =>
      prev.map(sub => (sub.id === updatedSubscription.id ? updatedSubscription : sub))
    );
    setSelectedSubscription(updatedSubscription);
  };

  const handleTerminateSubscription = (subscriptionId: string, endDate: string) => {
    setSubscriptions(prev =>
      prev.map(sub =>
        sub.id === subscriptionId
          ? {
              ...sub,
              status: 'terminated' as const,
              endDate,
              terminatedDate: new Date().toISOString(),
              terminatedBy: 'Agent en cours'
            }
          : sub
      )
    );
    setCurrentView('domain-subscriptions');
    setSelectedSubscription(null);
  };

  const selectedDomain = selectedDomainId
    ? mockDomains.find(d => d.id === selectedDomainId)
    : null;

  const domainContracts = selectedDomainId
    ? mockContracts.filter(c => c.domainId === selectedDomainId)
    : [];

  const selectedContract = selectedSubscription
    ? mockContracts.find(c => c.id === selectedSubscription.contractId)
    : null;

  return (
    <div className="min-h-screen bg-neutral-50">
      {currentView === 'domain-subscriptions' && (
        <DomainSubscriptions
          client={mockClient}
          domains={mockDomains}
          subscriptions={subscriptions}
          onBack={handleBackToDomains}
          onCreateSubscription={handleCreateSubscription}
          onViewSubscription={handleViewSubscription}
        />
      )}

      {currentView === 'create-subscription' && selectedDomain && (
        <CreateSubscription
          client={mockClient}
          domain={selectedDomain}
          contracts={domainContracts}
          onBack={handleBackToDomains}
          onCreate={handleSaveSubscription}
        />
      )}

      {currentView === 'subscription-details' && selectedSubscription && selectedContract && (
        <SubscriptionDetails
          subscription={selectedSubscription}
          client={mockClient}
          contract={selectedContract}
          onBack={handleBackToDomains}
          onUpdate={handleUpdateSubscription}
          onTerminate={handleTerminateSubscription}
        />
      )}
    </div>
  );
}
