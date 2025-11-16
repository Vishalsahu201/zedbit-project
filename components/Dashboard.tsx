
import React from 'react';
import { Tool } from '../types';
import { TOOLS } from '../constants';
import GlassCard from './common/GlassCard';

interface DashboardProps {
  setActiveTool: (tool: Tool) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveTool }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center animate-fade-in">
      <h1 className="text-5xl md:text-7xl font-orbitron font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-4">
        MAI
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl">
        The Agentic AI Ecosystem.
        <br />
        A unified platform to build, create, and automate at the speed of thought.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {TOOLS.map((tool) => (
          <GlassCard
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className="p-6 text-left hover:border-amber-400/50 hover:scale-105 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] cursor-pointer group"
          >
            <div className="flex items-center mb-4">
              <div className="p-3 bg-amber-500/10 rounded-lg mr-4 group-hover:bg-amber-500/20 transition-colors">
                <tool.icon className="h-6 w-6 text-amber-300" />
              </div>
              <h3 className="text-xl font-bold font-orbitron text-amber-300">{tool.name}</h3>
            </div>
            <p className="text-gray-400 group-hover:text-gray-300 transition-colors">{tool.description}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
