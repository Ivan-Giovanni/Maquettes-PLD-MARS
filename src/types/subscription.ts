export interface Domain {
  id: string;
  name: string;
  description?: string;
}

export interface ContractOption {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
}

export interface Contract {
  id: string;
  domainId: string;
  name: string;
  description: string;
  baseMonthlyPrice: number;
  baseAnnualPrice: number;
  availableOptions: ContractOption[];
}

export type PaymentPeriodicity = 'monthly' | 'annual';

export interface Subscription {
  id: string;
  clientId: string;
  contractId: string;
  contractName: string;
  domainId: string;
  domainName: string;
  periodicity: PaymentPeriodicity;
  selectedOptions: string[]; // IDs of selected options
  price: number; // Total price based on periodicity
  startDate: string;
  endDate?: string;
  status: 'active' | 'terminated';
  createdDate: string;
  createdBy: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  terminatedDate?: string;
  terminatedBy?: string;
}
