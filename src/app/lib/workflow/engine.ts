import type { Approval } from "../../types/approval";
import type {
  WorkflowGraph,
  WorkflowNode,
  WorkflowNodeStatus,
  WorkflowEdge,
  WorkflowAnalysis,
} from "../../types/workflow";

function getNodeStatus(
  approval: Approval,
  approvalMap: Map<string, Approval>
): WorkflowNodeStatus {
  if (approval.status === "approved") {
    return "completed";
  }

  if (
    approval.status === "submitted" ||
    approval.status === "under_review" ||
    approval.status === "inspection"
  ) {
    return "in_progress";
  }

  const blocked = approval.dependencies.some(
    (dependency) => {
      const dependencyApproval =
        approvalMap.get(dependency);

      return (
        !dependencyApproval ||
        dependencyApproval.status !== "approved"
      );
    }
  );

  if (blocked) {
    return "blocked";
  }

  return "available";
}

export function buildWorkflowGraph(
  approvals: Approval[]
): WorkflowGraph {
  const approvalMap = new Map(
    approvals.map((approval) => [
      approval.id,
      approval,
    ])
  );

  const nodes: WorkflowNode[] = approvals.map(
    (approval) => ({
      id: approval.id,

      approval,

      status: getNodeStatus(
        approval,
        approvalMap
      ),

      blockedBy: approval.dependencies.filter(
        (dependency) => {
          const dependencyApproval =
            approvalMap.get(dependency);

          return (
            !dependencyApproval ||
            dependencyApproval.status !==
              "approved"
          );
        }
      ),

      unlocks: [],
    })
  );

  const edges: WorkflowEdge[] = [];

  for (const approval of approvals) {
    for (const dependency of approval.dependencies) {
      if (approvalMap.has(dependency)) {
        edges.push({
          from: dependency,
          to: approval.id,
        });

        const dependencyNode = nodes.find(
          (node) => node.id === dependency
        );

        dependencyNode?.unlocks.push(
          approval.id
        );
      }
    }
  }

  const readyApprovals = nodes
    .filter((node) => node.status === "available")
    .map((node) => node.id);

  const blockedApprovals = nodes
    .filter((node) => node.status === "blocked")
    .map((node) => node.id);

  const completedApprovals = nodes
    .filter((node) => node.status === "completed")
    .map((node) => node.id);

  const criticalPath = calculateCriticalPath(
    approvals,
    approvalMap
  );

  return {
    nodes,
    edges,
    readyApprovals,
    blockedApprovals,
    completedApprovals,
    criticalPath,

    estimatedCompletionDays:
      calculateCompletionTime(
        approvals,
        approvalMap
      ),
  };
}

function calculateCriticalPath(
  approvals: Approval[],
  approvalMap: Map<string, Approval>
): string[] {
  const memo = new Map<
    string,
    {
      duration: number;
      path: string[];
    }
  >();

  const visiting = new Set<string>();

  function longestPath(
    id: string
  ): {
    duration: number;
    path: string[];
  } {
    // Prevent circular dependencies
    if (visiting.has(id)) {
      throw new Error(
        `Circular dependency detected involving approval: ${id}`
      );
    }

    if (memo.has(id)) {
      return memo.get(id)!;
    }

    const approval = approvalMap.get(id);

    if (!approval) {
      return {
        duration: 0,
        path: [],
      };
    }

    visiting.add(id);

    let longestDependency = {
      duration: 0,
      path: [] as string[],
    };

    for (const dependency of approval.dependencies) {
      if (!approvalMap.has(dependency)) {
        continue;
      }

      const dependencyPath =
        longestPath(dependency);

      if (
        dependencyPath.duration >
        longestDependency.duration
      ) {
        longestDependency = dependencyPath;
      }
    }

    visiting.delete(id);

    /*
     * Completed approvals have already consumed
     * their processing time.
     *
     * Therefore they contribute 0 remaining days.
     */
    const remainingDuration =
      approval.status === "approved"
        ? 0
        : approval.estimatedDays;

    const result = {
      duration:
        longestDependency.duration +
        remainingDuration,

      path: [
        ...longestDependency.path,
        id,
      ],
    };

    memo.set(id, result);

    return result;
  }

  let criticalPath: string[] = [];

  let criticalDuration = 0;

  for (const approval of approvals) {
    const result = longestPath(
      approval.id
    );

    if (
      result.duration >
      criticalDuration
    ) {
      criticalDuration =
        result.duration;

      criticalPath = result.path;
    }
  }

  return criticalPath;
}

