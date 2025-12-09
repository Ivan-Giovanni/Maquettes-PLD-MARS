export interface Address {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface FinancialSituation {
  income?: string;
  expenses?: string;
  taxation?: string;
}

export interface Residence {
  housingType?: string;
  occupancyStatus?: string;
}

export interface Person {
  id: string;
  firstName: string;
  lastName: string;
  civility?: string;
  birthDate?: string;
  familyStatus?: string;
  profession?: string;
  address?: Address;
  financialSituation?: FinancialSituation;
  residence?: Residence;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  email?: string;
  phone?: string;
  role?: string;
}

export interface Client {
  id: string;
  name: string;
  status: string;
}