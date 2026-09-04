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