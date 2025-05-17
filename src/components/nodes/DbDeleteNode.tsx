import React from 'react';
import { Handle, Position } from 'reactflow';

const DbDeleteNode: React.FC<any> = ({ data }) => {
  const table = data.table || '';
  const where = Array.isArray(data.where) ? data.where : [];

  return (
    <div style={{ background: '#fff1f0', color: '#ff4d4f', border: '2px solid #ff4d4f', borderRadius: 8, minWidth: 140, minHeight: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', fontWeight: 700, fontSize: 15, boxShadow: '0 2px 8px #ffa39e', padding: 8 }}>
      <Handle type="target" position={Position.Top} style={{ background: '#ff4d4f', height: 10, width: 10 }} />
      <div style={{ width: '100%' }}>
        <div style={{ fontWeight: 700 }}>{data.label || '删除数据'}</div>
        <div style={{ fontSize: 13, fontWeight: 800, margin: '2px 0' }}>表名: <span >{table}</span></div>
        {where.length > 0 && (
          <div style={{ fontSize: 12, color: '#a8071a', margin: '2px 0' }}>
            删除条件:<br />
            {where.map((w: { field: string; op: string; var: string }, idx: number) => (
              <span key={idx} style={{ display: 'block' }}>
                字段:{w.field} {w.op} ${w.var}
              </span>
            ))}
          </div>
        )}
        <div style={{ fontSize: 12, color: '#a8071a', margin: '2px 0' }}>
          删除结果变量: ${data.deleteResultVarName}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#ff4d4f', height: 10, width: 10 }} />
    </div>
  );
};

export default DbDeleteNode; 