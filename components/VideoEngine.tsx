
import React, { useState, useEffect } from 'react';
import { generateVideo } from '../services/geminiService';
import GlassCard from './common/GlassCard';
import LoadingSpinner from './common/LoadingSpinner';
import PromptInput from './common/PromptInput';
import { ICONS } from '../constants';

const VidSynthesisEngine: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [isKeySelected, setIsKeySelected] = useState(false);
  const [checkingKey, setCheckingKey] = useState(true);

  useEffect(() => {
    const checkApiKey = async () => {
      if (window.aistudio && typeof window.aistudio.hasSelectedApiKey === 'function') {
        try {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          setIsKeySelected(hasKey);
        } catch (e) {
          console.error("Error checking API key:", e);
          setIsKeySelected(false);
        }
      } else {
        // Fallback for environments where aistudio is not available
        console.warn("aistudio not found. Assuming key is set via environment variable.");
        setIsKeySelected(true); 
      }
      setCheckingKey(false);
    };
    checkApiKey();
  }, []);

  const handleSelectKey = async () => {
    if (window.aistudio && typeof window.aistudio.openSelectKey === 'function') {
      await window.aistudio.openSelectKey();
      // Assume success to avoid race conditions and re-enable the UI
      setIsKeySelected(true);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError('');
    setVideoUrl(null);
    setStatus('Starting video generation...');
    
    try {
      const url = await generateVideo(prompt, setStatus);
      setVideoUrl(url);
    } catch (err: any) {
       let errorMessage = 'Failed to generate video. Please try again.';
       if (err.message && err.message.includes("Requested entity was not found")) {
            errorMessage = "API Key not found or invalid. Please select your key again.";
            setIsKeySelected(false);
       }
       setError(errorMessage);
       console.error(err);
    } finally {
      setIsLoading(false);
      setStatus('');
    }
  };

  const loadingMessages = [
    "Reticulating splines...",
    "Calibrating the cinematic universe...",
    "Directing AI actors...",
    "Rendering photonic streams...",
    "Compositing reality layers...",
    "Adjusting the quantum lens..."
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
      if (isLoading) {
          const interval = setInterval(() => {
              setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
          }, 3000);
          return () => clearInterval(interval);
      }
  }, [isLoading, loadingMessages.length]);

  if (checkingKey) {
    return <div className="flex items-center justify-center h-full"><LoadingSpinner message="Verifying API access..." /></div>;
  }

  if (!isKeySelected) {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <GlassCard className="p-8 max-w-lg">
                <h2 className="text-2xl font-orbitron text-amber-300 mb-4">API Key Required for Video Generation</h2>
                <p className="text-gray-400 mb-6">
                    The Veo video generation model requires you to select your own API key. This is a mandatory step to proceed.
                    Please ensure you have billing enabled for your project.
                </p>
                <button
                    onClick={handleSelectKey}
                    className="w-full px-6 py-3 bg-amber-500 text-black font-bold rounded-lg hover:bg-amber-400 transition-colors"
                >
                    Select API Key
                </button>
                <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noopener noreferrer" className="block mt-4 text-sm text-amber-400 hover:underline">
                    Learn more about billing
                </a>
            </GlassCard>
        </div>
    );
  }

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <header className="flex-shrink-0 pb-4">
        <h2 className="text-3xl font-orbitron font-bold text-amber-300">VidSynthesis Engine</h2>
        <p className="text-gray-400">Bring your stories to life with cinematic AI video.</p>
      </header>

      <GlassCard className="flex-grow flex items-center justify-center p-4">
        <div className="w-full h-full relative flex items-center justify-center">
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-10 rounded-lg text-center p-4">
              <LoadingSpinner />
              <p className="mt-4 text-amber-300 font-orbitron text-lg">{loadingMessages[currentMessageIndex]}</p>
              <p className="mt-2 text-sm text-gray-300 max-w-md">{status}</p>
            </div>
          )}
          {!videoUrl && !isLoading && (
            <div className="text-center text-gray-500">
               <ICONS.Video className="mx-auto h-24 w-24" />
               <p>Your generated video will appear here</p>
            </div>
          )}
          {videoUrl && (
            <video src={videoUrl} controls autoPlay loop className="max-w-full max-h-full object-contain rounded-lg" />
          )}
        </div>
      </GlassCard>

      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      <PromptInput
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onSubmit={handleGenerate}
        isLoading={isLoading}
        placeholder="e.g., A neon hologram of a cat driving a futuristic car at top speed"
      />
    </div>
  );
};

export default VidSynthesisEngine;
