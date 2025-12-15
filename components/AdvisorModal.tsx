import React from 'react';
import { X, MessageSquareQuote } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  isLoading: boolean;
}

export const AdvisorModal: React.FC<Props> = ({ isOpen, onClose, message, isLoading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-xl shadow-2xl border-4 border-gray-300 transform scale-100 transition-all">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50 rounded-t-lg">
          <div className="flex items-center gap-2">
             <div className="bg-blue-600 p-1.5 rounded text-white">
                <MessageSquareQuote size={20} />
             </div>
             <h3 className="font-bold text-gray-800">Помощник Мэра</h3>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-4 space-y-3">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-gray-500 italic">Секретарь печатает...</p>
            </div>
          ) : (
            <div className="prose prose-sm">
              <p className="text-lg text-gray-800 font-medium leading-relaxed italic">
                "{message}"
              </p>
            </div>
          )}
        </div>

        <div className="p-4 bg-gray-50 rounded-b-lg flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-bold text-sm transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};