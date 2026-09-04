export type DocumentStatus =
  | "missing"
  | "uploaded"
  | "verified"
  | "rejected";

export interface ProjectDocument {
  id: string;
  name: string;
  type: string;
  fileName: string;
  status: DocumentStatus;
  uploadedAt: string;
  verifiedAt?: string;
  expiryDate?: string;
  size?: number;
}

export interface RequiredDocument {
  id: string;
  name: string;
  description: string;
  requiredFor: string[];
}