import React from 'react';
import { Form, Input } from 'antd';

const CodeNodeConfig: React.FC = () => (
  <Form.Item name="phpCode" label="PHP代码" rules={[{ required: true, message: '请输入PHP代码' }]}
    extra="可直接书写PHP代码片段，支持多行，建议每行结尾加分号">
    <Input.TextArea
      rows={8}
      style={{ fontFamily: 'monospace', fontSize: 14, whiteSpace: 'pre', lineHeight: 1.6 }}
      placeholder="输入PHP代码片段，每行结尾加分号"
      autoSize={{ minRows: 8, maxRows: 20 }}
      showCount
    />
  </Form.Item>
);

export default CodeNodeConfig; 