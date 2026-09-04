import type { ProjectDocument } from "../../app/types/document";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateDocument(
  document: ProjectDocument
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!document.fileName) {
    errors.push("File name is missing.");
  }

  if (document.status === "rejected") {
    errors.push("This document has been rejected.");
  }

  if (document.expiryDate) {
    const expiry = new Date(document.expiryDate);
    const today = new Date();

    if (expiry < today) {
      errors.push("Document has expired.");
    }
  }

  if (document.status === "uploaded") {
    warnings.push(
      "Document has been uploaded but is not yet verified."
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}