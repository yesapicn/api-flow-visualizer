import React from 'react';
import { Form, Input, Button, Space, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const DbAddNodeConfig: React.FC = () => (
  <>
    <Form.Item name="label" label="节点名称"> <Input /> </Form.Item>
    <Form.Item name="table" label="表名" rules={[{ required: true }]}>
      <Input placeholder="英文模型名，如 users" />
    </Form.Item>
    <Form.List name="fields">
      {(fields, { add, remove }) => (
        <>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>设置字段</div>
          <Table
            dataSource={fields.map((f, idx) => ({ key: f.key }))}
            pagination={false}
            size="small"
            columns={[
              {
                title: '表字段名',
                dataIndex: 'field',
                render: (_, __, idx) => (
                  <Form.Item name={[fields[idx].name, 'field']} rules={[{ required: true, message: '必填' }]} noStyle>
                    <Input placeholder="表字段名" />
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
                title: '操作',
                dataIndex: 'op',
                render: (_, __, idx) => (
                  <Button danger size="small" onClick={() => remove(fields[idx].name)} >删除</Button>
                ),
              },
            ]}
          />
          <Button type="dashed" block onClick={() => add()} icon={<PlusOutlined />} style={{ marginTop: 8 }}>
            新增字段
          </Button>
        </>
      )}
    </Form.List>
    <div style={{ fontWeight: 600, marginBottom: 8, marginTop: 16 }}>返回变量</div>
    <Form.Item name="idVarName" label="新增ID变量名" initialValue="new_data_id">
      <Input addonBefore="$" placeholder="如 new_data_id" />
    </Form.Item>
    <Form.Item name="desc" label="备注"> <Input /> </Form.Item>
  </>
);

export default DbAddNodeConfig; 