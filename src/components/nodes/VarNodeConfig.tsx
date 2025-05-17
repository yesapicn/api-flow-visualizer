import React from 'react';
import type { FormProps } from 'antd';
import { Form, Input, Select } from 'antd';

const varTypeOptions = [
  { value: 'string', label: '字符串' },
  { value: 'integer', label: '整数' },
  { value: 'float', label: '浮点数' },
  { value: 'boolean', label: '布尔' },
  { value: 'array', label: '数组' },
  { value: 'object', label: '对象' },
  { value: 'exp', label: 'PHP表达式' },
];

type FieldType = {
  label?: string;
  varName?: string;
  varType?: string;
  expression?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

// 表单文档：https://ant.design/components/form

const VarNodeConfig: React.FC = () => (
  <>
    <Form.Item label="节点名称">
      <Form.Item name="label" noStyle><Input /></Form.Item>
    </Form.Item>
    <Form.Item
      name="varName"
      label="变量名称"
      rules={[
        { required: true, message: '变量名称必填' },
        { pattern: /^[a-zA-Z_\u4e00-\u9fa5][a-zA-Z0-9_\u4e00-\u9fa5]*$/, message: '变量名需字母/下划线/中文开头，可含数字' }
      ]}
    >
      <Input addonBefore="$" placeholder="变量名，如 a、变量1" />
    </Form.Item>
    <Form.Item label="变量类型">  
      <Form.Item name="varType" initialValue="string" noStyle><Select options={varTypeOptions} /></Form.Item>
    </Form.Item>
    <Form.Item label="初始值">  
      <Form.Item name="expression" noStyle><Input placeholder="变量初始值，表达式如：1+2 或 $a+3" /></Form.Item>
    </Form.Item>
  </>
);

export default VarNodeConfig; 