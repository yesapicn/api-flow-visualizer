import React, { useCallback, useState, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  MarkerType,
} from 'reactflow';
import type {
  Connection,
  Edge,
  Node,
  ReactFlowInstance,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button, Drawer, Form, Input, Space, Card, Tooltip, message, Modal } from 'antd';
import {
  CodeOutlined,
  BranchesOutlined,
  SyncOutlined,
  EditOutlined,
  PlusSquareOutlined,
  SearchOutlined,
  DeleteOutlined,
  TableOutlined,
  PlayCircleOutlined,
  StopOutlined,
  ApiOutlined,
} from '@ant-design/icons';
import StartNode from './nodes/StartNode.tsx';
import EndNode from './nodes/EndNode.tsx';
import IfNode from './nodes/IfNode.tsx';
import VarNode from './nodes/VarNode.tsx';
import LoopNode from './nodes/LoopNode.tsx';
import CodeNode from './nodes/CodeNode.tsx';
import ApiNode from './nodes/ApiNode.tsx';
import DbAddNode from './nodes/DbAddNode.tsx';
import DbUpdateNode from './nodes/DbUpdateNode.tsx';
import DbQueryNode from './nodes/DbQueryNode.tsx';
import DbDeleteNode from './nodes/DbDeleteNode.tsx';
import DbSqlNode from './nodes/DbSqlNode.tsx';
import VarNodeConfig from './nodes/VarNodeConfig';
import IfNodeConfig from './nodes/IfNodeConfig';
import ApiNodeConfig from './nodes/ApiNodeConfig';
import LoopNodeConfig from './nodes/LoopNodeConfig';
import CodeNodeConfig from './nodes/CodeNodeConfig';
import DbAddNodeConfig from './nodes/DbAddNodeConfig';
import DbUpdateNodeConfig from './nodes/DbUpdateNodeConfig';
import DbQueryNodeConfig from './nodes/DbQueryNodeConfig';
import DbDeleteNodeConfig from './nodes/DbDeleteNodeConfig';
import DbSqlNodeConfig from './nodes/DbSqlNodeConfig';
import PhpCodeEngine from './PhpCodeEngine';
import EndNodeConfig from './nodes/EndNodeConfig';
import PrintVarNode from './nodes/PrintVarNode.tsx';
import PrintVarNodeConfig from './nodes/PrintVarNodeConfig';
import StartNodeConfig from './nodes/StartNodeConfig';
import type { FlowEditorProps } from '../types';
import MiniFlowEditor from './nodes/MiniFlowEditor';

// 节点类型定义
interface ApiNodeData {
  label: string;
  apiUrl?: string;
  params?: string;
  type: string;
  subNodes?: any[];
  subEdges?: any[];
}

const NODE_TYPES = [
  {
    group: '流程控制',
    nodes: [
      { type: 'start', label: '开始', icon: <PlayCircleOutlined /> },
      { type: 'end', label: '结束', icon: <StopOutlined /> },
    ],
  },
  {
    group: '业务逻辑',
    nodes: [
      { type: 'var', label: '变量赋值', icon: <EditOutlined /> },
      { type: 'if', label: 'IF选择器', icon: <BranchesOutlined /> },
      { type: 'loop', label: '循环', icon: <SyncOutlined /> },
      { type: 'code', label: '代码', icon: <CodeOutlined /> },
      { type: 'print_var', label: '打印变量', icon: <CodeOutlined /> },
    ],
  },
  {
    group: '数据库',
    nodes: [
      { type: 'db_add', label: '新增数据', icon: <PlusSquareOutlined /> },
      { type: 'db_update', label: '更新数据', icon: <EditOutlined /> },
      { type: 'db_query', label: '查询数据', icon: <SearchOutlined /> },
      { type: 'db_delete', label: '删除数据', icon: <DeleteOutlined /> },
      // { type: 'db_sql', label: 'SQL自定义', icon: <TableOutlined /> },
    ],
  },
];

