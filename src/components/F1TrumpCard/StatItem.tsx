// src/components/F1TrumpCard/StatItem.tsx

import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react'; 

interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  attrKey: string; 
  onSelect?: (attr: string) => void;
  isSelectable?: boolean;
  isSelected?: boolean;
  
  battleResult?: 'win' | 'loss' | 'tie' | null; 
}

export const StatItem: React.FC<StatItemProps> = ({ 
    icon, label, value, attrKey, onSelect, isSelectable = false, isSelected = false, battleResult = null
}) => {
    
    const handleClick = () => {
        if (isSelectable && onSelect) {
            onSelect(attrKey);
        }
    };
    
    // --- LÓGICA DE ESTILO DE RESULTADO ---
    let resultClasses = '';
    let resultIcon = null;

    if (battleResult === 'win') {
        resultClasses = 'bg-green-700/50 border-green-500';
        resultIcon = <ArrowUp size={18} className="text-green-400 ml-2 animate-pulse" />;
    } else if (battleResult === 'loss') {
        resultClasses = 'bg-red-700/50 border-red-500';
        resultIcon = <ArrowDown size={18} className="text-red-400 ml-2 animate-pulse" />;
    } else if (battleResult === 'tie') {
        resultClasses = 'bg-blue-700/50 border-blue-500';
    }

    // Estilos de Interatividade
    const interactionClasses = isSelectable 
        ? 'cursor-pointer hover:bg-slate-800' 
        : 'opacity-75 cursor-default';

    const selectedClasses = isSelected 
        ? 'bg-yellow-500/20 border-yellow-500 ring-1 ring-yellow-500' 
        : 'border-transparent';

    // CORREÇÃO APLICADA AQUI: Se for resultado, o fundo do ícone fica branco e o texto fica preto.
    const iconContainerClasses = (isSelected && !battleResult)
        ? 'bg-yellow-500 text-black' 
        : battleResult // Se houver resultado, força fundo branco e texto preto
        ? 'bg-white text-black' 
        : 'bg-black/20 text-white';


    return (
        <div 
            className={`
                flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 border 
                ${interactionClasses}
                ${selectedClasses}
                ${battleResult ? resultClasses : ''}
            `}
            onClick={handleClick} 
        >
            {/* APLICANDO A CLASSE CORRIGIDA */}
            <div className={`p-2 rounded-md ${iconContainerClasses}`}>
                {/* O ícone original (Trophy) agora está sempre visível */}
                {icon}
            </div>
            
            <div className='flex-grow'>
              <p className={`text-[10px] font-bold uppercase ${isSelected ? 'text-yellow-400' : 'text-gray-400'}`}>{label}</p>
              <p className="text-sm font-bold text-white">{value}</p>
            </div>
            
            {/* Ícone da Seta (Animado) */}
            {resultIcon} 
        </div>
    );
};