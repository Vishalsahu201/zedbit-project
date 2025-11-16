
import React from 'react';
import GlassCard from './common/GlassCard';
import { AutomationNode } from '../types';

const nodes: AutomationNode[] = [
    { id: '1', type: 'trigger', label: 'Webhook Trigger', position: { x: 50, y: 150 } },
    { id: '2', type: 'action', label: 'Call Gemini API', position: { x: 300, y: 100 } },
    { id: '3', type: 'action', label: 'Scrape Website', position: { x: 300, y: 250 } },
    { id: '4', type: 'logic', label: 'Format Data', position: { x: 550, y: 175 } },
    { id: '5', type: 'action', label: 'Send Email', position: { x: 800, y: 175 } },
];

const NodeComponent: React.FC<{ node: AutomationNode }> = ({ node }) => (
    <div className="absolute px-4 py-2 bg-gray-800 border-2 border-amber-400/30 rounded-lg shadow-lg" style={{ left: node.position.x, top: node.position.y }}>
        <p className="font-bold text-amber-300 text-sm">{node.label}</p>
        <span className="text-xs text-gray-400">{node.type}</span>
    </div>
);

const FlowAutomate: React.FC = () => {
    return (
        <div className="h-full flex flex-col animate-fade-in">
            <header className="flex-shrink-0 pb-4">
                <h2 className="text-3xl font-orbitron font-bold text-amber-300">Flow Automate</h2>
                <p className="text-gray-400">Visually design and deploy complex, automated workflows.</p>
            </header>

            <div className="flex-grow flex gap-4 overflow-hidden">
                <GlassCard className="w-1/4 flex-shrink-0 p-4">
                    <h3 className="font-orbitron text-lg text-amber-300 mb-4">Nodes</h3>
                    <div className="space-y-2">
                        {['Trigger', 'API Call', 'Webhook', 'Scraper', 'Database', 'Email', 'Cron Job'].map(node => (
                            <div key={node} className="p-2 bg-black/30 border border-amber-400/10 rounded-md text-sm cursor-grab">
                                {node}
                            </div>
                        ))}
                    </div>
                </GlassCard>

                <GlassCard className="flex-grow p-4 relative overflow-hidden">
                    {/* Background Grid */}
                    <div className="absolute inset-0 z-0">
                         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="smallGrid" width="8" height="8" patternUnits="userSpaceOnUse">
                                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="rgba(245, 158, 11, 0.05)" strokeWidth="0.5"/>
                                </pattern>
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <rect width="40" height="40" fill="url(#smallGrid)"/>
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245, 158, 11, 0.1)" strokeWidth="1"/>
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#grid)" />
                        </svg>
                    </div>

                    {/* Mocked nodes and connections */}
                    <div className="relative w-full h-full">
                        {/* Connections */}
                         <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                            <path d="M 160 175 C 230 175, 230 125, 300 125" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="5 5" />
                            <path d="M 160 175 C 230 175, 230 275, 300 275" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="5 5" />
                            <path d="M 460 125 C 505 125, 505 200, 550 200" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="5 5" />
                            <path d="M 460 275 C 505 275, 505 200, 550 200" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="5 5" />
                            <path d="M 700 200 L 800 200" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="5 5" />
                        </svg>
                        {nodes.map(node => <NodeComponent key={node.id} node={node} />)}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default FlowAutomate;
