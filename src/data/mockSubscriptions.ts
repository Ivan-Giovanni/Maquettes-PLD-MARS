import { Domain, Contract, Subscription } from '../types/subscription';

export const mockDomains: Domain[] = [
  {
    id: 'DOM001',
    name: 'Assurances',
    description: 'Protection complète pour vous et vos biens'
  },
  {
    id: 'DOM002',
    name: 'Téléphonie mobile',
    description: 'Forfaits mobiles et solutions connectées'
  },
  {
    id: 'DOM003',
    name: 'Santé',
    description: 'Complémentaire santé et prévoyance'
  },
  {
    id: 'DOM004',
    name: 'Surveillance',
    description: 'Solutions de télésurveillance et sécurité'
  }
];

export const mockContracts: Contract[] = [
  {
    id: 'CTR001',
    domainId: 'DOM001',
    name: 'Habitation Essentiel',
    description: 'Formule de base pour protéger votre habitation',
    baseMonthlyPrice: 25,
    baseAnnualPrice: 280,
    availableOptions: [
      {
        id: 'OPT001',
        name: 'Protection juridique',
        description: 'Assistance juridique en cas de litige',
        monthlyPrice: 5,
        annualPrice: 55
      },
      {
        id: 'OPT002',
        name: 'Bris de glace',
        description: 'Couverture des vitres et miroirs',
        monthlyPrice: 3,
        annualPrice: 32
      },
      {
        id: 'OPT003',
        name: 'Dommages électriques',
        description: 'Protection des appareils électriques',
        monthlyPrice: 4,
        annualPrice: 42
      }
    ]
  },
  {
    id: 'CTR002',
    domainId: 'DOM001',
    name: 'Habitation Confort',
    description: 'Formule complète avec garanties étendues',
    baseMonthlyPrice: 45,
    baseAnnualPrice: 500,
    availableOptions: [
      {
        id: 'OPT001',
        name: 'Protection juridique',
        description: 'Assistance juridique en cas de litige',
        monthlyPrice: 5,
        annualPrice: 55
      },
      {
        id: 'OPT004',
        name: 'Objets de valeur',
        description: 'Couverture renforcée pour objets précieux',
        monthlyPrice: 8,
        annualPrice: 85
      },
      {
        id: 'OPT005',
        name: 'Jardins et piscine',
        description: 'Protection des aménagements extérieurs',
        monthlyPrice: 6,
        annualPrice: 65
      }
    ]
  },
  {
    id: 'CTR003',
    domainId: 'DOM002',
    name: 'Forfait Essentiel',
    description: 'Appels et SMS illimités + 10Go',
    baseMonthlyPrice: 15,
    baseAnnualPrice: 165,
    availableOptions: [
      {
        id: 'OPT006',
        name: 'Assurance mobile',
        description: 'Remplacement en cas de casse ou vol',
        monthlyPrice: 4,
        annualPrice: 42
      },
      {
        id: 'OPT007',
        name: 'Multi-SIM',
        description: 'Une deuxième carte SIM pour tablette',
        monthlyPrice: 5,
        annualPrice: 55
      }
    ]
  },
  {
    id: 'CTR004',
    domainId: 'DOM002',
    name: 'Forfait Premium 5G',
    description: 'Data illimitée et appels internationaux',
    baseMonthlyPrice: 45,
    baseAnnualPrice: 495,
    availableOptions: [
      {
        id: 'OPT006',
        name: 'Assurance mobile',
        description: 'Remplacement en cas de casse ou vol',
        monthlyPrice: 0,
        annualPrice: 0
      },
      {
        id: 'OPT007',
        name: 'Multi-SIM',
        description: 'Une deuxième carte SIM pour tablette',
        monthlyPrice: 0,
        annualPrice: 0
      },
      {
        id: 'OPT008',
        name: 'Prêt de mobile',
        description: 'Mobile de prêt immédiat en cas de panne',
        monthlyPrice: 5,
        annualPrice: 55
      }
    ]
  },
  {
    id: 'CTR005',
    domainId: 'DOM003',
    name: 'Santé Équilibre',
    description: 'Complémentaire santé pour toute la famille',
    baseMonthlyPrice: 85,
    baseAnnualPrice: 950,
    availableOptions: [
      {
        id: 'OPT009',
        name: 'Dentaire renforcé',
        description: 'Remboursements dentaires améliorés',
        monthlyPrice: 15,
        annualPrice: 165
      },
      {
        id: 'OPT010',
        name: 'Optique premium',
        description: 'Couverture optique étendue',
        monthlyPrice: 10,
        annualPrice: 110
      },
      {
        id: 'OPT011',
        name: 'Médecines douces',
        description: 'Prise en charge ostéopathie, acupuncture...',
        monthlyPrice: 8,
        annualPrice: 85
      }
    ]
  }
];

export const mockSubscriptions: Subscription[] = [
  {
    id: 'SUB001',
    clientId: 'CLI-001',
    contractId: 'CTR002',
    contractName: 'Habitation Confort',
    domainId: 'DOM001',
    domainName: 'Assurances',
    periodicity: 'annual',
    selectedOptions: ['OPT001', 'OPT004'],
    price: 640, // 500 + 55 + 85
    startDate: '2024-01-15',
    status: 'active',
    createdDate: '2024-01-15T10:30:00',
    createdBy: 'Sophie Durand',
    lastModifiedDate: '2024-06-20T14:15:00',
    lastModifiedBy: 'Jean Moreau'
  },
  {
    id: 'SUB002',
    clientId: 'CLI-001',
    contractId: 'CTR004',
    contractName: 'Forfait Premium 5G',
    domainId: 'DOM002',
    domainName: 'Téléphonie mobile',
    periodicity: 'monthly',
    selectedOptions: ['OPT008'],
    price: 50, // 45 + 5
    startDate: '2024-03-01',
    status: 'active',
    createdDate: '2024-03-01T09:00:00',
    createdBy: 'Claire Dubois'
  }
];
