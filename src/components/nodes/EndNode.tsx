import React from 'react';
import { Handle, Position } from 'reactflow';

const EndNode = ({ data }: any) => {
  const { label, returnType = 'var', outputVars = [], expression = '' } = data || {};
  return (
    <div style={{ background: '#ff4d4f', color: '#fff', borderRadius: 12, minWidth: 180, minHeight: 80, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16, border: '3px solid #a8071a', boxShadow: '0 2px 8px #ffccc7', padding: 10 }}>
      <Handle type="target" position={Position.Top} style={{ background: '#fff', height: 10, width: 10 }} />
      <div style={{ fontWeight: 700, fontSize: 18 }}>{label || '结束'}</div>
      <div style={{ marginTop: 6, width: '100%' }}>
        {returnType === 'var' ? (
          <div>
            <div style={{ fontWeight: 400, fontSize: 14, marginBottom: 2 }}>输出变量：</div>
            <table style={{ width: '100%', background: 'rgba(255,255,255,0.15)', borderRadius: 4, fontSize: 14 }}>
              <thead><tr><th style={{ color: '#fff', fontWeight: 400 }}>字段名</th><th style={{ color: '#fff', fontWeight: 400 }}>变量名</th></tr></thead>
              <tbody>
                {outputVars && outputVars.length > 0 ? outputVars.map((v: any, i: number) => (
                  <tr key={i}><td style={{ color: '#fff' }}>{v.varName}</td><td style={{ color: '#fff' }}>{v.value}</td></tr>
                )) : <tr><td colSpan={2} style={{ color: '#fff', opacity: 0.7 }}>无</td></tr>}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div style={{ fontWeight: 400, fontSize: 14, marginBottom: 2 }}>返回文本：</div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 4, padding: 6, color: '#fff', fontWeight: 400, fontSize: 15 }}>{expression || '未填写'}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EndNode; 