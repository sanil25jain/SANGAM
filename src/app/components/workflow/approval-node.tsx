import dagre from "@dagrejs/dagre";

import type {
  Edge,
  Node,
} from "@xyflow/react";

const NODE_WIDTH = 250;
const NODE_HEIGHT = 110;

export function layoutWorkflow(
  nodes: Node[],
  edges: Edge[]
) {
  const graph = new dagre.graphlib.Graph();

  graph.setDefaultEdgeLabel(
    () => ({})
  );

  graph.setGraph({
    rankdir: "TB",
    nodesep: 80,
    ranksep: 120,
    marginx: 40,
    marginy: 40,
  });

  nodes.forEach((node) => {
    graph.setNode(node.id, {
      width: NODE_WIDTH,
      height: NODE_HEIGHT,
    });
  });

  edges.forEach((edge) => {
    graph.setEdge(
      edge.source,
      edge.target
    );
  });

  dagre.layout(graph);

  return nodes.map((node) => {
    const position =
      graph.node(node.id);

    return {
      ...node,

      position: {
        x:
          position.x -
          NODE_WIDTH / 2,

        y:
          position.y -
          NODE_HEIGHT / 2,
      },
    };
  });
}

import { Handle, Position, type NodeProps } from "@xyflow/react";

interface ApprovalNodeData {
  name: string;
  department: string;
  status: "pending" | "in_progress" | "completed" | string;
}

const statusStyles: Record<string, string> = {
  pending: "border-slate-300 bg-white",
  in_progress: "border-blue-400 bg-blue-50",
  completed: "border-emerald-400 bg-emerald-50",
};

export function ApprovalNode({ data }: NodeProps) {
  const { name, department, status } = data as unknown as ApprovalNodeData;

  return (
    <div
      className={`w-[250px] rounded-lg border-2 px-4 py-3 shadow-sm ${
        statusStyles[status] ?? statusStyles.pending
      }`}
    >
      <Handle type="target" position={Position.Top} />

      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {department}
      </p>
      <h4 className="mt-1 text-sm font-semibold text-slate-950">{name}</h4>
      <p className="mt-1 text-xs capitalize text-slate-500">
        {status.replace("_", " ")}
      </p>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}