import React from 'react';
import { User, Wrench } from 'lucide-react'; 

export type DataType = 'PILOTS' | 'TEAMS';

interface TypeSelectorProps {
  onTypeSelect: (dataType: DataType) => void;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({ onTypeSelect }) => {
  return (
    // Max-w-lg é um bom tamanho, compacto e responsivo
    <div className="flex flex-col items-center justify-center space-y-10 w-full max-w-lg mx-auto z-10 mt-10 md:mt-16 animate-in fade-in slide-in-from-bottom-8 duration-300">
      
      {/* BOTÃO 1: PILOTOS (CSS PURO + HOVER/GLOW) */}
      <button
        onClick={() => onTypeSelect('PILOTS')} 
        className={`
          relative w-full text-white font-black py-5 px-6 rounded-xl uppercase text-xl
          overflow-hidden group flex items-center justify-center h-20 
          
          /* EFEITOS DE TRANSIÇÃO E HOVER */
          transition-all duration-500 /* Adiciona transição suave de 0.5s */
          hover:scale-[1.05] /* Faz o botão crescer 5% no hover */
          
          /* Gradiente de Fundo Principal (Laranja) */
          bg-gradient-to-br from-orange-600 to-orange-700
          
          /* Borda Metálica */
          border-2 border-slate-300/90
          
          /* Shadow Padrão */
          shadow-[0_0_10px_rgba(255,102,0,0.5),_inset_0_0_10px_rgba(0,0,0,0.4)]
          
          /* GLOW NO HOVER: Aumenta e espalha a sombra */
          hover:shadow-[0_0_25px_rgba(255,102,0,1),_inset_0_0_10px_rgba(0,0,0,0.4)] 
        `}
      >
        <span className="relative z-10 flex items-center justify-center">
          <User size={28} className="mr-3 text-white" /> 
          Pilotos (Batalha de Habilidade)
        </span>
      </button>

      {/* BOTÃO 2: FABRICANTES (CSS PURO + HOVER/GLOW) */}
      <button
        onClick={() => onTypeSelect('TEAMS')} 
        className={`
          relative w-full text-white font-black py-5 px-6 rounded-xl uppercase text-xl
          overflow-hidden group flex items-center justify-center h-20 
          
          /* EFEITOS DE TRANSIÇÃO E HOVER */
          transition-all duration-500 /* Adiciona transição suave de 0.5s */
          hover:scale-[1.05] /* Faz o botão crescer 5% no hover */
          
          /* Gradiente de Fundo Principal (Verde) */
          bg-gradient-to-br from-green-600 to-green-700
          
          /* Borda Metálica */
          border-2 border-slate-300/90
          
          /* Shadow Padrão */
          shadow-[0_0_10px_rgba(0,255,128,0.5),_inset_0_0_10px_rgba(0,0,0,0.4)] 
          
          /* GLOW NO HOVER: Aumenta e espalha a sombra */
          hover:shadow-[0_0_25px_rgba(0,255,128,1),_inset_0_0_10px_rgba(0,0,0,0.4)]
        `}
      >
        <span className="relative z-10 flex items-center justify-center">
          <Wrench size={28} className="mr-3 text-white" />
          Fabricantes (Batalha de Engenharia)
        </span>
      </button>
      
    </div>
  );
};