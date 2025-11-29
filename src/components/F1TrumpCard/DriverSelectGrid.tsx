import React from 'react';
import { Driver } from '@/data/drivers';
import { Team } from '@/data/teams';
import { DataType } from '../TypeSelector';
import { Factory } from 'lucide-react'; // NOVO IMPORT: Para o placeholder visual

// Definindo um tipo genérico para a lista
type CardList = (Driver | Team)[];

interface DriverSelectGridProps {
  initialDrivers: CardList; // Recebe Pilotos OU Times
  onSelect: (card: Driver | Team) => void;
  selectedIds: string[];
  dataType: DataType; // O novo tipo de dado
}

export const DriverSelectGrid: React.FC<DriverSelectGridProps> = ({ 
    initialDrivers, 
    onSelect, 
    selectedIds, 
    dataType 
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-5xl mx-auto p-4 animate-in fade-in-up duration-700">
      {initialDrivers.map((card) => {
        const isSelected = selectedIds.includes(card.id);
        const isFullySelected = selectedIds.length === 2;

        // Lógica para determinar o conteúdo a ser exibido
        const isPilot = dataType === 'PILOTS';
        const primaryName = isPilot ? (card as Driver).pilotName : (card as Team).teamName;
        const subName = isPilot ? (card as Driver).teamName : 'F1 Constructor';
        const imageSrc = isPilot 
          ? (card as Driver).pilotImageSrc 
          : (card as Team).teamLogoSrc; // Agora imageSrc pode ser ""
        
        // Define se a imagem ou o placeholder de ícone deve ser mostrado
        const showImage = !!imageSrc;

        return (
          <button
            key={card.id}
            onClick={() => !isSelected && onSelect(card)}
            disabled={isSelected || isFullySelected}
            title={isSelected ? 'Já Selecionado' : primaryName}
            className={`
              relative h-40 rounded-xl overflow-hidden border-2 transition-all duration-300 group text-left shadow-lg
              ${isSelected 
                ? 'border-gray-600 opacity-40 cursor-not-allowed grayscale' 
                : 'border-white/10 hover:border-yellow-400 hover:scale-[1.03] cursor-pointer'}
              bg-slate-800
            `}
          >
            {/* Header com Cor da Equipe */}
            <div className={`h-2 w-full ${card.teamColorClass}`} />
            
            <div className="p-3 relative z-10">
                {/* Código e Nome */}
                <span className="text-xs font-bold text-white/50 block">{card.trumpCode}</span>
                <span className="text-white font-black uppercase text-base leading-tight">
                    {/* Exibe o último nome (piloto) ou o nome completo (time) */}
                    {isPilot ? primaryName?.split(' ').pop() : primaryName}
                </span>
                <span className="text-[10px] text-white/40 block mt-1">{subName}</span>
            </div>
            
            {/* IMAGEM/LOGO OU PLACEHOLDER DE ÍCONE */}
            {isPilot || showImage ? (
                <img 
                    src={imageSrc} 
                    className={`absolute bottom-0 right-0 object-cover drop-shadow-xl transition-transform 
                        ${isPilot ? 'w-24 md:w-28' : 'w-20 md:w-24 p-2 opacity-80'}
                        ${isSelected ? 'grayscale-0' : 'group-hover:scale-110'}`}
                    alt={primaryName}
                    style={{ height: '80%' }}
                />
            ) : (
                // PLACEHOLDER: Mostra o ícone Factory quando não há URL de logo
                <div 
                    className="absolute bottom-0 right-0 w-20 md:w-24 flex items-end justify-center pb-2 opacity-20 text-white"
                    style={{ height: '80%' }}
                >
                    <Factory size={48} />
                </div>
            )}
            
            {/* Overlay para Indicar Seleção */}
            {isSelected && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center font-bold text-white uppercase tracking-widest z-20">
                    OK
                </div>
            )}
          </button>
        );
      })}
    </div>
  );
};