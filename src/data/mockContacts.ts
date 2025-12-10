import { Contact, Agent, Product } from '../types/contact';

export const mockAgents: Agent[] = [
  {
    id: 'AGT-001',
    name: 'Sophie Durand',
    available: true,
    email: 'sophie.durand@company.fr'
  },
  {
    id: 'AGT-002',
    name: 'Jean Moreau',
    available: true,
    email: 'jean.moreau@company.fr'
  },
  {
    id: 'AGT-003',
    name: 'Claire Dubois',
    available: false,
    email: 'claire.dubois@company.fr'
  },
  {
    id: 'AGT-004',
    name: 'Marc Lambert',
    available: true,
    email: 'marc.lambert@company.fr'
  }
];

export const mockContacts: Contact[] = [
  {
    id: 'CNT-001',
    clientId: 'CLI-001',
    type: 'spontane',
    status: 'realise',
    modality: 'telephone',
    date: '2024-11-15T10:00:00',
    motif: 'Demande d\'information',
    description: 'Le client souhaite obtenir des informations sur les nouveaux produits disponibles.',
    personIds: ['P001'],
    agentId: 'AGT-001',
    agentName: 'Sophie Durand',
    createdDate: '2024-11-15T10:00:00',
    createdBy: 'Sophie Durand',
    lastModifiedDate: '2024-11-15T10:30:00',
    lastModifiedBy: 'Sophie Durand',
    closedDate: '2024-11-15T10:30:00'
  },
  {
    id: 'CNT-002',
    clientId: 'CLI-001',
    type: 'entretien',
    status: 'planifie',
    modality: 'sur_place',
    date: '2024-12-20T14:00:00',
    motif: 'Rendez-vous commercial',
    description: 'Présentation des nouvelles offres de contrats et produits.',
    personIds: ['P001', 'P002'],
    agentId: 'AGT-002',
    agentName: 'Jean Moreau',
    createdDate: '2024-12-01T09:00:00',
    createdBy: 'Jean Moreau',
    originContactId: 'CNT-003'
  },
  {
    id: 'CNT-003',
    clientId: 'CLI-001',
    type: 'commercial',
    status: 'cloture',
    modality: 'sur_place',
    date: '2024-10-10T11:00:00',
    motif: 'Proposition de nouveaux services',
    description: 'Présentation des services premium.',
    personIds: ['P001'],
    agentId: 'AGT-001',
    agentName: 'Sophie Durand',
    createdDate: '2024-10-10T11:00:00',
    createdBy: 'Sophie Durand',
    lastModifiedDate: '2024-10-10T12:30:00',
    lastModifiedBy: 'Sophie Durand',
    closedDate: '2024-10-10T12:30:00',
    comment: 'Client intéressé, à recontacter dans 3 mois.',
    proposals: [
      {
        id: 'PROP-001',
        type: 'contrat',
        itemId: 'CON-H-001',
        itemName: 'Contrat Habitation Premium',
        itemPrice: 89,
        annotation: 'Tarif préférentiel proposé',
        createdDate: '2024-10-10T11:30:00'
      }
    ]
  }
];

export const mockProducts: Product[] = [
  {
    id: 'PRD-001',
    name: 'Assurance Vie Premium',
    category: 'Assurance Vie',
    description: 'Contrat d\'assurance vie avec garanties étendues',
    price: 150,
    features: [
      'Garantie décès',
      'Garantie invalidité',
      'Capital garanti',
      'Gestion pilotée'
    ]
  },
  {
    id: 'PRD-002',
    name: 'Pack Protection Famille',
    category: 'Protection',
    description: 'Protection complète pour toute la famille',
    price: 85,
    features: [
      'Couverture santé',
      'Protection juridique',
      'Assistance 24/7',
      'Garantie hospitalisation'
    ]
  },
  {
    id: 'PRD-003',
    name: 'Plan Épargne Retraite',
    category: 'Épargne',
    description: 'Solution d\'épargne pour préparer votre retraite',
    price: 200,
    features: [
      'Déduction fiscale',
      'Versements libres',
      'Sortie en capital ou rente',
      'Gestion professionnelle'
    ]
  },
  {
    id: 'PRD-004',
    name: 'Assurance Auto Excellence',
    category: 'Automobile',
    description: 'Couverture optimale pour votre véhicule',
    price: 95,
    features: [
      'Tous risques',
      'Véhicule de remplacement',
      'Protection du conducteur',
      'Assistance panne 0 km'
    ]
  }
];
