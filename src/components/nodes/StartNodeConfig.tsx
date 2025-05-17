import React from 'react';
import { Form, Input, Table, Button } from 'antd';

const StartNodeConfig: React.FC = () => {
  return (
    <>
      <Form.Item name="label" label="节点名称" rules={[{ required: true, message: '请输入节点名称' }]}> 
        <Input placeholder="如：开始" />
      </Form.Item>
      <Form.List name="params">
        {(fields, { add, remove }) => (
          <>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>输入参数</div>
            <Table
              dataSource={fields.map((f, idx) => ({ key: f.key }))}
              pagination={false}
              size="small"
              columns={[
                {
                  title: '输入参数名',
                  dataIndex: 'paramName',
                  render: (_, __, idx) => (
                    <Form.Item name={[fields[idx].name, 'paramName']} rules={[{ required: true, message: '必填' }]} noStyle>
                      <Input addonBefore="$" placeholder="如: userId" />
                    </Form.Item>
                  ),
                },
                {
                  title: '绑定接口参数',
                  dataIndex: 'varName',
                  render: (_, __, idx) => (
                    <Form.Item name={[fields[idx].name, 'varName']} rules={[{ required: true, message: '必填' }]} noStyle>
                      <Input placeholder="如: uid" />
                    </Form.Item>
                  ),
                },
                {
                  title: '操作',
                  dataIndex: 'op',
                  render: (_, __, idx) => (
                    <Button danger size="small" onClick={() => remove(fields[idx].name)}>
                      删除
                    </Button>
                  ),
                },
              ]}
            />
            <div style={{ color: '#888', fontSize: 12, marginTop: 8 }}>
              对应绑定到接口参数的$params['xxx']
            </div>
            <Button type="dashed" block onClick={() => add()} style={{ marginTop: 8 }}>
              新增参数
            </Button>
          </>
        )}
      </Form.List>
    </>
  );
};

export default StartNodeConfig; 