
import React, { useState } from 'react';
import { generateCode } from '../services/geminiService';
import { FileTreeNode } from '../types';
import GlassCard from './common/GlassCard';
import LoadingSpinner from './common/LoadingSpinner';
import PromptInput from './common/PromptInput';

const FileExplorer: React.FC<{ files: FileTreeNode[] }> = ({ files }) => (
  <div className="p-4">
    <h3 className="text-amber-300 font-orbitron text-sm mb-3">FILE EXPLORER</h3>
    <ul>
      {files.map(file => (
        <li key={file.name} className="flex items-center text-sm text-gray-300 mb-2">
          {file.type === 'folder' ? '📁' : '📄'}
          <span className="ml-2">{file.name}</span>
        </li>
      ))}
    </ul>
  </div>
);

const CodeForge: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [code, setCode] = useState('// Your generated code will appear here.\n// Example: "Create a simple React counter component."');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mockFiles: FileTreeNode[] = [
    { name: 'public', type: 'folder' },
    { name: 'src', type: 'folder' },
    { name: 'index.html', type: 'file' },
    { name: 'App.tsx', type: 'file' },
    { name: 'package.json', type: 'file' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      const generatedCode = await generateCode(prompt);
      setCode(generatedCode);
    } catch (err) {
      setError('Failed to generate code. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <header className="flex-shrink-0 pb-4">
        <h2 className="text-3xl font-orbitron font-bold text-amber-300">Code Forge</h2>
        <p className="text-gray-400">A full, cloud-based IDE accessible via prompt to build anything.</p>
      </header>
      
      <div className="flex-grow flex flex-col lg:flex-row gap-4 overflow-hidden">
        <GlassCard className="w-full lg:w-1/4 flex-shrink-0 overflow-y-auto">
          <FileExplorer files={mockFiles} />
        </GlassCard>

        <div className="flex-grow flex flex-col gap-4 overflow-hidden">
            <GlassCard className="flex-grow flex flex-col overflow-hidden">
                <div className="p-2 bg-black/20 border-b border-amber-400/10">
                    <span className="text-sm text-gray-400">Editor</span>
                </div>
                 <div className="relative flex-grow">
                    {isLoading && (
                        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10">
                            <LoadingSpinner message="Generating Code..." />
                        </div>
                    )}
                    <textarea
                        readOnly
                        value={code}
                        className="w-full h-full p-4 bg-transparent text-gray-200 font-mono text-sm resize-none outline-none"
                    />
                </div>
            </GlassCard>
            <GlassCard className="h-1/3 flex flex-col overflow-hidden">
                <div className="p-2 bg-black/20 border-b border-amber-400/10">
                    <span className="text-sm text-gray-400">Terminal / Preview</span>
                </div>
                <div className="p-4 font-mono text-sm text-gray-400">
                    <p>&gt; MAI Terminal Initialized.</p>
                    <p>&gt; Ready for commands.</p>
                </div>
            </GlassCard>
        </div>
      </div>
       {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      <PromptInput 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onSubmit={handleGenerate}
        isLoading={isLoading}
        placeholder="e.g., A login form with validation using React and Tailwind CSS"
      />
    </div>
  );
};

export default CodeForge;
