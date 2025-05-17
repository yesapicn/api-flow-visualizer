import React from 'react';
import { Handle, Position } from 'reactflow';

const PrintVarNode = ({ data }: any) => {
  return (
    <div style={{ border: '1px solid #aaa', borderRadius: 6, background: '#f7f7fa', padding: 10, minWidth: 120 }}>
      <div style={{ fontWeight: 600, color: '#333' }}>打印变量</div>
      <div style={{ color: '#666', marginTop: 4 }}>
        {data.varName ? <span>打印: <span style={{ color: '#1677ff' }}>${`${data.varName}`}</span></span> : <span style={{ color: '#bbb' }}>未配置变量</span>}
      </div>
      <Handle type="target" position={Position.Top}  style={{ background: '#333', height: 10, width: 10 }}/>
      <Handle type="source" position={Position.Bottom} style={{ background: '#333', height: 10, width: 10 }}  />
    </div>
  );
};

export default PrintVarNode; 