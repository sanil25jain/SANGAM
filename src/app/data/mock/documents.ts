import type { ProjectDocument } from "../../types/document";

export const mockDocuments: ProjectDocument[] = [
  {
    id: "doc-001",
    name: "Company Incorporation Certificate",
    type: "incorporation_certificate",
    fileName: "company-incorporation.pdf",
    status: "verified",
    uploadedAt: "2026-08-20",
    verifiedAt: "2026-08-21",
    size: 245000,
  },

  {
    id: "doc-002",
    name: "Building Plan",
    type: "building_plan",
    fileName: "building-plan.pdf",
    status: "verified",
    uploadedAt: "2026-08-22",
    verifiedAt: "2026-08-23",
    size: 520000,
  },

  {
    id: "doc-003",
    name: "Land Ownership Document",
    type: "land_document",
    fileName: "land-document.pdf",
    status: "uploaded",
    uploadedAt: "2026-08-24",
    size: 310000,
  },

  {
    id: "doc-004",
    name: "Machinery Details",
    type: "machinery_details",
    fileName: "machinery-details.pdf",
    status: "uploaded",
    uploadedAt: "2026-08-25",
    size: 180000,
  },
];