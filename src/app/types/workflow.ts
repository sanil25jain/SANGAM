import type { Approval, ApprovalStatus } from "./approval";

export type WorkflowNodeStatus =
  | "available"
  | "blocked"
  | "in_progress"
  | "completed";

export interface WorkflowNode {
  id: string;
  approval: Approval;
  status: WorkflowNodeStatus;
  blockedBy: string[];
  unlocks: string[];
}

export interface WorkflowEdge {
  from: string;
  to: string;
}

export interface WorkflowGraph {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  readyApprovals: string[];
  blockedApprovals: string[];
  completedApprovals: string[];
  criticalPath: string[];
  estimatedCompletionDays: number;
}

export interface WorkflowAnalysis {
  ready: Approval[];
  blocked: Approval[];
  inProgress: Approval[];
  completed: Approval[];
  criticalPath: Approval[];
  bottlenecks: Approval[];
}