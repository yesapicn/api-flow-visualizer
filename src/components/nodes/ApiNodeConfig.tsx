import React from 'react';
import { Form, Input, Select } from 'antd';

const ApiNodeConfig: React.FC = () => (
  <>
    <Form.Item name="label" label="节点名称" > <Input /> </Form.Item>
    <Form.Item name="apiUrl" label="API地址" rules={[{ required: true }]}> <Input placeholder="https://api.example.com/xxx" /> </Form.Item>
    <Form.Item name="method" label="请求方式" initialValue="GET">
      <Select options={[{ value: 'GET', label: 'GET' }, { value: 'POST', label: 'POST' }]} />
    </Form.Item>
    <Form.Item name="params" label="参数（JSON字符串）">
      <Input.TextArea rows={2} placeholder="" />
    </Form.Item>
    <Form.Item name="desc" label="备注"> <Input /> </Form.Item>
  </>
);

export default ApiNodeConfig; 