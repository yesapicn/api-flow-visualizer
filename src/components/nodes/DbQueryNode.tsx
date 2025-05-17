import React from 'react';
import { Handle, Position } from 'reactflow';

const DbQueryNode: React.FC<any> = ({ data }) => {
  const table = data.table || '';
  const where = Array.isArray(data.where) ? data.where : [];
  const select = data.select || '';
  const order = data.order || '';
  const queryType = data.queryType || 'one';
  const resultVarName = data.resultVarName || 'query_data';
  const listVarName = data.listVarName || 'query_list';
  const totalVarName = data.totalVarName || 'query_total';
  const pageVarName = data.pageVarName || 'page';
  const pageSizeVarName = data.pageSizeVarName || 'page_size';

  return (
    <div style={{ background: '#e6fffb', color: '#08979c', border: '2px solid #08979c', borderRadius: 8, minWidth: 160, minHeight: 60, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', fontWeight: 700, fontSize: 15, boxShadow: '0 2px 8px #b5f5ec', padding: 8 }}>
      <Handle type="target" position={Position.Top} style={{ background: '#08979c', height: 10, width: 10 }} />
      <div style={{ width: '100%' }}>
        <div style={{ fontWeight: 700 }}>{data.label || '查询数据'}</div>
        <div style={{ fontSize: 13, fontWeight: 800, margin: '2px 0' }}>表名: <span>{table}</span></div>
        <div style={{ fontSize: 12, color: '#006d75', margin: '2px 0' }}>查询类型: {queryType === 'one' ? '查询一条' : '查询列表'}</div>
        {select && <div style={{ fontSize: 12, color: '#006d75', margin: '2px 0' }}>选择字段: {select}</div>}
        {where.length > 0 && (
          <div style={{ fontSize: 12, color: '#006d75', margin: '2px 0' }}>
            查询条件:<br />
            {where.map((w: { field: string; op: string; var: string }, idx: number) => (
              <span key={idx} style={{ display: 'block' }}>
                字段:{w.field} {w.op} ${w.var}
              </span>
            ))}
          </div>
        )}
        {queryType === 'list' && order && (
          <div style={{ fontSize: 12, color: '#006d75', margin: '2px 0' }}>排序: {order}</div>
        )}
        {queryType === 'one' && (
          <div style={{ fontSize: 12, color: '#006d75', margin: '2px 0' }}>结果变量: ${resultVarName}</div>
        )}
        {queryType === 'list' && (
          <>
            <div style={{ fontSize: 12, color: '#006d75', margin: '2px 0' }}>页码变量: ${pageVarName}，分页数量变量: ${pageSizeVarName}</div>
            <div style={{ fontSize: 12, color: '#006d75', margin: '2px 0' }}>列表变量: ${listVarName}，总数变量: ${totalVarName}</div>
          </>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#08979c', height: 10, width: 10 }} />
    </div>
  );
};

export default DbQueryNode; 