function calculateCompletionTime(
  approvals: Approval[],
  approvalMap: Map<string, Approval>
): number {
  const memo = new Map<string, number>();

  const visiting = new Set<string>();

  function completionTime(
    id: string
  ): number {
    if (visiting.has(id)) {
      throw new Error(
        `Circular dependency detected involving approval: ${id}`
      );
    }

    if (memo.has(id)) {
      return memo.get(id)!;
    }

    const approval =
      approvalMap.get(id);

    if (!approval) {
      return 0;
    }

    visiting.add(id);

    /*
     * Find the longest dependency chain.
     *
     * Dependencies run sequentially before
     * this approval can begin.
     */
    let dependencyTime = 0;

    for (const dependency of approval.dependencies) {
      if (!approvalMap.has(dependency)) {
        continue;
      }

      dependencyTime = Math.max(
        dependencyTime,
        completionTime(dependency)
      );
    }

    visiting.delete(id);

    /*
     * Already approved work requires
     * no additional time.
     */
    const ownDuration =
      approval.status === "approved"
        ? 0
        : approval.estimatedDays;

    const result =
      dependencyTime + ownDuration;

    memo.set(id, result);

    return result;
  }

  let totalTime = 0;

  for (const approval of approvals) {
    totalTime = Math.max(
      totalTime,
      completionTime(approval.id)
    );
  }

  return totalTime;
}

export function analyzeWorkflow(
  approvals: Approval[]
): WorkflowAnalysis {
  const graph = buildWorkflowGraph(approvals);

  const nodeMap = new Map(
    graph.nodes.map((node) => [
      node.id,
      node,
    ])
  );

  return {
    ready: graph.readyApprovals
      .map((id) => nodeMap.get(id)?.approval)
      .filter(Boolean) as Approval[],

    blocked: graph.blockedApprovals
      .map((id) => nodeMap.get(id)?.approval)
      .filter(Boolean) as Approval[],

    inProgress: graph.nodes
      .filter(
        (node) => node.status === "in_progress"
      )
      .map((node) => node.approval),

    completed: graph.completedApprovals
      .map((id) => nodeMap.get(id)?.approval)
      .filter(Boolean) as Approval[],

    criticalPath: graph.criticalPath
      .map((id) => nodeMap.get(id)?.approval)
      .filter(Boolean) as Approval[],

    bottlenecks: findBottlenecks(graph),
  };
}

function findBottlenecks(
  graph: WorkflowGraph
): Approval[] {
  const nodeMap = new Map(
    graph.nodes.map((node) => [
      node.id,
      node,
    ])
  );

  return graph.nodes
    .filter(
      (node) =>
        node.status === "blocked" &&
        node.unlocks.length >= 2
    )
    .sort(
      (a, b) =>
        b.unlocks.length -
        a.unlocks.length
    )
    .map((node) => node.approval);
}

export function validateDependencies(
  approvals: Approval[]
): string[] {
  const ids = new Set(
    approvals.map((approval) => approval.id)
  );

  const errors: string[] = [];

  for (const approval of approvals) {
    for (const dependency of approval.dependencies) {
      if (!ids.has(dependency)) {
        errors.push(
          `${approval.name} depends on missing approval: ${dependency}`
        );
      }
    }
  }

  return errors;
}