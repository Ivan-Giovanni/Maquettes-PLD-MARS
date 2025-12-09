import React, { useState } from 'react';
import ClientsList from './components/ClientsList';
import ClientDetails from './components/ClientDetails';
import PersonDetails from './components/PersonDetails';
import DomainSubscriptions from './components/subscriptions/DomainSubscriptions';
import CreateSubscription from './components/subscriptions/CreateSubscription';
import SubscriptionDetails from './components/subscriptions/SubscriptionDetails';
import ContactsList from './components/contacts/ContactsList';
import CreateContact from './components/contacts/CreateContact';
import { Person, Client } from './types';
import { Subscription } from './types/subscription';
import { Contact } from './types/contact';
import { mockDomains, mockContracts, mockSubscriptions } from './data/mockSubscriptions';
import { mockAgents, mockContacts } from './data/mockContacts';
import { mockClients } from './data/mockClients';

// Données mockées
const mockClient: Client = {
  id: 'CLI-001',
  name: 'Acme Corporation',
  status: 'Active'
};

const mockPersons: Person[] = [
  {
    id: 'P001',
    firstName: 'Jean',
    lastName: 'Dupont',
    civility: 'M.',
    birthDate: '1985-03-15',
    familyStatus: 'Marié(e)',
    profession: 'Directeur Général',
    address: {
      street: '15 rue de la République',
      postalCode: '75001',
      city: 'Paris',
      country: 'France'
    },
    financialSituation: {
      income: '85 000 €',
      expenses: '45 000 €',
      taxation: '18 000 €'
    },
    residence: {
      housingType: 'Maison',
      occupancyStatus: 'Propriétaire'
    },
    lastModifiedDate: '2024-12-01T14:30:00',
    lastModifiedBy: 'Sophie Durand'
  },
  {
    id: 'P002',
    firstName: 'Marie',
    lastName: 'Martin',
    civility: 'Mme',
    birthDate: '1990-07-22',
    familyStatus: 'Célibataire',
    profession: 'Responsable Achats',
    address: {
      street: '42 avenue des Champs-Élysées',
      postalCode: '75008',
      city: 'Paris',
      country: 'France'
    },
    financialSituation: {
      income: '65 000 €',
      expenses: '38 000 €',
      taxation: '12 000 €'
    },
    residence: {
      housingType: 'Appartement',
      occupancyStatus: 'Locataire'
    },
    lastModifiedDate: '2024-11-28T10:15:00',
    lastModifiedBy: 'Jean Moreau'
  },
  {
    id: 'P003',
    firstName: 'Pierre',
    lastName: 'Bernard',
    civility: 'M.',
    birthDate: '1978-11-05',
    familyStatus: 'Divorcé(e)',
    profession: 'Chef de Projet',
    address: {
      street: '8 boulevard Saint-Michel',
      postalCode: '75005',
      city: 'Paris',
      country: 'France'
    },
    financialSituation: {
      income: '72 000 €',
      expenses: '42 000 €',
      taxation: '15 000 €'
    },
    residence: {
      housingType: 'Appartement',
      occupancyStatus: 'Propriétaire'
    },
    lastModifiedDate: '2024-12-05T16:45:00',
    lastModifiedBy: 'Claire Dubois'
  }
];

// Toutes les personnes disponibles (pour la recherche)
const initialAllPersons: Person[] = [
  ...mockPersons,
  {
    id: 'P004',
    firstName: 'Sophie',
    lastName: 'Leroy',
    civility: 'Mme',
    birthDate: '1992-04-18',
    familyStatus: 'Pacsé(e)',
    profession: 'Consultante',
    address: {
      street: '23 rue de Rivoli',
      postalCode: '75004',
      city: 'Paris',
      country: 'France'
    }
  },
  {
    id: 'P005',
    firstName: 'Thomas',
    lastName: 'Petit',
    civility: 'M.',
    birthDate: '1988-09-30',
    familyStatus: 'Célibataire',
    profession: 'Analyste',
    address: {
      street: '56 rue du Faubourg Saint-Honoré',
      postalCode: '75008',
      city: 'Paris',
      country: 'France'
    }
  }
];

