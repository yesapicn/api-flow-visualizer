import React from 'react';
import { Handle, Position } from 'reactflow';

const IfNode: React.FC<any> = ({ data }) => (
  <div style={{ width: 90, height: 90, background: '#fffbe6', color: '#ad8b00', border: '2.5px solid #faad14', transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, boxShadow: '0 2px 8px #fffbe6' }}>
    <span style={{ transform: 'rotate(-45deg)' }}>{data.label || 'IF选择器'}</span>
    <Handle type="target" position={Position.Left} style={{ height: 10, width: 10  }} id="left" ></Handle>
    <Handle type="source" position={Position.Right} style={{ background: '#faad14', height: 10, width: 10  }} ></Handle>
  </div>
);

export default IfNode; 