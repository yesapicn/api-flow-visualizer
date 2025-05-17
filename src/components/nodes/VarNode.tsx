import React from 'react';
import { Handle, Position } from 'reactflow';

interface VarNodeData {
  label: string;
  varName?: string;
  expression?: string;
}

const VarNode: React.FC<{ data: VarNodeData }> = ({ data }) => (
  <div style={{ background: '#e6f4ff', color: '#1677ff', border: '2px solid #1677ff', borderRadius: 8, minWidth: 120, minHeight: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, boxShadow: '0 2px 8px #bae0ff', padding: 6 }}>
    <Handle type="target" position={Position.Top} style={{ background: '#1677ff', height: 10, width: 10 }} />
    <div>{data.label || '变量赋值'}</div>
    <div style={{ fontWeight: 400, fontSize: 13, marginTop: 2 }}>
      <span style={{ color: '#666' }}>{data.varType} </span>
      <span style={{ color: '#0958d9' }}>{data.varName ? `$${data.varName}` : '$变量'}</span>
      {data.expression ? <span> = <span style={{ color: '#d46b08' }}>{data.expression}</span></span> : null}
    </div>
    <Handle type="source" position={Position.Bottom} style={{ background: '#1677ff', height: 10, width: 10 }} />
  </div>
);

export default VarNode; 