type View = 'clients-list' | 'client-details' | 'person-details' | 'domain-subscriptions' | 'create-subscription' | 'subscription-details' | 'contacts-list' | 'create-contact';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('clients-list');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientPersons, setClientPersons] = useState<Person[]>(mockPersons);
  const [allPersons, setAllPersons] = useState<Person[]>(initialAllPersons);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [viewingFromAddModal, setViewingFromAddModal] = useState(false);

  // Subscription state
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(mockSubscriptions);
  const [selectedDomainId, setSelectedDomainId] = useState<string | null>(null);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);

  // Contacts state
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleViewPerson = (person: Person, fromAddModal: boolean = false) => {
    setSelectedPerson(person);
    setViewingFromAddModal(fromAddModal);
    setCurrentView('person-details');
  };

  const handleBackToClient = () => {
    setCurrentView('client-details');
    setSelectedPerson(null);
    setViewingFromAddModal(false);
  };

  const handleCreateAndViewPerson = (person: Person) => {
    // Add the new person to the global list
    setAllPersons(prev => [...prev, person]);
    // Then view the person with attach button
    handleViewPerson(person, true);
  };

  const handleAddPerson = (person: Person) => {
    setClientPersons(prev => [...prev, person]);
    setViewingFromAddModal(false);
  };

  const handleUpdatePerson = (updatedPerson: Person) => {
    setClientPersons(prev =>
      prev.map(p => (p.id === updatedPerson.id ? updatedPerson : p))
    );
    setSelectedPerson(updatedPerson);
  };

  const handleRemovePerson = (personId: string) => {
    setClientPersons(prev => prev.filter(p => p.id !== personId));
    handleBackToClient();
  };

  // Subscription handlers
  const handleViewSubscriptions = () => {
    setCurrentView('domain-subscriptions');
  };

  const handleBackToClientFromSubscriptions = () => {
    setCurrentView('clients-list');
    setSelectedDomainId(null);
    setSelectedSubscription(null);
  };

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
            endDate,
            lastModifiedDate: new Date().toISOString(),
            lastModifiedBy: 'Agent en cours'
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

  // Contacts handlers
  const handleViewContacts = () => {
    setCurrentView('contacts-list');
  };

  const handleBackToClientFromContacts = () => {
    setCurrentView('clients-list');
  };

  const handleCreateContact = () => {
    setCurrentView('create-contact');
  };

  const handleSaveContact = (newContact: Contact) => {
    setContacts(prev => [...prev, newContact]);
    setCurrentView('contacts-list');
  };

  const handleViewContact = (contact: Contact) => {
    setSelectedContact(contact);
    // TODO: Navigate to contact details view when implemented
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {currentView === 'clients-list' && (
        <ClientsList
          clients={mockClients}
          onSelectClient={client => {
            setSelectedClient(client);
            setCurrentView('client-details');
          }}
          onViewSubscriptions={client => {
            setSelectedClient(client);
            setCurrentView('domain-subscriptions');
          }}
          onViewContacts={client => {
            setSelectedClient(client);
            setCurrentView('contacts-list');
          }}
        />
      )}

      {currentView === 'client-details' && selectedClient && (
        <ClientDetails
          client={selectedClient}
          persons={clientPersons}
          allPersons={allPersons}
          onBack={() => setCurrentView('clients-list')}
          onViewPerson={handleViewPerson}
          onCreatePerson={handleCreateAndViewPerson}
          onAddPerson={handleAddPerson}
          onRemovePerson={handleRemovePerson}
        />
      )}

      {currentView === 'person-details' && selectedPerson && (
        <PersonDetails
          person={selectedPerson}
          client={selectedClient ?? undefined}
          isAssociated={clientPersons.some(p => p.id === selectedPerson.id)}
          showAttachButton={viewingFromAddModal}
          onBack={handleBackToClient}
          onUpdate={handleUpdatePerson}
          onRemove={handleRemovePerson}
          onAttach={handleAddPerson}
        />
      )}

      {currentView === 'domain-subscriptions' && selectedClient && (
        <DomainSubscriptions
          client={selectedClient}
          domains={mockDomains}
          subscriptions={subscriptions}
          onBack={handleBackToClientFromSubscriptions}
          onCreateSubscription={handleCreateSubscription}
          onViewSubscription={handleViewSubscription}
        />
      )}

      {currentView === 'create-subscription' && selectedDomain && selectedClient && (
        <CreateSubscription
          client={selectedClient}
          domain={selectedDomain}
          contracts={domainContracts}
          onBack={handleBackToDomains}
          onCreate={handleSaveSubscription}
        />
      )}

      {currentView === 'subscription-details' && selectedSubscription && selectedContract && selectedClient && (
        <SubscriptionDetails
          subscription={selectedSubscription}
          client={selectedClient}
          contract={selectedContract}
          onBack={handleBackToDomains}
          onUpdate={handleUpdateSubscription}
          onTerminate={handleTerminateSubscription}
        />
      )}

      {currentView === 'contacts-list' && selectedClient && (
        <ContactsList
          client={selectedClient}
          contacts={contacts}
          onBack={handleBackToClientFromContacts}
          onCreate={handleCreateContact}
          onViewContact={handleViewContact}
        />
      )}

      {currentView === 'create-contact' && selectedClient && (
        <CreateContact
          client={selectedClient}
          persons={clientPersons}
          agents={mockAgents}
          onBack={handleBackToClientFromContacts}
          onCreate={handleSaveContact}
        />
      )}
    </div>
  );
}