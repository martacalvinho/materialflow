import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import { queryDatabase, mockDatabase } from '../../utils/mockData';

interface Message {
  role: 'assistant' | 'user';
  content: string;
}

interface SuggestionProps {
  text: string;
  onClick: () => void;
}

const Suggestion: React.FC<SuggestionProps> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm hover:bg-primary-100 transition-colors"
  >
    {text}
  </button>
);

const ChatAssistant: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const response = queryDatabase(userMessage);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  const handleSuggestion = (query: string) => {
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: query }]);
    setIsLoading(true);

    setTimeout(() => {
      const response = queryDatabase(query);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, 1000);
  };

  const suggestions = [
    "most used material",
    "list projects",
    "paint in coastal villa renovation",
    "tell me about WoodCo"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-8 right-8 w-96 bg-white rounded-xl shadow-lg border border-surface-200 flex flex-col">
      <div className="p-4 border-b border-surface-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="text-primary-600" size={20} />
          <h3 className="font-medium">Material Assistant</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>

      <div className="flex-1 p-4 h-96 overflow-y-auto">
        {messages.length === 0 && (
          <div className="space-y-6">
            <div className="text-center text-surface-600">
              <p>I can help you find information about materials, projects, and manufacturers.</p>
              <p className="mt-2">What would you like to know?</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-surface-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Available Projects</h4>
                <div className="space-y-2">
                  {mockDatabase.projects.map(project => (
                    <button
                      key={project.id}
                      onClick={() => handleSuggestion(`Tell me about ${project.name}`)}
                      className="w-full text-left p-2 hover:bg-surface-100 rounded-lg transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="font-medium">{project.name}</div>
                        <div className="text-sm text-surface-600">{project.client}</div>
                      </div>
                      <ChevronRight size={16} className="text-surface-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Try asking about:</h4>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((suggestion, index) => (
                    <Suggestion
                      key={index}
                      text={suggestion}
                      onClick={() => handleSuggestion(suggestion)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-2 ${
                message.role === 'assistant' ? 'items-start' : 'items-start flex-row-reverse'
              }`}
            >
              <div className={`p-3 rounded-lg ${
                message.role === 'assistant' 
                  ? 'bg-surface-50 text-surface-900' 
                  : 'bg-primary-600 text-white'
              } max-w-[80%]`}>
                <p className="text-sm whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2 items-start">
              <div className="bg-surface-50 text-surface-900 p-2 rounded-lg">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-surface-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-surface-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your materials..."
            className="flex-1 px-3 py-2 text-sm border border-surface-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <Button 
            type="submit" 
            disabled={!input.trim() || isLoading}
            className="shrink-0"
          >
            <Send size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatAssistant;