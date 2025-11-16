
import React, { useState, useCallback } from 'react';
import { generateImage, editImage, fileToBase64 } from '../services/geminiService';
import GlassCard from './common/GlassCard';
import LoadingSpinner from './common/LoadingSpinner';
import PromptInput from './common/PromptInput';
import { ICONS } from '../constants';

const ImagenStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState<'generate' | 'edit'>('generate');

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setGeneratedImage(null); // Clear generated image when uploading a new one
        setMode('edit');
      };
      reader.readAsDataURL(file);
    }
  }, []);
  
  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      if (mode === 'edit' && uploadedFile && uploadedImage) {
        const base64Data = await fileToBase64(uploadedFile);
        const result = await editImage(prompt, base64Data, uploadedFile.type);
        setGeneratedImage(result);
      } else {
        const result = await generateImage(prompt);
        setGeneratedImage(result);
        setUploadedImage(null);
        setUploadedFile(null);
      }
    } catch (err) {
      setError('Failed to process image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="h-full flex flex-col animate-fade-in">
      <header className="flex-shrink-0 pb-4">
        <h2 className="text-3xl font-orbitron font-bold text-amber-300">Imagen Studio</h2>
        <p className="text-gray-400">Generate and edit high-fidelity visuals with AI.</p>
      </header>

      <div className="flex-grow flex flex-col md:flex-row gap-4 overflow-hidden">
        {/* Control Panel */}
        <GlassCard className="w-full md:w-1/3 flex-shrink-0 p-6 flex flex-col">
          <h3 className="font-orbitron text-lg text-amber-300 mb-4">Controls</h3>
          <div className="flex space-x-2 mb-4 p-1 bg-black/20 rounded-lg border border-amber-400/10">
            <button onClick={() => setMode('generate')} className={`w-full py-2 rounded-md text-sm transition-colors ${mode === 'generate' ? 'bg-amber-500/20 text-amber-300' : 'text-gray-400 hover:bg-amber-500/10'}`}>Generate</button>
            <button onClick={() => setMode('edit')} className={`w-full py-2 rounded-md text-sm transition-colors ${mode === 'edit' ? 'bg-amber-500/20 text-amber-300' : 'text-gray-400 hover:bg-amber-500/10'}`}>Edit</button>
          </div>

          {mode === 'edit' && (
            <div className="mb-4">
                <label htmlFor="image-upload" className="block text-sm font-medium text-gray-300 mb-2">Upload Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-amber-400/20 border-dashed rounded-md cursor-pointer hover:bg-amber-500/5">
                    <div className="space-y-1 text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <div className="flex text-sm text-gray-400"><p className="pl-1">Click to upload or drag and drop</p></div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                    <input id="image-upload" name="image-upload" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                </div>
            </div>
          )}
          {/* Mock controls */}
          <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-300">Style</label>
                <select className="mt-1 block w-full pl-3 pr-10 py-2 bg-gray-900/50 border border-amber-400/20 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm">
                    <option>Cinematic</option>
                    <option>Photorealistic</option>
                    <option>Anime</option>
                    <option>Futuristic</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300">Aspect Ratio</label>
                 <select className="mt-1 block w-full pl-3 pr-10 py-2 bg-gray-900/50 border border-amber-400/20 rounded-md focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm">
                    <option>1:1 (Square)</option>
                    <option>16:9 (Widescreen)</option>
                    <option>9:16 (Portrait)</option>
                </select>
            </div>
          </div>
        </GlassCard>

        {/* Image Display */}
        <GlassCard className="flex-grow flex items-center justify-center p-4">
          <div className="w-full h-full relative flex items-center justify-center">
            {isLoading && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                <LoadingSpinner message="Conjuring pixels..." />
              </div>
            )}
            {!generatedImage && !uploadedImage && (
              <div className="text-center text-gray-500">
                <ICONS.Image className="mx-auto h-24 w-24" />
                <p>Your creation will appear here</p>
              </div>
            )}
            {generatedImage && <img src={generatedImage} alt="Generated" className="max-w-full max-h-full object-contain rounded-lg" />}
            {!generatedImage && uploadedImage && <img src={uploadedImage} alt="Uploaded" className="max-w-full max-h-full object-contain rounded-lg" />}
          </div>
        </GlassCard>
      </div>

       {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      <PromptInput
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        placeholder={mode === 'edit' ? "Describe your edit..." : "Describe the image you want to create..."}
      />
    </div>
  );
};

export default ImagenStudio;