const initialNodes: Node<ApiNodeData>[] = [
  {
    id: 'start-1',
    type: 'start',
    position: { x: 300, y: 100 },
    data: { label: '开始', type: 'start', params: [] },
  },
];
const initialEdges: Edge[] = [];

const nodeTypes: Record<string, React.ComponentType<any>> = {
  start: StartNode,
  end: EndNode,
  if: IfNode,
  var: VarNode,
  loop: LoopNode,
  code: CodeNode,
  api: ApiNode,
  db_add: DbAddNode,
  db_update: DbUpdateNode,
  db_query: DbQueryNode,
  db_delete: DbDeleteNode,
  db_sql: DbSqlNode,
  print_var: PrintVarNode,
};

const FlowEditor = forwardRef((props: FlowEditorProps, ref) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importJson, setImportJson] = useState('');
  const [phpDrawerOpen, setPhpDrawerOpen] = useState(false);
  const [subFlowEditing, setSubFlowEditing] = useState<string | null>(null); // null=主流程，否则为循环节点id

  // 获取当前流程节点和边
  const currentNodes = subFlowEditing
    ? (nodes.find(n => n.id === subFlowEditing)?.data?.subNodes || [])
    : nodes;
  const currentEdges = subFlowEditing
    ? (nodes.find(n => n.id === subFlowEditing)?.data?.subEdges || [])
    : edges;

  // 子流程节点/边操作
  const onSubNodesChange = (...args: any[]) => {
    setNodes(nds => nds.map(node => {
      if (node.id === subFlowEditing) {
        return {
          ...node,
          data: {
            ...node.data,
            subNodes: args[0],
          },
        };
      }
      return node;
    }));
  };
  const onSubEdgesChange = (...args: any[]) => {
    setNodes(nds => nds.map(node => {
      if (node.id === subFlowEditing) {
        return {
          ...node,
          data: {
            ...node.data,
            subEdges: args[0],
          },
        };
      }
      return node;
    }));
  };

  // 进入/返回循环体
  const enterLoopSubFlowRef = useRef<(id: string) => void>();
  enterLoopSubFlowRef.current = (loopNodeId: string) => setSubFlowEditing(loopNodeId);
  const exitSubFlow = () => setSubFlowEditing(null);

  // 添加指定类型节点
  const addNode = (type: string, label: string) => {
    // 限制只能有一个开始节点
    if (type === 'start' && nodes.some(n => n.type === 'start')) {
      message.warning('只能有一个开始节点');
      return;
    }
    const id = `${+new Date()}_${Math.random().toString(36).slice(2, 6)}`;
    const newNode: Node<ApiNodeData> = {
      id,
      type,
      position: { x: 300 + Math.random() * 100, y: 100 + Math.random() * 300 },
      data: { label, type },
    };
    setNodes((nds) => nds.concat(newNode));
    message.success(`已添加【${label}】节点，选中后 按 DELETE 删除`);
  };

  // 节点点击，右侧抽屉编辑
  const onNodeClick = (_: React.MouseEvent, node: Node<ApiNodeData>) => {
    console.log('onNodeClick-node', node);
    setSelectedNodeId(node.id);
    form.resetFields(); // 重置表单
    form.setFieldsValue(node.data);
    setDrawerOpen(true);
  };

  // 保存节点配置
  const handleDrawerOk = () => {
    form.validateFields().then((values) => {
      console.log('handleDrawerOk-values', values);
      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNodeId ? { ...node, data: { ...node.data, ...values } } : node
        )
      );
      setDrawerOpen(false);
    });
  };

  // 限制连线规则
  const isValidConnection = useCallback((connection: Connection) => {
    const sourceNode = nodes.find(n => n.id === connection.source);
    const targetNode = nodes.find(n => n.id === connection.target);
    if (!sourceNode || !targetNode) return false;
    if (targetNode.type === 'start') return false; // 开始节点不能有入边
    if (sourceNode.type === 'end') return false;   // 结束节点不能有出边
    if (sourceNode.type !== 'if') {
      // 除if外，最多只能有一个出边
      const outCount = edges.filter(e => e.source === sourceNode.id).length;
      if (outCount >= 1) return false;
    }
    return true;
  }, [nodes, edges]);

  // 连线时加箭头
  const onConnect = useCallback((params: Edge | Connection) => {
    setEdges((eds) => addEdge({ ...params, markerEnd: { type: MarkerType.ArrowClosed } }, eds));
  }, [setEdges]);

  // 导出json
  const exportJson = () => {
    const flow = reactFlowInstance?.toObject() || { nodes, edges };
    const json = JSON.stringify(flow, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'yesapi-flow.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // 导入json
  const handleImport = () => {
    try {
      const obj = JSON.parse(importJson);
      if (obj.nodes && obj.edges) {
        setNodes(obj.nodes);
        setEdges(obj.edges);
        setImportModalOpen(false);
        message.success('导入成功');
      } else {
        message.error('JSON格式不正确');
      }
    } catch {
      message.error('JSON解析失败');
    }
  };

  // 右侧抽屉内容
  const selectedNode = useMemo(() => nodes.find(n => n.id === selectedNodeId), [nodes, selectedNodeId]);

  // 每次切换节点时，重置表单并初始化默认值
  React.useEffect(() => {
    if (drawerOpen && selectedNode) {
      // 默认值处理：varType 默认为 string
    //   const initial = { ...selectedNode.data };
    //   if (selectedNode.type === 'var' && !initial.varType) {
    //     initial.varType = 'string';
    //   }
    //   form.setFieldsValue(initial);
    }
    // eslint-disable-next-line
  }, [drawerOpen, selectedNodeId]);

  const nodeTypesMemo = useMemo(() => ({
    ...nodeTypes,
    loop: (props: any) => <LoopNode {...props} onEnterSubFlow={id => enterLoopSubFlowRef.current?.(id)} />
  }), []);

  // 暴露方法给父组件
  useImperativeHandle(ref, () => ({
    getFlowData: () => {
      return reactFlowInstance?.toObject() || { nodes, edges };
    },
    generatePhpCode: () => {
      return PhpCodeEngine.generatePhpCode({ nodes, edges });
    },
    setFlowData: (json: any) => {
      if (json.nodes && json.edges) {
        setNodes(json.nodes);
        setEdges(json.edges);
      }
    }
  }));

  // 删除节点逻辑
  const deleteNodeById = (nodeId: string) => {
    setNodes(nds => nds.filter(n => n.id !== nodeId));
    setEdges(eds => eds.filter(e => e.source !== nodeId && e.target !== nodeId));
    setSelectedNodeId(null);
    message.success('节点已删除');
  };

  // 监听Delete键，弹窗确认
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 如果焦点在输入框、表单、可编辑区，不触发节点删除
      const tag = (e.target as HTMLElement).tagName;
      const editable = (e.target as HTMLElement).isContentEditable;
      if (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        editable
      ) {
        return;
      }
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedNodeId) {
        e.preventDefault();
        e.stopPropagation();
        const node = nodes.find(n => n.id === selectedNodeId);
        if (node) {
          Modal.confirm({
            title: `是否删除节点【${node.data?.label || ''}】？`,
            content: '删除后不可恢复',
            okText: '确认删除',
            cancelText: '取消',
            onOk: () => deleteNodeById(selectedNodeId),
          });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, [selectedNodeId, nodes]);

  return (
    <div style={{ width: '100vw', height: 'calc(100vh - 60px)', display: 'flex', background: '#f7f8fa' }}>
      {/* 左侧节点面板 */}
      <div style={{ width: 320, background: '#fff', borderRight: '1px solid #eee', padding: 12, overflowY: 'auto' }}>
        {NODE_TYPES.map(group => (
          <Card key={group.group} size="small" title={group.group} variant="outlined" style={{ marginBottom: 8 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {group.nodes.map(n => (
                <Tooltip title={n.label} key={n.type} placement="right">
                  <Button
                    type="default"
                    icon={n.icon}
                    style={{ width: '100%', textAlign: 'left', marginBottom: 0, height: 36, borderRadius: 6, border: '1px solid #eee', background: '#fafbfc' }}
                    onClick={() => addNode(n.type, n.label)}
                  >
                    {n.label}
                  </Button>
                </Tooltip>
              ))}
            </div>
          </Card>
        ))}
        <div style={{ marginBottom: 16 }}>
          {/* <Button v-if={false} type="primary" block onClick={() => addNode('api', 'API节点')} icon={<ApiOutlined />}>API节点</Button> */}
          <Button block style={{ marginTop: 8 }} onClick={() => setImportModalOpen(true)}>导入JSON</Button>
          <Button block style={{ marginTop: 8 }} onClick={exportJson}>导出JSON</Button>
          <Button type="primary" block style={{ marginTop: 8 }} onClick={() => setPhpDrawerOpen(true)}>预览接口代码</Button>
        </div>
      </div>
      {/* 右侧画布区 */}
      <div style={{ flex: 1, height: '100%', position: 'relative' }}>
        {subFlowEditing && (
          <Button onClick={exitSubFlow} style={{ position: 'absolute', zIndex: 10, left: 16, top: 16 }}>返回主流程</Button>
        )}
        <ReactFlow
          nodes={currentNodes}
          edges={currentEdges}
          onNodesChange={subFlowEditing ? onSubNodesChange : onNodesChange}
          onEdgesChange={subFlowEditing ? onSubEdgesChange : onEdgesChange}
          onConnect={onConnect}
          onInit={setReactFlowInstance}
          onNodeClick={onNodeClick}
          onEdgeClick={(_, edge) => setSelectedNodeId(null)}
          isValidConnection={isValidConnection}
          fitView
          nodeTypes={nodeTypesMemo}
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      {/* 右侧节点编辑抽屉 */}
      <Drawer
        title={selectedNode?.data.label || '节点配置'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={460}
        destroyOnClose
        footer={
          <Button type="primary" onClick={handleDrawerOk} block>保存</Button>
        }
      >
        <Form form={form} layout="vertical">
          {selectedNode?.type === 'var' && <VarNodeConfig />}
          {selectedNode?.type === 'if' && <IfNodeConfig />}
          {selectedNode?.type === 'api' && <ApiNodeConfig />}
          {selectedNode?.type === 'loop' && <LoopNodeConfig form={form} initialValues={selectedNode?.data} />}
          {selectedNode?.type === 'code' && <CodeNodeConfig />}
          {selectedNode?.type === 'db_add' && <DbAddNodeConfig />}
          {selectedNode?.type === 'db_update' && <DbUpdateNodeConfig />}
          {selectedNode?.type === 'db_query' && <DbQueryNodeConfig />}
          {selectedNode?.type === 'db_delete' && <DbDeleteNodeConfig />}
          {selectedNode?.type === 'db_sql' && <DbSqlNodeConfig />}
          {selectedNode?.type === 'end' && <EndNodeConfig form={form} />}
          {selectedNode?.type === 'start' && <StartNodeConfig />}
          {selectedNode?.type === 'print_var' && <PrintVarNodeConfig />}
        </Form>
      </Drawer>
      {/* 导入JSON弹窗 */}
      <Drawer
        title="导入JSON"
        open={importModalOpen}
        onClose={() => setImportModalOpen(false)}
        width={400}
        destroyOnClose
        footer={
          <Button type="primary" onClick={handleImport} block>导入</Button>
        }
      >
        <Input.TextArea
          rows={8}
          value={importJson}
          onChange={e => setImportJson(e.target.value)}
          placeholder="粘贴上次导出的JSON数据"
        />
      </Drawer>
      <Drawer
        title="PHP代码生成"
        open={phpDrawerOpen}
        onClose={() => setPhpDrawerOpen(false)}
        width={600}
        destroyOnClose
      >
        <PhpCodeEngine flowJson={{ nodes, edges }} />
      </Drawer>
    </div>
  );
});

export default FlowEditor; 