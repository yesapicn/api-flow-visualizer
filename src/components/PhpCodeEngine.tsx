import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';

interface EngineProps {
  flowJson: any;
}

const { TextArea } = Input;
const { Title } = Typography;

// 简单的节点类型处理
function generatePhpCode(flowJson: any): string {
  if (!flowJson || !flowJson.nodes) return '';
  const nodes = flowJson.nodes;
  const edges = flowJson.edges || [];
  const nodeMap = Object.fromEntries(nodes.map((n: any) => [n.id, n]));
  const startNode = nodes.find((n: any) => n.type === 'start');
  if (!startNode) return '// 未找到开始节点';

  let code = '<?php\n';

  // 处理开始节点参数
  const paramsArr = (startNode.data?.params || []) as Array<{ paramName: string, varName: string }>;
  code += 'function ($params, $di) {\n';
  // 绑定变量名
  paramsArr.forEach(p => {
    if (p.varName) {
      code += `    $${p.varName} = $params['${p.paramName}']; // 输入参数\n`;
    }
  });
  let current = startNode;
  const visited = new Set();
  while (current && !visited.has(current.id)) {

    code += '\n    /* 节点: ' + current.data.label + ' 开始 */\n';

    visited.add(current.id);

    // 处理变量节点
    if (current.type === 'var') {
      const v = current.data;
      switch (v.varType) {
        case 'string':
          code += `    $${v.varName || '变量'} = ${v.expression ? "'" + v.expression + "'" :  "''"}; // ${v.label} \n`;
          break;
        case 'int':
          code += `    $${v.varName || '变量'} = ${v.expression || 0}; // ${v.label} \n`;
          break;
        case 'array':
          code += `    $${v.varName || '变量'} = ${v.expression || "[]"}; // ${v.label} \n`;
          break;
        case 'object':
          code += `    $${v.varName || '变量'} = ${v.expression || "null"}; // ${v.label} \n`;
          break;
        case 'bool':
          code += `    $${v.varName || '变量'} = ${v.expression || "false"}; // ${v.label} \n`;
          break;
        case 'float':
          code += `    $${v.varName || '变量'} = ${v.expression || "0.0"}; // ${v.label} \n`;
          break;
        case 'null':
          code += `    $${v.varName || '变量'} = null; // ${v.label} \n`;
          break;
        default:
          code += `    $${v.varName || '变量'} = ${v.expression || "''"}; // ${v.label} \n`;
          break;
      }
    }

    // 处理新增数据节点
    if (current.type === 'db_add') {
      const v = current.data;
      const table = v.table || '';
      const fields = Array.isArray(v.fields) ? v.fields : [];
      const idVarName = v.idVarName || 'new_data_id';
      code += `    // 新增数据: ${table} \n`;
      code += `    $insertData = [\n`;
      fields.forEach((f: { field: string; var: string }) => {
        code += `        '${f.field}' => $${f.var},\n`;
      });
      code += `    ];\n`;
      code += `    $insertData['add_time'] = date('Y-m-d H:i:s');\n`;
      code += `    $insertData['update_time'] = date('Y-m-d H:i:s');\n`;
      code += `    $model = $di->db->${table};\n`;
      code += `    $model->insert($insertData);\n`;
      code += `    $${idVarName} = $model->insert_id();\n`;
      code += `    $${idVarName} = $${idVarName} ? intval($${idVarName}) : $${idVarName};\n`;
      code += `    yesapi_debug('${table} 新增数据ID:', $${idVarName}); // 打印变量\n`;
      code += `    \n`;
    }

    // 处理更新数据节点
    if (current.type === 'db_update') {
      const v = current.data;
      const table = v.table || '';
      const fields = Array.isArray(v.fields) ? v.fields : [];
      const where = Array.isArray(v.where) ? v.where : [];
      code += `    // 更新数据: ${table} \n`;
      code += `    $updateData = [\n`;
      fields.forEach((f: { field: string; var: string }) => {
        code += `        '${f.field}' => $${f.var},\n`;
      });
      code += `    ];\n`;
      code += `    $whereData = [\n`;
      where.forEach((w: { field: string; op: string; var: string }) => {
        code += `        '${w.field} ${w.op} ?' => $${w.var},\n`;
      });
      code += `    ];\n`;
      code += `    $model = $di->db->${table};\n`;
      code += `    $${v.updateResultVarName} = $model->where($whereData)->update($updateData);\n`;
      code += `    yesapi_debug('${table} 更新数据', $updateData, $${v.updateResultVarName}); // 打印变量\n`;
      code += `    \n`;
    }

    // 处理打印变量节点
    if (current.type === 'print_var') {
      const v = current.data;
      if (v && v.varName) {
        code += `    yesapi_debug('${v.varName}:', $${v.varName}); // 打印变量\n`;
      }
    }
    if (current.type === 'code') {
      const v = current.data;
      if (v && v.phpCode) {
        code += '    ' + v.phpCode + '\n';
      }
    }

    // 处理删除数据节点
    if (current.type === 'db_delete') {
      const v = current.data;
      const table = v.table || '';
      const where = Array.isArray(v.where) ? v.where : [];
      code += `    // 删除数据: ${table} \n`;
      code += `    $whereData = [\n`;
      where.forEach((w: { field: string; op: string; var: string }) => {
        code += `        '${w.field} ${w.op} ?' => $${w.var},\n`;
      });
      code += `    ];\n`;
      code += `    $model = $di->db->${table};\n`;
      code += `    $${v.deleteResultVarName} = $model->where($whereData)->delete();\n`;
      code += `    yesapi_debug('${table} 删除数据', $whereData, $${v.deleteResultVarName}); // 打印变量\n`;
      code += `    \n`;
    }

    // 处理查询数据节点
    if (current.type === 'db_query') {
      const v = current.data;
      const table = v.table || '';
      const where = Array.isArray(v.where) ? v.where : [];
      const select = v.select || '*';
      const queryType = v.queryType || 'one';
      const order = v.order || '';
      if (queryType === 'one') {
        const resultVarName = v.resultVarName || 'query_data';
        code += `    // 查询一条数据: ${table} \n`;
        code += `    $whereData = [\n`;
        where.forEach((w: { field: string; op: string; var: string }) => {
          code += `        '${w.field} ${w.op} ?' => $${w.var},\n`;
        });
        code += `    ];\n`;
        code += `    $model = $di->db->${table};\n`;
        code += `    $${resultVarName} = $model->select('${select}')->where($whereData)->fetchOne();\n`;
        code += `    yesapi_debug('${table} 查询一条数据', $whereData, $${resultVarName}); // 打印变量\n`;
        code += `    \n`;
      } else {
        const listVarName = v.listVarName || 'query_list';
        const totalVarName = v.totalVarName || 'query_total';
        const pageVarName = v.pageVarName || 'page';
        const pageSizeVarName = v.pageSizeVarName || 'page_size';
        code += `    // 查询列表数据: ${table} \n`;
        code += `    $whereData = [\n`;
        where.forEach((w: { field: string; op: string; var: string }) => {
          code += `        '${w.field} ${w.op} ?' => $${w.var},\n`;
        });
        code += `    ];\n`;
        code += `    $model = $di->db->${table};\n`;
        code += `    $${totalVarName} = $model->where($whereData)->count();\n`;
        code += `    $${listVarName} = $model`;
        if (order) code += `->order('${order}')`;
        code += `->select('${select}')->page($${pageVarName} ? intval($${pageVarName}) : 1, $${pageSizeVarName} ? intval($${pageSizeVarName})  : 10)->fetchAll();\n`;
        code += `    yesapi_debug('${table} 查询列表数据', $whereData, $${listVarName}, $${totalVarName}); // 打印变量\n`;
        code += `    \n`;
      }
    }

    // 处理结束节点
    if (current.type === 'end') {
      const d = current.data || {};
      if (d.returnType === 'var') {
        if (Array.isArray(d.outputVars) && d.outputVars.length > 0) {
          code += '    return [';
          code += d.outputVars.map((v: any) => `\n        '${v.varName}' => ${v.value ? "$" + v.value :  "''"}`).join(',');
          code += '\n    ];\n';
        } else {
          code += '    return [];\n';
        }
      } else if (d.returnType === 'text') {
        code += `    return ${d.expression || "''"};\n`;
      } else {
        code += '    return [];\n';
      }
      break;
    }

    // 处理循环节点
    if (current.type === 'loop') {
      const v = current.data;
      let loopCode = '';
      if (v.loopType === 'array') {
        loopCode += `    foreach ($${v.dataSource || '[]'} as ${v.isRef ? '&' : ''}$${v.loopVar || 'item'}) {\n`;
      } else {
        loopCode += `    for ($${v.loopVar || 'i'} = 0; $${v.loopVar || 'i'} < ${v.loopCount || 1}; $${v.loopVar || 'i'}++) {\n`;
      }
      // 直接插入循环体代码
      if (v.loopBodyCode) {
        loopCode += v.loopBodyCode.split('\n').map((line: string) => '        ' + line).join('\n') + '\n';
      }
      loopCode += '    }\n';
      if (v.loopType === 'array' && v.isRef) {
        loopCode += `    unset($${v.loopVar}); // 去掉引用\n`;
      }
      code += loopCode;
    }

    // 处理条件节点
    if (current.type === 'if') {
      const v = current.data;
      code += `    if (${v.condition}) {\n`;
      code += v.ifTrue.split('\n').map((line: string) => '        ' + line).join('\n') + '\n';
      code += '    } else {\n';
      code += v.ifFalse.split('\n').map((line: string) => '        ' + line).join('\n') + '\n';
      code += '    }\n';
    }

    const outEdge = edges.find((e: any) => e.source === current.id);
    if (outEdge) {
      current = nodeMap[outEdge.target];
    } else {
      break;
    }
  }
  code += '\n}';
  return code;
}

const PhpCodeEngine: React.FC<EngineProps> = ({ flowJson }) => {
  const [phpCode, setPhpCode] = useState('');

  const handleGenerate = () => {
    setPhpCode(generatePhpCode(flowJson));
  };

  return (
    <div style={{ margin: 24 }}>
      <Title level={4}>PHP代码生成引擎</Title>
      <Button type="primary" onClick={handleGenerate}>生成PHP代码</Button>
      <TextArea rows={24} value={phpCode} style={{ marginTop: 16, fontFamily: 'monospace' }} readOnly />
    </div>
  );
};

// 将 generatePhpCode 作为静态方法添加到组件上
(PhpCodeEngine as any).generatePhpCode = generatePhpCode;

export default PhpCodeEngine; 