import React from 'react';
import { Handle, Position } from 'reactflow';

const ApiNode: React.FC<any> = ({ data }) => (
  <div style={{ background: '#e6fffb', color: '#13c2c2', border: '2px solid #13c2c2', borderRadius: 8, minWidth: 100, minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, boxShadow: '0 2px 8px #b5f5ec' }}>
    <Handle type="target" position={Position.Top} style={{ background: '#13c2c2', height: 10, width: 10 }} />
    <span>{data.label || 'API节点'}</span>
    <Handle type="source" position={Position.Bottom} style={{ background: '#13c2c2', height: 10, width: 10 }} />
  </div>
);

export default ApiNode; 