import React from 'react';

// Tipos de Modo de Jogo
export type GameMode = 'PVP' | 'VS_CPU';

interface ModeSelectorProps {
  onModeSelect: (mode: GameMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ onModeSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-lg mx-auto mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <h2 className="text-3xl font-black text-white uppercase tracking-wider mb-4">
        Escolha o Modo de Jogo
      </h2>

      {/* Botão 1: VS CPU (Modo Clássico) */}
      <button
        onClick={() => onModeSelect('VS_CPU')}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 px-6 rounded-lg shadow-xl transition-all duration-200 uppercase text-lg border-b-4 border-red-800 hover:border-red-600"
      >
        🤖 Batalha Clássica (VS CPU)
        <p className="text-xs font-medium opacity-80 mt-1">
          Oponente aleatório, carta vira na hora do ataque.
        </p>
      </button>

      {/* Botão 2: PVP (Seleção Livre - Atual) */}
      <button
        onClick={() => onModeSelect('PVP')}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-6 rounded-lg shadow-xl transition-all duration-200 uppercase text-lg border-b-4 border-blue-800 hover:border-blue-600"
      >
        👥 Duelo (Seleção Livre)
        <p className="text-xs font-medium opacity-80 mt-1">
          Você escolhe os dois pilotos para comparação.
        </p>
      </button>
    </div>
  );
};