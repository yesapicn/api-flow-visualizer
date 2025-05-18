import React from 'react';
import { Handle, Position } from 'reactflow';

const LoopNode: React.FC<any> = ({ data, id, onEnterSubFlow }) => {
  const type = data.loopType || 'array';
  return (
    <div style={{ background: '#f9f0ff', color: '#722ed1', border: '2px solid #722ed1', borderRadius: 8, minWidth: 260, maxWidth: 420, minHeight: 56, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', fontWeight: 600, fontSize: 15, boxShadow: '0 2px 8px #efdbff', padding: 10 }}>
      <Handle type="target" position={Position.Top} style={{ background: '#722ed1', height: 10, width: 10   }} />
      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 2 }}>{data.label || '循环'}</div>
      <div style={{ fontSize: 12, color: '#a084ca', marginBottom: 2 }}>
        {type === 'array'
          ? <span>数据源: <span style={{ color: '#722ed1' }}>{data.dataSource || '[未配置]'}</span>，变量: <span style={{ color: '#722ed1' }}>{data.isRef ? '&' : ''}${data.loopVar || 'item'}</span></span>
          : <span>次数: <span style={{ color: '#722ed1' }}>{data.loopCount || '[未配置]'}</span>，变量: <span style={{ color: '#722ed1' }}>${data.loopVar || 'i'}</span></span>
        }
      </div>
      {data.loopBodyCode && (
        <pre style={{ background: '#f4f4f4', color: '#333', fontSize: 12, padding: 8, borderRadius: 4, marginTop: 4, width: '100%', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{data.loopBodyCode}</pre>
      )}
      <Handle type="source" position={Position.Bottom} style={{ background: '#722ed1', height: 10, width: 10   }} />
    </div>
  );
};

export default LoopNode; 