import React from 'react';
import { Handle, Position } from 'reactflow';

const DbAddNode: React.FC<any> = ({ data }) => {
  const table = data.table || '';
  const fields = Array.isArray(data.fields) ? data.fields : [];
  const idVarName = data.idVarName || 'new_data_id';

  return (
    <div style={{ background: '#f6ffed', color: '#52c41a', border: '2px solid #52c41a', borderRadius: 8, minWidth: 140, minHeight: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', fontWeight: 700, fontSize: 15, boxShadow: '0 2px 8px #b7eb8f', padding: 8 }}>
      <Handle type="target" position={Position.Top} style={{ background: '#52c41a', height: 10, width: 10 }} />
      <div style={{ width: '100%' }}>
        <div style={{ fontWeight: 700 }}>{data.label || '新增数据'}</div>
        <div style={{ fontSize: 13, fontWeight: 800, margin: '2px 0', display: 'block' }}>表名: <span style={{ color: '#389e0d' }}>{table}</span></div>
        {fields.length > 0 && (
          <div style={{ fontSize: 12, color: '#237804', margin: '2px 0' }}>
            
            {fields.map((f: { field: string; var: string }, idx: number) => (
              <span key={idx} >
                字段:{f.field} = ${f.var}
              </span>
            ))}
          </div>
        )}
        <div style={{ fontSize: 12, color: '#237804', margin: '2px 0' }}>新增ID变量: ${idVarName}</div>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#52c41a', height: 10, width: 10 }} />
    </div>
  );
};

export default DbAddNode; 