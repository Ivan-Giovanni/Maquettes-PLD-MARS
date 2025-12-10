export type ContactType = 'spontane' | 'commercial' | 'entretien';
export type ContactModality = 'sur_place' | 'telephone' | 'mail';
export type ContactStatus = 'planifie' | 'realise' | 'annule' | 'cloture';
export type ProposalType = 'produit' | 'contrat';

export interface Proposal {
  id: string;
  type: ProposalType;
  itemId: string;
  itemName: string;
  itemPrice?: number;
  annotation?: string;
  createdDate: string;
}

export interface Contact {
  id: string;
  clientId: string;
  type: ContactType;
  status: ContactStatus;
  modality: ContactModality;
  date: string;
  motif: string;
  description: string;
  personIds: string[];
  agentId: string;
  agentName: string;
  createdDate: string;
  createdBy: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  closedDate?: string;
  comment?: string;
  proposals?: Proposal[];
  originContactId?: string;
  originContactMotif?: string;
}

export interface Agent {
  id: string;
  name: string;
  available: boolean;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  features: string[];
  image?: string;
}
