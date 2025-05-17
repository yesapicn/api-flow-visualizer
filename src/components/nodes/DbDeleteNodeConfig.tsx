import React from 'react';
import { Form, Input, Button, Table, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const compareOptions = [
  { label: '=', value: '=' },
  { label: '!=', value: '!=' },
  { label: '>', value: '>' },
  { label: '>=', value: '>=' },
  { label: '<', value: '<' },
  { label: '<=', value: '<=' },
  { label: 'LIKE', value: 'LIKE' },
  // { label: 'IN', value: 'IN' },
];

const DbDeleteNodeConfig: React.FC = () => (
  <>
    <Form.Item name="label" label="节点名称" > <Input /> </Form.Item>
    <Form.Item name="table" label="表名" rules={[{ required: true }]}>
      <Input placeholder="英文模型名，如 users" />
    </Form.Item>
    <Form.List name="where">
      {(fields, { add, remove }) => (
        <>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>删除条件（where）</div>
          <Table
            dataSource={fields.map((f, idx) => ({ key: f.key }))}
            pagination={false}
            size="small"
            columns={[
              {
                title: '字段名',
                dataIndex: 'field',
                render: (_, __, idx) => (
                  <Form.Item name={[fields[idx].name, 'field']} rules={[{ required: true, message: '必填' }]} noStyle>
                    <Input placeholder="字段名" />
                  </Form.Item>
                ),
              },
              {
                title: '比较符',
                dataIndex: 'op',
                render: (_, __, idx) => (
                  <Form.Item name={[fields[idx].name, 'op']} rules={[{ required: true, message: '必填' }]} noStyle>
                    <Select style={{ width: 80 }} options={compareOptions} placeholder="选择" />
                  </Form.Item>
                ),
              },
              {
                title: '变量名',
                dataIndex: 'var',
                render: (_, __, idx) => (
                  <Form.Item name={[fields[idx].name, 'var']} rules={[{ required: true, message: '必填' }]} noStyle>
                    <Input addonBefore="$" placeholder="变量名" />
                  </Form.Item>
                ),
              },
              {
                title: '',
                dataIndex: 'op',
                render: (_, __, idx) => (
                  <Button danger size="small" onClick={() => remove(fields[idx].name)} >-</Button>
                ),
              },
            ]}
          />
          <Button type="dashed" block onClick={() => add()} icon={<PlusOutlined />} style={{ marginTop: 8, marginBottom: 16 }}>
            新增条件
          </Button>
        </>
      )}
    </Form.List>
    <div style={{ fontWeight: 600, marginBottom: 8, marginTop: 16 }}>返回变量</div>
    <Form.Item name="deleteResultVarName" label="删除结果变量名" initialValue="delete_data_rows">
      <Input addonBefore="$" placeholder="返回删除数据行数，失败为false，无删除为0" />
    </Form.Item>
    <Form.Item name="desc" label="备注"> <Input /> </Form.Item>
  </>
);

export default DbDeleteNodeConfig; 