import React from 'react';
import { Checkbox, Form, Input, Select } from 'antd';
import MiniFlowEditor from './MiniFlowEditor';

const normalizeDollar = (v: string) => (v && v.startsWith('$') ? v.slice(1) : v);

interface LoopNodeConfigProps {
  form: any;
}

const LoopNodeConfig: React.FC<LoopNodeConfigProps> = ({ form }) => {
  const loopType = Form.useWatch('loopType', form) || 'array';

  return (
    <>
      <Form.Item name="label" label="节点名称"> <Input /> </Form.Item>
      <Form.Item name="loopType" label="循环类型">
        <Select options={[
          { label: '数组循环', value: 'array' },
          { label: '指定循环次数', value: 'count' },
        ]} />
      </Form.Item>
      {loopType === 'array' && (
        <>
          <Form.Item name="dataSource" label="循环数组"
            rules={[{ required: true, message: '请输入数据源' },
              { pattern: /^[a-zA-Z_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]*$/, message: '变量名需字母/下划线/中文开头，可含数字' }]}
            normalize={normalizeDollar}
          >
            <Input addonBefore="$" placeholder="如 list 或 [1,2,3]，无需加$" />
          </Form.Item>
          <Form.Item name="loopVar" label="循环变量名"
            rules={[{ required: true, message: '请输入变量名' },
              { pattern: /^[a-zA-Z_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]*$/, message: '变量名需字母/下划线/中文开头，可含数字' }]}
            normalize={normalizeDollar}
          >
            <Input addonBefore="$" placeholder="如 item，无需加$" />
          </Form.Item>
          <Form.Item label="引用后可修改" name="isRef" valuePropName="checked">
            <Checkbox>是否&引用</Checkbox>
          </Form.Item>
        </>
      )}
      {loopType !== 'array' && (
        <>
          <Form.Item name="loopCount" label="循环次数" rules={[{ required: true, message: '请输入次数', type: 'number' }]}> 
            <Input type="number" min={1} placeholder="10" /> 
          </Form.Item>
          <Form.Item name="loopVar" label="循环变量名"
            rules={[{ required: true, message: '请输入变量名' },
              { pattern: /^[a-zA-Z_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]*$/, message: '变量名需字母/下划线/中文开头，可含数字' }]}
            normalize={normalizeDollar}
          >
            <Input addonBefore="$" placeholder="如 i，无需加$" />
          </Form.Item>
        </>
      )}
      <Form.Item name="loopBodyCode" label="循环体代码 (PHP)">
        <Input.TextArea rows={6} placeholder="在此输入循环体 PHP 代码" />
      </Form.Item>
      {/* 循环体可视化编辑入口将移到主画布，不再在弹窗内显示 */}
      <Form.Item name="subNodes" noStyle> <Input type="hidden" /> </Form.Item>
      <Form.Item name="subEdges" noStyle> <Input type="hidden" /> </Form.Item>
    </>
  );
};

export default LoopNodeConfig; 