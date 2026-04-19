'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Edit3, Save, Power, Check, AlertCircle } from 'lucide-react';

export default function VisualEditor() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [changes, setChanges] = useState<Record<string, string>>({});
  const originalTexts = useRef<Map<HTMLElement, string>>(new Map());

  // Only run in development
  if (process.env.NODE_ENV !== 'development') return null;

  const toggleEditing = () => {
    const newState = !isEditing;
    setIsEditing(newState);

    // Find all text elements
    const elements = document.querySelectorAll('h1, h2, h3, h4, h5, p, span, button, label, a');
    
    elements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      
      // Skip the editor UI itself
      if (htmlEl.closest('.visual-editor-ui')) return;

      if (newState) {
        // Start editing
        if (!originalTexts.current.has(htmlEl)) {
          originalTexts.current.set(htmlEl, htmlEl.innerText.trim());
        }
        htmlEl.contentEditable = 'true';
        htmlEl.style.outline = '1px dashed #3b82f6';
        htmlEl.style.cursor = 'text';
      } else {
        // Stop editing
        htmlEl.contentEditable = 'false';
        htmlEl.style.outline = '';
        htmlEl.style.cursor = '';
        
        const original = originalTexts.current.get(htmlEl);
        const current = htmlEl.innerText.trim();
        
        if (original && original !== current) {
          setChanges(prev => ({ ...prev, [original]: current }));
        }
      }
    });
  };

  const saveChanges = async () => {
    if (Object.keys(changes).length === 0) {
      alert('Não detetei alterações para guardar.');
      return;
    }

    setIsSaving(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/save-edits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ changes }),
      });

      if (response.ok) {
        setStatus('success');
        setChanges({});
        // Re-sync original texts to current state
        document.querySelectorAll('h1, h2, h3, h4, h5, p, span, button, label, a').forEach(el => {
          const htmlEl = el as HTMLElement;
          originalTexts.current.set(htmlEl, htmlEl.innerText.trim());
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Erro ao guardar:', error);
      setStatus('error');
    } finally {
      setIsSaving(false);
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="visual-editor-ui fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end font-sans">
      {Object.keys(changes).length > 0 && !isEditing && (
        <div className="bg-white/80 backdrop-blur-md border border-blue-200 p-3 rounded-2xl shadow-xl animate-in slide-in-from-bottom-4 duration-300">
          <p className="text-xs font-semibold text-blue-800 mb-2">
            Tens {Object.keys(changes).length} alteração(ões) pendente(s)
          </p>
          <button
            onClick={saveChanges}
            disabled={isSaving}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-white font-bold transition-all ${
              status === 'success' ? 'bg-green-500' : status === 'error' ? 'bg-red-500' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSaving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : status === 'success' ? (
              <Check size={18} />
            ) : status === 'error' ? (
              <AlertCircle size={18} />
            ) : (
              <Save size={18} />
            )}
            {status === 'success' ? 'Guardado!' : status === 'error' ? 'Erro' : 'Gravar no Código'}
          </button>
        </div>
      )}

      <button
        onClick={toggleEditing}
        className={`flex items-center gap-2 p-4 rounded-full shadow-2xl transition-all active:scale-95 ${
          isEditing 
            ? 'bg-red-500 text-white hover:bg-red-600' 
            : 'bg-white text-slate-800 hover:bg-slate-50 border border-slate-200'
        }`}
      >
        {isEditing ? <Power size={20} /> : <Edit3 size={20} />}
        <span className="font-bold text-sm">
          {isEditing ? 'Desativar Edição' : 'Ativar Edição Visual'}
        </span>
      </button>
    </div>
  );
}
