import React from 'react';
import { Form, Input } from 'antd';

const PrintVarNodeConfig: React.FC = () => {
  return (
    <Form.Item
      label="打印的变量名称"
      name="varName"
      rules={[{ required: true, message: '请输入变量名' }]}
      extra="请输入变量名（无需加$，自动补全）"
    >
      <Input addonBefore="$" placeholder="如: money" />
    </Form.Item>
  );
};

export default PrintVarNodeConfig; 