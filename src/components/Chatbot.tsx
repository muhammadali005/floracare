import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Zap, 
  Microscope, 
  Leaf, 
  RotateCcw, 
  Copy, 
  Check, 
  X,
  HelpCircle
} from 'lucide-react';
import { ChatMessage, ChatRoleMode, PlantCareAnalysis } from '../types/plant';

interface ChatbotProps {
  plantContext: PlantCareAnalysis | null;
  onClearPlantContext: () => void;
  initialQuestion?: string;
}

export const Chatbot: React.FC<ChatbotProps> = ({
  plantContext,
  onClearPlantContext,
  initialQuestion,
}) => {
  const [roleMode, setRoleMode] = useState<ChatRoleMode>('general');
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome',
      role: 'model',
      text: plantContext 
        ? `Hello fellow plant lover! I see you are inspecting your **${plantContext.plantName}** (*${plantContext.botanicalName}*). How can I assist you with its care, light, or health today?`
        : `Welcome to FloraCare Botanical Chat! I'm your AI gardening advisor. Ask me anything about houseplant diagnostics, watering schedules, pest treatments, or garden design.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.8-flash',
      roleMode: 'general',
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isSending]);

  // Handle incoming initial question if passed from CareMatrix
  useEffect(() => {
    if (initialQuestion && initialQuestion.trim().length > 0) {
      sendMessage(initialQuestion);
    }
  }, [initialQuestion]);

  const sendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isSending) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputText('');
    setIsSending(true);

    try {
      // Send entire history for true multi-turn context
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
          roleMode,
          plantContext: plantContext || null,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to get bot response.');
      }

      const botMsg: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: data.modelUsed,
        roleMode,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `*Notice: I encountered an issue reaching the botanical engine (${err.message || 'Server error'}). Please try again.*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'system',
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputText);
    }
  };

  const handleCopy = (id: string, text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        navigator.clipboard
          .writeText(text)
          .then(() => {
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
          })
          .catch((err) => console.warn('Clipboard write prevented:', err));
      }
    } catch (err) {
      console.warn('Clipboard error:', err);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: 'Botanical chat session reset. What plant questions can I answer for you?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: 'gemini-3.8-flash',
        roleMode,
      },
    ]);
  };

  // Simple Markdown-like formatter for bold, italic, code, bullets
  const renderFormattedText = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, idx) => {
      // Bullet list item
      if (line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
        const content = line.trim().substring(2);
        return (
          <li key={idx} className="ml-4 list-disc text-stone-800 leading-relaxed my-0.5">
            {formatInlineText(content)}
          </li>
        );
      }
      // Numbered list item
      const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
      if (numMatch) {
        return (
          <li key={idx} className="ml-4 list-decimal text-stone-800 leading-relaxed my-0.5">
            {formatInlineText(numMatch[2])}
          </li>
        );
      }
      // Header ## or ###
      if (line.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-stone-900 text-sm mt-2 mb-1">
            {formatInlineText(line.substring(4))}
          </h4>
        );
      }
      if (line.startsWith('## ')) {
        return (
          <h3 key={idx} className="font-bold text-emerald-950 font-serif text-base mt-3 mb-1">
            {formatInlineText(line.substring(3))}
          </h3>
        );
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-1.5" />;
      }
      // Normal paragraph
      return (
        <p key={idx} className="leading-relaxed text-stone-800 my-1">
          {formatInlineText(line)}
        </p>
      );
    });
  };

  // Helper for **bold** and *italic*
  const formatInlineText = (text: string) => {
    // Regex splits into tokens
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-stone-900">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={i} className="italic text-stone-700">{part.slice(1, -1)}</em>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code key={i} className="bg-stone-100 text-emerald-900 text-[11px] px-1 py-0.5 rounded font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  // Suggested prompts
  const samplePrompts = [
    'How do I treat yellow leaves on houseplants?',
    'What is the ideal soil mix for aroids and monsteras?',
    'How often should I fertilize during winter dormancy?',
    'Which common plants are toxic to cats and dogs?',
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      {/* Role / Model Switcher Bar */}
      <div className="bg-white rounded-2xl p-4 border border-emerald-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block">
            Select Botanical Specialist & Engine:
          </span>
          <p className="text-xs text-stone-400">
            Tailored AI role & Gemini model suited for your task complexity
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {/* Complex: gemini-4-argon */}
          <button
            onClick={() => setRoleMode('complex')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left border ${
              roleMode === 'complex'
                ? 'bg-purple-50 text-purple-900 border-purple-300 ring-2 ring-purple-200'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Microscope className="w-4 h-4 text-purple-600 shrink-0" />
            <div>
              <p className="font-bold">Pathologist</p>
              <p className="text-[10px] text-purple-700 font-mono">gemini-4-argon</p>
            </div>
          </button>

          {/* General: gemini-3.8-flash */}
          <button
            onClick={() => setRoleMode('general')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left border ${
              roleMode === 'general'
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300 ring-2 ring-emerald-200'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold">Garden Companion</p>
              <p className="text-[10px] text-emerald-700 font-mono">gemini-3.8-flash</p>
            </div>
          </button>

          {/* Fast: gemini-3.1-flash-lite */}
          <button
            onClick={() => setRoleMode('fast')}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all text-left border ${
              roleMode === 'fast'
                ? 'bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-200'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
            }`}
          >
            <Zap className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <p className="font-bold">Quick Dispatch</p>
              <p className="text-[10px] text-amber-700 font-mono">gemini-3.1-flash-lite</p>
            </div>
          </button>
        </div>
      </div>

      {/* Active Plant Context Banner */}
      {plantContext && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2.5 flex items-center justify-between text-xs text-emerald-900">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Active Focus: <strong>{plantContext.plantName}</strong> ({plantContext.botanicalName})
            </span>
            <span className="text-[11px] text-emerald-700 hidden sm:inline">
              — Responses will automatically personalize for this specimen.
            </span>
          </div>
          <button
            onClick={onClearPlantContext}
            className="text-emerald-700 hover:text-emerald-950 font-semibold flex items-center gap-1 ml-2"
          >
            <X className="w-3.5 h-3.5" />
            Clear Focus
          </button>
        </div>
      )}

      {/* Chat Thread Container */}
      <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm flex flex-col h-[600px] overflow-hidden">
        {/* Chat Header */}
        <div className="px-6 py-3.5 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-stone-900 text-sm">
                FloraCare Botanical Intelligence
              </h3>
              <p className="text-[11px] text-stone-500">
                Multi-turn conversation history preserved
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClearHistory}
              title="Reset conversation"
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 text-xs flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Chat</span>
            </button>
          </div>
        </div>

        {/* Scrollable Messages Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((message) => {
            const isUser = message.role === 'user';
            return (
              <div
                key={message.id}
                className={`flex gap-3 max-w-3xl ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold shadow-xs ${
                    isUser
                      ? 'bg-stone-800 text-white'
                      : 'bg-emerald-600 text-white'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`group relative rounded-2xl px-4 py-3 text-sm transition-all ${
                    isUser
                      ? 'bg-emerald-700 text-white rounded-tr-xs shadow-xs'
                      : 'bg-stone-50 text-stone-800 border border-stone-200/70 rounded-tl-xs shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-1">
                    <span className="text-[10px] font-semibold opacity-75">
                      {isUser ? 'You' : 'FloraCare Botanist'}
                    </span>
                    <div className="flex items-center gap-2">
                      {message.modelUsed && !isUser && (
                        <span className="text-[9px] font-mono bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                          {message.modelUsed}
                        </span>
                      )}
                      <span className="text-[10px] opacity-60">{message.timestamp}</span>
                    </div>
                  </div>

                  {/* Message Content */}
                  <div className="text-xs sm:text-sm">
                    {isUser ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{message.text}</p>
                    ) : (
                      renderFormattedText(message.text)
                    )}
                  </div>

                  {/* Copy Button */}
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(message.id, message.text)}
                      className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 p-1 rounded bg-white/80 hover:bg-white text-stone-500 shadow-xs transition-opacity"
                      title="Copy response"
                    >
                      {copiedId === message.id ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isSending && (
            <div className="flex gap-3 mr-auto max-w-xl animate-pulse">
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-stone-50 border border-stone-200 rounded-2xl rounded-tl-xs px-4 py-3 text-xs text-stone-500 flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                </div>
                <span>
                  Consulting botanical model{' '}
                  <strong className="text-stone-700">
                    {roleMode === 'complex' ? 'gemini-4-argon' : roleMode === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash'}
                  </strong>...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Prompt Chips Bar */}
        <div className="px-4 py-2 border-t border-stone-100 bg-stone-50/50 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[11px] font-bold text-stone-400 shrink-0 flex items-center gap-1">
            <HelpCircle className="w-3 h-3" /> Quick Prompts:
          </span>
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(p)}
              disabled={isSending}
              className="text-[11px] whitespace-nowrap bg-white hover:bg-emerald-50 text-stone-700 hover:text-emerald-900 border border-stone-200 px-2.5 py-1 rounded-full transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="p-3 sm:p-4 border-t border-stone-200 bg-white">
          <div className="flex items-center gap-2">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Ask a gardening question (Shift+Enter for new line)...`}
              rows={1}
              className="flex-1 text-xs sm:text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none max-h-32"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isSending}
              className={`p-3 rounded-xl text-white font-medium transition-all shrink-0 ${
                !inputText.trim() || isSending
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/20'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
