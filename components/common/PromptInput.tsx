
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  isLoading: boolean;
  placeholder: string;
}

const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, onSubmit, isLoading, placeholder }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 p-4 bg-black/30 backdrop-blur-sm mt-auto">
      <div className="relative w-full max-w-4xl mx-auto">
        <textarea
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          placeholder={placeholder}
          rows={1}
          className="w-full bg-gray-900/50 border border-amber-400/20 rounded-xl py-3 pl-4 pr-16 text-gray-200 resize-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-300 placeholder:text-gray-500 overflow-y-auto max-h-40"
        />
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-amber-500 text-black disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-amber-400 transition-all duration-300 group"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
          ) : (
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 transform group-hover:scale-110 transition-transform">
                <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086L2.279 16.76a.75.75 0 00.95.826l14.5-4.25a.75.75 0 000-1.352L3.105 2.289z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptInput;
