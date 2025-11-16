
import React, { useState, useRef, useEffect } from 'react';
import { startChat, sendMessage } from '../services/geminiService';
import { Chat as ChatInstance } from '@google/genai';
import GlassCard from './common/GlassCard';
import PromptInput from './common/PromptInput';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const OmniChat: React.FC = () => {
  const [chat, setChat] = useState<ChatInstance | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "I am MAI's core intelligence. How can I assist you in your creation?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setChat(startChat());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chat) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiResponseText = await sendMessage(chat, input);
    const aiMessage: Message = { sender: 'ai', text: aiResponseText };
    setMessages(prev => [...prev, aiMessage]);
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col animate-fade-in">
      <header className="flex-shrink-0 pb-4">
        <h2 className="text-3xl font-orbitron font-bold text-amber-300">Omni-Chat</h2>
        <p className="text-gray-400">Converse with MAI's supremely intelligent core AI.</p>
      </header>
      
      <GlassCard className="flex-grow flex flex-col overflow-hidden p-4">
        <div className="flex-grow overflow-y-auto pr-4 space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && (
                     <div className="w-8 h-8 flex-shrink-0 rounded-full bg-amber-500/20 text-amber-300 font-orbitron flex items-center justify-center font-bold">M</div>
                )}
                 <div className={`max-w-xl p-4 rounded-xl ${msg.sender === 'user' ? 'bg-amber-500/10 text-amber-200 rounded-br-none' : 'bg-gray-800/50 text-gray-200 rounded-bl-none'}`}>
                   <p className="whitespace-pre-wrap">{msg.text}</p>
                 </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <div className="w-8 h-8 flex-shrink-0 rounded-full bg-amber-500/20 text-amber-300 font-orbitron flex items-center justify-center font-bold">M</div>
              <div className="max-w-xl p-4 rounded-xl bg-gray-800/50 text-gray-200 rounded-bl-none flex items-center space-x-2">
                <span className="w-2 h-2 bg-amber-300 rounded-full animate-pulse delay-0"></span>
                <span className="w-2 h-2 bg-amber-300 rounded-full animate-pulse delay-150"></span>
                <span className="w-2 h-2 bg-amber-300 rounded-full animate-pulse delay-300"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </GlassCard>

      <PromptInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onSubmit={handleSend}
        isLoading={isLoading}
        placeholder="Ask me anything or give me a command..."
      />
    </div>
  );
};

export default OmniChat;
