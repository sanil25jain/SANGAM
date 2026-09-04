export type SchemeStatus = "open" | "upcoming" | "closed";

export interface GovernmentScheme {
  id: string;
  name: string;
  department: string;
  description: string;

  status: SchemeStatus;

  sectors: string[];

  states: string[];

  minInvestment?: number;
  maxInvestment?: number;

  benefits: string[];

  applicationUrl?: string;
}