import React from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  MarkerType,
} from 'reactflow';
import type { Connection, Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';

interface MiniFlowEditorProps {
  nodes: Node[];
  edges: Edge[];
  onChange: (nodes: Node[], edges: Edge[]) => void;
  nodeTypes?: Record<string, React.ComponentType<any>>;
  style?: React.CSSProperties;
}

const MiniFlowEditor: React.FC<MiniFlowEditorProps> = ({ nodes, edges, onChange, nodeTypes, style }) => {
  const [localNodes, setLocalNodes, onNodesChange] = useNodesState(nodes);
  const [localEdges, setLocalEdges, onEdgesChange] = useEdgesState(edges);

  React.useEffect(() => {
    setLocalNodes(nodes);
    setLocalEdges(edges);
  }, [nodes, edges]);

  React.useEffect(() => {
    onChange(localNodes, localEdges);
    // eslint-disable-next-line
  }, [localNodes, localEdges]);

  const onConnect = React.useCallback((params: Edge | Connection) => {
    setLocalEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds));
  }, [setLocalEdges]);

  return (
    <div style={{ width: '100%', height: 320, background: '#f7f8fa', border: '1px solid #eee', borderRadius: 8, ...style }}>
      <ReactFlow
        nodes={localNodes}
        edges={localEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        nodeTypes={nodeTypes}
        proOptions={{ hideAttribution: true }}
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  );
};

export default MiniFlowEditor; 