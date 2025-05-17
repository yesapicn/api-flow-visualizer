import React from 'react';
import { Handle, Position } from 'reactflow';

const CodeNode: React.FC<any> = ({ data }) => (
  <div style={{ background: '#f5f5f5', color: '#595959', border: '2px solid #bfbfbf', borderRadius: 8, minWidth: 120, minHeight: 48, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', fontWeight: 500, fontSize: 14, boxShadow: '0 2px 8px #e6e6e6', padding: 10 }}>
    <Handle type="target" position={Position.Top} style={{ background: '#bfbfbf', height: 10, width: 10  }} />
    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>代码</div>
    {data.phpCode ? (
      <pre style={{ fontFamily: 'monospace', fontSize: 13, background: '#f0f0f0', borderRadius: 4, padding: 6, margin: 0, width: '100%', whiteSpace: 'pre-wrap', wordBreak: 'break-all', color: '#222' }}>{data.phpCode}</pre>
    ) : (
      <span style={{ color: '#bbb' }}>未填写代码</span>
    )}
    <Handle type="source" position={Position.Bottom} style={{ background: '#bfbfbf', height: 10, width: 10  }} />
  </div>
);

export default CodeNode; 