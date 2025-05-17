import React from 'react';
import { Handle, Position } from 'reactflow';

const StartNode = ({ data }: any) => {
  const { label, params } = data || {};
  const paramsArr = Array.isArray(params) ? params : [];
  return (
    <div style={{ border: '2px solid #3bbf3b', borderRadius: 50, background: '#3bbf3b', color: '#fff', padding: 12, minWidth: 64, minHeight: 64, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px #0001' }}>
      <div style={{ fontWeight: 700, fontSize: 28, marginBottom: 4 }}>{label || '开始'}</div>
      {paramsArr.length > 0 && (
        <div style={{ background: '#fff', color: '#3bbf3b', borderRadius: 6, padding: '4px 8px', fontSize: 12, marginTop: 4, minWidth: 80 }}>
          <div style={{ fontWeight: 600, marginBottom: 2 }}>参数:</div>
          {paramsArr.map((p: any, idx: number) => (
            <div key={idx} style={{ whiteSpace: 'nowrap' }}>${p.paramName} <span style={{ color: '#888' }}>=</span> $params['{p.varName}']</div>
          ))}
        </div>
      )}
      <Handle type="source" position={Position.Bottom}  style={{ background: '#fff', height: 10, width: 10 }}/>
    </div>
  );
};

export default StartNode; 