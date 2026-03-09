'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, X, Bot } from 'lucide-react';

export default function AstroChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);

  // Función para limpiar completamente el chat
  const clearChat = () => {
    setMessages([]);
    setInput('');
    setIsFirstMessage(true);
  };

  // Manejar cierre del chat - limpiar conversación
  const handleClose = () => {
    setIsOpen(false);
    // Limpiar después de la animación de cierre
    setTimeout(() => {
      clearChat();
    }, 300);
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, isFirstMessage })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        setIsFirstMessage(false);
      } else {
        throw new Error(data.message || 'Error en la respuesta del servidor');
      }
    } catch (error) {
      console.error('Error en AstroChat:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Lo siento, tuve un problema al conectar con mi cerebro artificial. Por favor, intenta de nuevo en unos momentos o contáctanos por WhatsApp. 🙏'
      }]);
    } finally {
      setLoading(false);
    }
  };

  const quickOptions = [
    '¿Qué es Atomy?',
    '¿Cómo gano dinero?',
    '¿Cuáles son los productos?',
    '¿Cómo obtengo mi membresía?'
  ];

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center z-50 transition-all duration-500 ${isOpen
          ? 'bg-slate-700 rotate-0'
          : 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:scale-110 hover:rotate-12'
          }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <Bot className="w-7 h-7 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-48px)] bg-white rounded-3xl shadow-2xl z-40 overflow-hidden transition-all duration-500 ${isOpen
        ? 'opacity-100 translate-y-0 pointer-events-auto'
        : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar de Astro */}
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src="/astro-icon.png"
                alt="Astro"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-lg">Astro</h4>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                <p className="text-xs text-white/90">Consultor Atomy</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* Botón limpiar chat */}
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                title="Limpiar conversación"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-50 to-white">
          {messages.length === 0 ? (
            <div className="text-center py-6">
              {/* Avatar grande */}
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-100 to-teal-100 flex items-center justify-center shadow-inner overflow-hidden">
                <img
                  src="/astro-icon.png"
                  alt="Astro"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">¡Hola! Soy Astro 👋</h3>
              <p className="text-slate-600 text-sm mb-4">Tu consultor Atomy. ¿En qué puedo ayudarte?</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {quickOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => setInput(option)}
                    className="px-3 py-2 text-sm bg-white border border-cyan-200 hover:bg-cyan-50 hover:border-cyan-300 rounded-full transition-all shadow-sm"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm border border-slate-100">
                    <img
                      src="/astro-icon.png"
                      alt="Astro"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className={`max-w-[75%] p-3 rounded-2xl ${msg.role === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-br-md'
                  : 'bg-white text-slate-800 rounded-bl-md shadow-sm border border-slate-100'
                  }`}>
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">👤</span>
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm border border-slate-100">
                <img
                  src="/astro-icon.png"
                  alt="Astro"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-white p-3 rounded-2xl rounded-bl-md shadow-sm border border-slate-100">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu pregunta..."
              className="rounded-full border-slate-200 focus:border-cyan-400 focus:ring-cyan-400"
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="rounded-full w-10 h-10 p-0 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
