"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  MarkerType,
  type Edge,
  type Node,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import type { WorkflowGraph } from "../../types/workflow";

import { ApprovalNode } from "./approval-node";

import { layoutWorkflow } from "../../lib/workflow/layout";

const nodeTypes = {
  approval: ApprovalNode,
};

interface DependencyGraphProps {
  graph: WorkflowGraph;
}

export function DependencyGraph({
  graph,
}: DependencyGraphProps) {
  const [selectedNode, setSelectedNode] =
    useState<string | null>(null);

  const { nodes, edges } = useMemo(() => {
    const rawNodes: Node[] =
      graph.nodes.map((node) => ({
        id: node.id,

        type: "approval",

        position: {
          x: 0,
          y: 0,
        },

        data: {
          name: node.approval.name,
          department:
            node.approval.department,
          status: node.status,
        },
      }));

    const rawEdges: Edge[] =
      graph.edges.map((edge) => {
        const sourceNode =
          graph.nodes.find(
            (node) =>
              node.id === edge.from
          );

        const targetNode =
          graph.nodes.find(
            (node) =>
              node.id === edge.to
          );

        const isCompleted =
          sourceNode?.status ===
          "completed";

        const isCritical =
          graph.criticalPath.includes(
            edge.from
          ) &&
          graph.criticalPath.includes(
            edge.to
          );

        return {
          id: `${edge.from}-${edge.to}`,

          source: edge.from,

          target: edge.to,

          type: "smoothstep",

          animated:
            sourceNode?.status ===
            "in_progress",

          markerEnd: {
            type: MarkerType.ArrowClosed,
          },

          label: isCompleted
            ? "Completed"
            : "Dependency",

          style: {
            strokeWidth:
              isCritical ? 3 : 2,
          },

          labelStyle: {
            fontSize: 10,
            fontWeight: 500,
          },

          data: {
            sourceName:
              sourceNode?.approval.name,

            targetName:
              targetNode?.approval.name,
          },
        };
      });

    return {
      nodes: layoutWorkflow(
        rawNodes,
        rawEdges
      ),

      edges: rawEdges,
    };
  }, [graph]);

  const selected =
    graph.nodes.find(
      (node) =>
        node.id === selectedNode
    );

  return (
    <div className="relative h-[650px] overflow-hidden rounded-xl border border-slate-200 bg-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{
          padding: 0.2,
        }}
        onNodeClick={(_, node) => {
          setSelectedNode(node.id);
        }}
      >
        <Background />

        <Controls />

        <MiniMap
          pannable
          zoomable
        />
      </ReactFlow>

      {/* Node details */}

      {selected && (
        <div className="absolute right-4 top-4 z-10 w-[300px] rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Approval
              </p>

              <h3 className="mt-1 font-semibold text-slate-950">
                {selected.approval.name}
              </h3>
            </div>

            <button
              type="button"
              onClick={() =>
                setSelectedNode(null)
              }
              className="text-sm text-slate-400 hover:text-slate-700"
            >
              ×
            </button>
          </div>

          <p className="mt-2 text-xs text-slate-500">
            {selected.approval.department}
          </p>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs text-slate-400">
                Status
              </p>

              <p className="mt-1 text-sm font-medium text-slate-800">
                {selected.status.replace(
                  "_",
                  " "
                )}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Estimated time
              </p>

              <p className="mt-1 text-sm font-medium text-slate-800">
                {selected.approval.estimatedDays}{" "}
                days
              </p>
            </div>

            {selected.blockedBy.length >
              0 && (
              <div>
                <p className="text-xs text-slate-400">
                  Blocked by
                </p>

                <div className="mt-1 space-y-1">
                  {selected.blockedBy.map(
                    (id) => {
                      const dependency =
                        graph.nodes.find(
                          (node) =>
                            node.id === id
                        );

                      return (
                        <p
                          key={id}
                          className="text-sm font-medium text-red-600"
                        >
                          {dependency
                            ?.approval
                            .name ??
                            id}
                        </p>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {selected.unlocks.length >
              0 && (
              <div>
                <p className="text-xs text-slate-400">
                  Unlocks
                </p>

                <div className="mt-1 space-y-1">
                  {selected.unlocks.map(
                    (id) => {
                      const approval =
                        graph.nodes.find(
                          (node) =>
                            node.id === id
                        );

                      return (
                        <p
                          key={id}
                          className="text-sm font-medium text-blue-600"
                        >
                          {approval
                            ?.approval
                            .name ??
                            id}
                        </p>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}