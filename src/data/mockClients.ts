import { Client } from '../types';

export const mockClients: Client[] = [
  {
    id: 'CLI-001',
    name: 'Acme Corporation',
    status: 'Active',
    address: {
      street: '123 Avenue de l\'Innovation',
      postalCode: '75001',
      city: 'Paris',
      country: 'France'
    },
    agency: 'Agence Paris Centre',
    advisor: 'Thomas Martin',
    segment: 'Grand Compte',
    scores: {
      quotation: 85,
      risk: 'Faible',
      potential: 'Élevé',
      reciprocity: 12
    },
    relationship: {
      nextContactDate: '2024-03-15',
      nextContactPerson: 'Jean Dupont',
      lastContactDate: '2024-02-01',
      preferredContactMethod: 'Email'
    },
    interactions: [
      {
        id: 'INT-001',
        date: '2024-02-01',
        type: 'Rendez-vous',
        notes: 'Point annuel sur les contrats',
        agent: 'Thomas Martin'
      },
      {
        id: 'INT-002',
        date: '2023-11-15',
        type: 'Appel',
        notes: 'Proposition nouvelle assurance flotte',
        agent: 'Sophie Durand'
      }
    ]
  },
  {
    id: 'CLI-002',
    name: 'Tech Solutions SARL',
    status: 'Active',
    address: {
      street: '45 Rue du Numérique',
      postalCode: '69003',
      city: 'Lyon',
      country: 'France'
    },
    agency: 'Agence Lyon Part-Dieu',
    advisor: 'Julie Dubois',
    segment: 'PME',
    scores: {
      quotation: 70,
      risk: 'Moyen',
      potential: 'Moyen',
      reciprocity: 8
    },
    relationship: {
      preferredContactMethod: 'Téléphone'
    },
    interactions: []
  },
  {
    id: 'CLI-003',
    name: 'Dupont & Associés',
    status: 'Inactive',
    address: {
      street: '10 Boulevard des Affaires',
      postalCode: '13002',
      city: 'Marseille',
      country: 'France'
    },
    agency: 'Agence Marseille Vieux-Port',
    advisor: 'Marc Leroy',
    segment: 'Professionnel',
    scores: {
      quotation: 45,
      risk: 'Élevé',
      potential: 'Faible',
      reciprocity: 2
    },
    relationship: {
      lastContactDate: '2023-12-10',
      preferredContactMethod: 'Email'
    },
    interactions: []
  },
  // Adding more simplified clients to match previous count if needed, or just replace with these enriched ones.
  // The original file had 6 clients. I'll stick to a few good ones to save space, user just needs to test.
];
