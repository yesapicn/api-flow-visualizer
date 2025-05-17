import React, { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import FlowEditor from './FlowEditor';
import type { ApiFlowVisualizerProps } from '../types';

class ApiFlowVisualizer {
  private container: HTMLElement;
  private root: ReturnType<typeof createRoot> | null = null;
  private props: ApiFlowVisualizerProps;
  private flowEditorRef: React.RefObject<any> = React.createRef();

  constructor(props: ApiFlowVisualizerProps) {
    this.container = props.container;
    this.props = props;
    this.init();
  }

  private init() {
    this.root = createRoot(this.container);
    this.render();
  }

  private render() {
    if (!this.root) return;
    
    this.root.render(
      <FlowEditor
        ref={this.flowEditorRef}
        initialData={this.props.initialData}
        onSave={this.props.onSave}
        onGenerateCode={this.props.onGenerateCode}
        readOnly={this.props.readOnly}
        theme={this.props.theme}
      />
    );
  }

  public getJson() {
    // 获取当前流程的 JSON 数据
    const flow = this.flowEditorRef.current?.getFlowData();
    return flow || {};
  }

  public generatePhpCode() {
    // 生成 PHP 代码
    return this.flowEditorRef.current?.generatePhpCode() || '';
  }

  public setData(json: any) {
    // 设置流程数据
    if (this.flowEditorRef.current) {
      this.flowEditorRef.current.setFlowData(json);
    }
  }

  public destroy() {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

export default ApiFlowVisualizer; 