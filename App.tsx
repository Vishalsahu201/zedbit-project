
import React, { useState } from 'react';
import { Tool } from './types';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import CodeForge from './components/CodeStudio';
import ImagenStudio from './components/ImageLab';
import VidSynthesisEngine from './components/VideoEngine';
import FlowAutomate from './components/AutomationLab';
import AgentNexus from './components/AgentBuilder';
import OmniChat from './components/Chat';

const App: React.FC = () => {
  const [activeTool, setActiveTool] = useState<Tool>(Tool.Dashboard);

  const renderActiveTool = () => {
    switch (activeTool) {
      case Tool.Dashboard:
        return <Dashboard setActiveTool={setActiveTool} />;
      case Tool.CodeForge:
        return <CodeForge />;
      case Tool.ImagenStudio:
        return <ImagenStudio />;
      case Tool.VidSynthesisEngine:
        return <VidSynthesisEngine />;
      case Tool.FlowAutomate:
        return <FlowAutomate />;
      case Tool.AgentNexus:
        return <AgentNexus />;
      case Tool.OmniChat:
        return <OmniChat />;
      default:
        return <Dashboard setActiveTool={setActiveTool} />;
    }
  };

  return (
    <div className="bg-black text-gray-200 min-h-screen flex selection:bg-amber-500/30 selection:text-amber-300">
      <div className="fixed inset-0 w-full h-full bg-black -z-10">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(245,158,11,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(249,115,22,0.1),rgba(255,255,255,0))]"></div>
      </div>

      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="flex-1 ml-20 p-4 sm:p-6 lg:p-8 overflow-auto h-screen">
        {renderActiveTool()}
      </main>
    </div>
  );
};

export default App;
