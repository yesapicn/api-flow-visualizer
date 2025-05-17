import React from 'react';
import { Form, Input, Table, Select, Button, Radio } from 'antd';
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

const DbQueryNodeConfig: React.FC = () => (
  <>
    <Form.Item name="label" label="节点名称" > <Input /> </Form.Item>
    <Form.Item name="table" label="表名" rules={[{ required: true }]}>
      <Input placeholder="英文模型名，如 users" />
    </Form.Item>
    <Form.Item name="queryType" label="查询类型" initialValue="one">
      <Radio.Group>
        <Radio.Button value="one">查询一条数据</Radio.Button>
        <Radio.Button value="list">查询列表数据</Radio.Button>
      </Radio.Group>
    </Form.Item>
    <Form.Item name="select" label="选择字段（英文逗号分隔）">
      <Input placeholder="id,name,age" />
    </Form.Item>
    <Form.List name="where">
      {(fields, { add, remove }) => (
        <>
          <div style={{ fontWeight: 600, marginBottom: 8 }}>查询条件（where）</div>
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
    <Form.Item shouldUpdate>
      {({ getFieldValue }) => {
        const queryType = getFieldValue('queryType') || 'one';
        if (queryType === 'one') {
          return (
            <>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>返回变量</div>
            <Form.Item name="resultVarName" label="返回结果变量" initialValue="query_data">
              <Input addonBefore="$" placeholder="如 query_data" />
            </Form.Item>
            </>
          );
        }
        if (queryType === 'list') {
          return (
            <>
              <Form.Item name="order" label="排序">
                <Input placeholder="id desc" />
              </Form.Item>
              <Form.Item name="pageVarName" label="第几页变量" initialValue="page">
                <Input addonBefore="$" placeholder="如 page" />
              </Form.Item>
              <Form.Item name="pageSizeVarName" label="分页数量变量" initialValue="page_size">
                <Input addonBefore="$" placeholder="如 page_size" />
              </Form.Item>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>返回变量</div>
              <Form.Item name="listVarName" label="返回列表变量" initialValue="query_list">
                <Input addonBefore="$" placeholder="如 query_list" />
              </Form.Item>
              <Form.Item name="totalVarName" label="总数变量" initialValue="query_total">
                <Input addonBefore="$" placeholder="如 query_total" />
              </Form.Item>
            </>
          );
        }
        return null;
      }}
    </Form.Item>
    <Form.Item name="desc" label="备注"> <Input /> </Form.Item>
  </>
);

export default DbQueryNodeConfig; 