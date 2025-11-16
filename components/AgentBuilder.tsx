
import React from 'react';
import GlassCard from './common/GlassCard';

const AgentNexus: React.FC = () => {
  const tools = ['Web Search', 'Code Execution', 'File System Access', 'API Interaction'];
  const activeAgents = [
    { name: 'ResearchAgent-01', status: 'Active', task: 'Monitoring tech news for AI breakthroughs.' },
    { name: 'CodeOptimizer-Alpha', status: 'Active', task: 'Refactoring legacy codebase in /src/utils.' },
    { name: 'UserFeedback-Bot', status: 'Idle', task: 'Awaiting new feedback entries.' },
  ];

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <header className="flex-shrink-0 pb-4">
        <h2 className="text-3xl font-orbitron font-bold text-amber-300">Agent Nexus</h2>
        <p className="text-gray-400">Design, deploy, and manage autonomous agents to work for you.</p>
      </header>

      <div className="flex-grow flex flex-col lg:flex-row gap-4 overflow-hidden">
        {/* Agent Creator */}
        <GlassCard className="w-full lg:w-1/3 flex-shrink-0 p-6 flex flex-col">
          <h3 className="font-orbitron text-lg text-amber-300 mb-4">Create New Agent</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="agent-name" className="block text-sm font-medium text-gray-300">Agent Name</label>
              <input type="text" id="agent-name" placeholder="e.g., MarketAnalysisAgent" className="mt-1 block w-full bg-gray-900/50 border border-amber-400/20 rounded-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm p-2" />
            </div>
            <div>
              <label htmlFor="agent-goal" className="block text-sm font-medium text-gray-300">Primary Goal</label>
              <textarea id="agent-goal" rows={3} placeholder="Describe the agent's main objective..." className="mt-1 block w-full bg-gray-900/50 border border-amber-400/20 rounded-md focus:ring-amber-500 focus:border-amber-500 sm:text-sm p-2 resize-none"></textarea>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">Tools & Capabilities</h4>
              <div className="grid grid-cols-2 gap-2">
                {tools.map(tool => (
                  <label key={tool} className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="h-4 w-4 rounded bg-gray-700 border-gray-600 text-amber-500 focus:ring-amber-500" />
                    <span>{tool}</span>
                  </label>
                ))}
              </div>
            </div>
             <button type="submit" onClick={(e)=>e.preventDefault()} className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-amber-500 hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 focus:ring-offset-gray-900">
                Deploy Agent
            </button>
          </form>
        </GlassCard>

        {/* Agent Status */}
        <GlassCard className="flex-grow p-6 flex flex-col">
           <h3 className="font-orbitron text-lg text-amber-300 mb-4">Agent Marketplace & Management</h3>
           <div className="flex-grow overflow-y-auto pr-2">
                <div className="space-y-4">
                    {activeAgents.map(agent => (
                        <div key={agent.name} className="p-4 bg-black/20 rounded-lg border border-amber-400/10">
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-amber-300">{agent.name}</p>
                                <span className={`px-2 py-1 text-xs rounded-full ${agent.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-gray-500/20 text-gray-300'}`}>
                                    {agent.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 mt-2"><span className="font-semibold text-gray-300">Current Task:</span> {agent.task}</p>
                        </div>
                    ))}
                </div>
           </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AgentNexus;
