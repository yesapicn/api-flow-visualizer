import React from 'react';
import { Handle, Position } from 'reactflow';

const DbUpdateNode: React.FC<any> = ({ data }) => {
  const table = data.table || '';
  const where = Array.isArray(data.where) ? data.where : [];
  const fields = Array.isArray(data.fields) ? data.fields : [];

  return (
    <div style={{ background: '#fff7e6', color: '#fa8c16', border: '2px solid #fa8c16', borderRadius: 8, minWidth: 140, minHeight: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', fontWeight: 700, fontSize: 15, boxShadow: '0 2px 8px #ffd591', padding: 8 }}>
      <Handle type="target" position={Position.Top} style={{ background: '#fa8c16', height: 10, width: 10  }} />
      <div style={{ width: '100%' }}>
        <div style={{ fontWeight: 700 }}>{data.label || '更新数据'}</div>
        <div style={{ fontSize: 13, fontWeight: 800, margin: '2px 0' }}>表名: <span >{table}</span></div>
        {where.length > 0 && (
          <div style={{ fontSize: 12, color: '#ad6800', margin: '2px 0' }}>
            更新条件:<br />
            {where.map((w: { field: string; op: string; var: string }, idx: number) => (
              <span key={idx} style={{ display: 'block' }}>
                字段:{w.field} {w.op} ${w.var}
              </span>
            ))}
          </div>
        )}
        {fields.length > 0 && (
          <div style={{ fontSize: 12, color: '#ad6800', margin: '2px 0' }}>
            更新数据:<br />
            {fields.map((f: { field: string; var: string }, idx: number) => (
              <span key={idx} style={{ display: 'block' }}>
                字段:{f.field} = ${f.var}
              </span>
            ))}
          </div>
        )}
        <div style={{ fontSize: 12, color: '#ad6800', margin: '2px 0' }}>
          更新结果变量: ${data.updateResultVarName}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#fa8c16', height: 10, width: 10  }} />
    </div>
  );
};

export default DbUpdateNode; 