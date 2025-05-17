import React from 'react';
import { Form, Input } from 'antd';

const DbSqlNodeConfig: React.FC = () => (
  <>
    <Form.Item name="label" label="节点名称" rules={[{ required: true }]}> <Input /> </Form.Item>
    <Form.Item name="sql" label="SQL语句">
      <Input.TextArea rows={3} placeholder="SELECT * FROM users WHERE id=1" />
    </Form.Item>
    <Form.Item name="desc" label="备注"> <Input /> </Form.Item>
  </>
);

export default DbSqlNodeConfig; 