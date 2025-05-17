export interface ApiFlowVisualizerProps {
  container: HTMLElement;
  initialData?: any;
  onSave?: (json: any) => void;
  onGenerateCode?: (code: string) => void;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
}

export interface FlowEditorProps {
  initialData?: any;
  onSave?: (json: any) => void;
  onGenerateCode?: (code: string) => void;
  readOnly?: boolean;
  theme?: 'light' | 'dark';
} 