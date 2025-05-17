import React from 'react';
import { Handle, Position } from 'reactflow';

const DbSqlNode: React.FC<any> = ({ data }) => (
  <div style={{ background: '#f0f5ff', color: '#2f54eb', border: '2px solid #2f54eb', borderRadius: 8, minWidth: 100, minHeight: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15, boxShadow: '0 2px 8px #adc6ff' }}>
    <Handle type="target" position={Position.Top} style={{ background: '#2f54eb', height: 10, width: 10 }} />
    <span>{data.label || 'SQL自定义'}</span>
    <Handle type="source" position={Position.Bottom} style={{ background: '#2f54eb', height: 10, width: 10 }} />
  </div>
);

export default DbSqlNode; 