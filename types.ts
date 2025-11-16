
import React from 'react';

export enum Tool {
  Dashboard = 'Dashboard',
  CodeForge = 'Code Forge',
  ImagenStudio = 'Imagen Studio',
  VidSynthesisEngine = 'VidSynthesis Engine',
  FlowAutomate = 'Flow Automate',
  AgentNexus = 'Agent Nexus',
  OmniChat = 'Omni-Chat',
}

export interface ToolDefinition {
  id: Tool;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface FileTreeNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileTreeNode[];
}

export interface AutomationNode {
    id: string;
    type: string;
    label: string;
    position: { x: number; y: number };
}
