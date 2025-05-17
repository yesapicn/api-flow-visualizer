import React from 'react';
import { Form, Input, Select, Button, Table, Space } from 'antd';

const returnTypeOptions = [
  { value: 'var', label: '返回变量' },
  { value: 'text', label: '返回文本' },
];

type OutputVar = { varName: string; value: string };
const defaultVar: OutputVar = { varName: '', value: '' };

const EndNodeConfig: React.FC<{ form?: any }> = ({ form }) => {
  // 直接用外部 form
  const returnType = Form.useWatch('returnType', form) || 'var';
  const outputVars: OutputVar[] = Form.useWatch('outputVars', form) || [defaultVar];

  const handleReturnTypeChange = (val: string) => {
    form.setFieldsValue({ returnType: val });
  };

  const handleVarChange = (idx: number, key: keyof OutputVar, value: string) => {
    const newVars = [...outputVars];
    newVars[idx][key] = value;
    form.setFieldsValue({ outputVars: newVars });
  };

  const addVar = () => {
    form.setFieldsValue({ outputVars: [...outputVars, { ...defaultVar }] });
  };

  const removeVar = (idx: number) => {
    const newVars = outputVars.filter((_, i) => i !== idx);
    form.setFieldsValue({ outputVars: newVars });
  };

  return (
    <>
      <Form.Item label="节点名称" name="label"><Input /></Form.Item>
      <Form.Item label="返回方式" name="returnType" initialValue="var">
        <Select options={returnTypeOptions} onChange={handleReturnTypeChange} />
      </Form.Item>
      {returnType === 'var' ? (
        <Form.Item label="输出变量" name="outputVars" initialValue={[defaultVar]} valuePropName="value" trigger="onChange">
          <Table
            dataSource={outputVars}
            pagination={false}
            rowKey={(_, idx) => idx?.toString() || ''}
            size="small"
            columns={[
              {
                title: '字段名',
                dataIndex: 'varName',
                render: (text, _, idx) => (
                  <Input
                    value={text}
                    placeholder="如 total"
                    onChange={e => handleVarChange(idx, 'varName', e.target.value)}
                  />
                ),
              },
              {
                title: '变量名',
                dataIndex: 'value',
                render: (text, _, idx) => (
                  <Input
                    value={text}
                    addonBefore="$"
                    placeholder="无需填写$，如 total"
                    onChange={e => handleVarChange(idx, 'value', e.target.value)}
                  />
                ),
              },
              {
                title: '操作',
                dataIndex: 'op',
                render: (_, __, idx) => (
                  <Space>
                    <Button size="small" danger onClick={() => removeVar(idx)} disabled={outputVars.length === 1}>删除</Button>
                  </Space>
                ),
              },
            ]}
            footer={() => <Button type="dashed" onClick={addVar} block>添加变量</Button>}
          />
        </Form.Item>
      ) : (
        <Form.Item label="返回文本" name="expression">
          <Input.TextArea placeholder="请输入返回表达式，如 $a+1 或 'ok'" autoSize={{ minRows: 2, maxRows: 4 }} />
        </Form.Item>
      )}
    </>
  );
};

export default EndNodeConfig; 