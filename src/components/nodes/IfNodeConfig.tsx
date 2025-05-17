import React from 'react';
import { Form, Input } from 'antd';

const IfNodeConfig: React.FC = () => (
  <>
    <Form.Item name="label" label="节点名称" > <Input /> </Form.Item>
    <Form.Item name="condition" label="条件表达式（PHP代码）">
      <Input.TextArea rows={2} placeholder="如 $a > 0" />
    </Form.Item>
    
    <Form.Item name="ifTrue" label="真分支代码 (PHP代码)">
      <Input.TextArea rows={6} placeholder="在此输入真分支 PHP 代码" />
    </Form.Item>

    <Form.Item name="ifFalse" label="假分支代码 (PHP代码)">
      <Input.TextArea rows={6} placeholder="在此输入假分支 PHP 代码" />
    </Form.Item>
  </>
);

export default IfNodeConfig; 