
import React from 'react';
import { Tool } from '../types';
import { TOOLS, ICONS } from '../constants';

interface SidebarProps {
  activeTool: Tool;
  setActiveTool: (tool: Tool) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, setActiveTool }) => {
    const navItems = [{ id: Tool.Dashboard, name: 'Dashboard', icon: ICONS.Home }, ...TOOLS];

  return (
    <nav className="fixed top-0 left-0 h-full w-20 bg-black/30 backdrop-blur-lg border-r border-amber-400/10 flex flex-col items-center py-6 z-50">
      <div className="font-orbitron font-bold text-2xl text-amber-300 cursor-pointer" onClick={() => setActiveTool(Tool.Dashboard)}>
        M
      </div>
      <ul className="flex flex-col items-center space-y-4 mt-12">
        {navItems.map((tool) => (
          <li key={tool.id}>
            <button
              onClick={() => setActiveTool(tool.id)}
              className={`relative flex items-center justify-center h-12 w-12 rounded-lg transition-all duration-300 group ${
                activeTool === tool.id
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'text-gray-400 hover:bg-amber-500/10 hover:text-amber-300'
              }`}
            >
              <tool.icon className="h-6 w-6" />
              {activeTool === tool.id && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 bg-amber-400 rounded-r-full shadow-[0_0_10px_#f59e0b]"></div>
              )}
               <span className="absolute left-full ml-4 w-max px-2 py-1 bg-gray-900 border border-amber-400/20 text-amber-300 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                {tool.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
