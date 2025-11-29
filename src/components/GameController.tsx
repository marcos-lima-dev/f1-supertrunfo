// src/components/GameController.tsx

"use client";

import { useState, useEffect } from 'react'; // NOVO: useEffect
import F1TrumpCard from '@/components/F1TrumpCard';

// IMPORTAÇÕES DE DADOS E TIPAGENS
import { Driver } from '@/data/drivers'; 
import { teamsList, Team } from '@/data/teams'; 
import { useConfetti } from '@/hooks/useConfetti'; 
import { DriverSelectGrid } from './F1TrumpCard/DriverSelectGrid';
import { shuffleArray } from '@/lib/utils';
import { ModeSelector, GameMode } from './ModeSelector'; 
import { TypeSelector, DataType } from './TypeSelector';
import { Home } from 'lucide-react'; // Ícone para o Reset Total

// Tipagem de Resultado
type AttrResult = 'win' | 'loss' | 'tie' | null;
type SelectedCard = Driver | Team;
type WinnerIdType = string | 'TIE' | null;
type GamePhase = 'TYPE_SELECT' | 'MODE_SELECT' | 'SELECTION' | 'BATTLE' | 'RESULT'; 
type StatKey = string; 

interface GameControllerProps {
    initialDrivers: Driver[];
}


// --- FUNÇÃO AUXILIAR: EXTRAI VALOR NUMÉRICO SEGURO ---
const extractValue = (value: any): number => {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return 0;

    const cleanedValue = value.replace(/[^0-9.]/g, ''); 
    return parseFloat(cleanedValue) || 0;
};


export const GameController: React.FC<GameControllerProps> = ({ initialDrivers }) => {
    
    // --- 1. ESTADO CENTRAL ---
    
    const [dataType, setDataType] = useState<DataType>('PILOTS');
    const [phase, setPhase] = useState<GamePhase>('TYPE_SELECT'); 
    const [gameMode, setGameMode] = useState<GameMode | null>(null);
    const [player1, setPlayer1] = useState<SelectedCard | null>(null); 
    const [player2, setPlayer2] = useState<SelectedCard | null>(null); 
    const [selectedAttr, setSelectedAttr] = useState<StatKey | null>(null);
    const [winnerId, setWinnerId] = useState<WinnerIdType>(null);
    
    const [cards, setCards] = useState<SelectedCard[]>([]); 
    
    // --- LÓGICA DE CARREGAMENTO CONDICIONAL (CLIENT-SIDE ONLY) ---
    
    // Função para carregar e embaralhar dados com base no dataType (executada no cliente)
    const loadAndShuffleCards = (type: DataType) => {
        const listToShuffle = (type === 'PILOTS' ? initialDrivers : teamsList) as SelectedCard[];
        setCards(shuffleArray(listToShuffle));
    };

    // useEffect para carregar cards apenas no lado do cliente (resolve hydration mismatch)
    useEffect(() => {
        loadAndShuffleCards(dataType);
    }, [initialDrivers, dataType]);


    // --- 2. FUNÇÕES DE LÓGICA DE JOGO ---
    
    // 1. RESET TOTAL (Volta para a tela "Selecione a Categoria")
    const startNewGame = () => {
        loadAndShuffleCards('PILOTS'); 
        
        setPhase('TYPE_SELECT'); 
        setGameMode(null);
        setPlayer1(null);
        setPlayer2(null);
        setSelectedAttr(null);
        setWinnerId(null);
        setDataType('PILOTS'); 
    };

    // 2. NOVA BATALHA (Volta para a tela "Seleção de Pilotos/Times")
    const startNewBattle = () => {
        loadAndShuffleCards(dataType); 
        
        setPlayer1(null);
        setPlayer2(null);
        setSelectedAttr(null);
        setWinnerId(null);
        setPhase('SELECTION');
    };


    const handleTypeSelect = (type: DataType) => {
        setDataType(type);
        setPhase('MODE_SELECT');
    };

    const handleModeSelect = (mode: GameMode) => {
        setGameMode(mode);
        loadAndShuffleCards(dataType); 
        setPhase('SELECTION');
    };

    const autoSelectCPU = (availableCards: SelectedCard[], player1Id: string) => {
        const potentialOpponents = availableCards.filter(d => d.id !== player1Id);
        if (potentialOpponents.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * potentialOpponents.length);
        
        return potentialOpponents[randomIndex];
    }

    // 3. Batalha
    const handleBattle = (attribute: string) => {
        if (phase !== 'BATTLE' || !player1 || !player2) return;

        setSelectedAttr(attribute);

        const p1RawValue = (player1.stats as any)[attribute]; 
        const p2RawValue = (player2.stats as any)[attribute]; 
        
        const p1Value = extractValue(p1RawValue);
        const p2Value = extractValue(p2RawValue);

        let winner: WinnerIdType;

        if (p1Value > p2Value) {
            winner = player1.id;
        } else if (p2Value > p1Value) {
            winner = player2.id;
        } else {
            // Lógica de Desempate (Super Trunfo)
            if (player1.isSuperTrump) {
                winner = player1.id;
            } else if (player2.isSuperTrump) {
                winner = player2.id;
            } else {
                winner = 'TIE';
            }
        }
        
        setTimeout(() => {
            setWinnerId(winner);
            setPhase('RESULT');
        }, 600); 
    };

    // 4. Seleção de Pilotos/Times
    const handleSelectDriver = (card: SelectedCard) => {
        if (phase !== 'SELECTION' || !gameMode) return;
        
        if (!player1) {
            setPlayer1(card);
            
            if (gameMode === 'VS_CPU') {
                const cpu = autoSelectCPU(cards, card.id);
                if (cpu) {
                    setPlayer2(cpu);
                    setPhase('BATTLE');
                }
            }
        } else if (gameMode === 'PVP' && !player2 && card.id !== player1.id) {
            setPlayer2(card);
            setPhase('BATTLE'); 
        } 
    };
    
    // --- FUNÇÃO DE FEEDBACK DE UX ---
    const getAttrStatus = (cardId: string, attrKey: string): AttrResult => {
        if (phase !== 'RESULT' || selectedAttr !== attrKey) return null; 
        
        if (winnerId === 'TIE') {
            return 'tie';
        } 
        
        if (winnerId === cardId) {
            return 'win';
        } else {
            return 'loss';
        }
    };


    // --- HOOKS VISUAIS ---
    const isP1Winner = winnerId === player1?.id;
    useConfetti(phase === 'RESULT' && isP1Winner);
    
    const selectedIds = [player1?.id, player2?.id].filter(Boolean) as string[];
    const showArena = (phase !== 'SELECTION' && phase !== 'MODE_SELECT' && phase !== 'TYPE_SELECT') && player1 && player2;
    const isOpponentFlipped = gameMode === 'VS_CPU' && phase !== 'RESULT' && selectedAttr === null;


    return (
        // REMOÇÃO DA CLASSE bg-slate-900 e da DIV de background ANTIGA
        <main className="min-h-screen flex flex-col items-center p-4 overflow-hidden relative w-full">
            
            {/* REMOVEMOS A DIV DE BACKGROUND ANTIGA AQUI */}
            
            {/* --- HEADER CORRIGIDO --- */}
            <header className="w-full flex justify-center items-center p-4 max-w-6xl z-20 relative">
                <img src="/assets/F1-Arena.png" alt="F1 Arena Logo" className="h-10 md:h-12 lg:h-16 object-contain opacity-80 animate-pulse transition-transform hover:scale-105 cursor-pointer" onClick={startNewGame} />
                
                {/* BOTÃO DE RESET TOTAL (Home) - APARECE SEMPRE, EXCETO NA TELA INICIAL */}
                {phase !== 'TYPE_SELECT' && (
                    <button 
                        onClick={startNewGame} 
                        className="absolute right-4 md:right-0 p-2 text-white/50 hover:text-white transition-colors"
                        title="Voltar para Seleção de Categoria"
                    >
                        <Home size={24} />
                    </button>
                )}
            </header>

            {/* --- FASE 1: ESCOLHA DE TIPO --- */}
            {phase === 'TYPE_SELECT' && (
                <TypeSelector onTypeSelect={handleTypeSelect} />
            )}
            
            {/* --- FASE 2: ESCOLHA DE MODO --- */}
            {phase === 'MODE_SELECT' && (
                <ModeSelector onModeSelect={handleModeSelect} />
            )}

            {/* --- FASE 3: SELEÇÃO DE PILOTOS/TIMES --- */}
            {phase === 'SELECTION' && (
                <div className="flex flex-col items-center w-full mt-4 md:mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-xl md:text-2xl text-white font-bold mb-2">
                        {dataType === 'PILOTS' ? 'Selecione seu Piloto' : 'Selecione sua Escuderia'}
                    </h2>
                    <p className="text-slate-400 text-sm mb-6">
                        {gameMode === 'VS_CPU' 
                            ? 'O oponente será escolhido aleatoriamente.' 
                            : 'Escolha os dois combatentes.'
                        }
                    </p>
                    
                    <DriverSelectGrid 
                        initialDrivers={cards} 
                        onSelect={handleSelectDriver} 
                        selectedIds={selectedIds} 
                        dataType={dataType}
                    />
                </div>
            )}

            {/* --- FASE 4: BATALHA (ARENA) --- */}
            {showArena && (
                <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-center justify-center flex-grow z-10 w-full max-w-6xl mt-4 animate-in fade-in duration-500">
                    
                    {/* CARD PLAYER 1 */}
                    <F1TrumpCard 
                        {...player1} 
                        isPlayerTurn={phase === 'BATTLE'} 
                        onAttributeSelect={handleBattle}
                        selectedAttribute={selectedAttr}
                        isWinner={phase === 'RESULT' && isP1Winner}
                        dataType={dataType}
                        getAttrStatus={(attrKey) => getAttrStatus(player1!.id, attrKey)}
                    />

                    <div className="text-center space-y-2">
                        <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600 italic">VS</div>
                        
                        {/* Mensagem de espera / Resultado */}
                        {phase === 'BATTLE' && !selectedAttr && (
                            <span className="text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-yellow-600/30 text-yellow-400 animate-pulse">
                                Escolha seu atributo!
                            </span>
                        )}
                        
                        {selectedAttr && phase === 'RESULT' && (
                            <span className={`text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full 
                                ${winnerId === 'TIE' ? 'bg-blue-600/30 text-blue-400' : 
                                  isP1Winner ? 'bg-purple-600/30 text-purple-400' : 'bg-red-600/30 text-red-400'}
                            `}>
                                {winnerId === 'TIE' ? 'EMPATE!' : 
                                 isP1Winner ? 'Você Venceu!' : 'Oponente Venceu!'}
                            </span>
                        )}
                    </div>

                    {/* CARD PLAYER 2 */}
                    <F1TrumpCard 
                        {...player2} 
                        isFlipped={isOpponentFlipped} 
                        selectedAttribute={selectedAttr}
                        isWinner={phase === 'RESULT' && winnerId === player2?.id}
                        dataType={dataType} 
                        getAttrStatus={(attrKey) => getAttrStatus(player2!.id, attrKey)}
                    />
                </div>
            )}

            {/* BOTÃO DE NOVA BATALHA (VOLTA PARA SELEÇÃO DE CARTAS) */}
            {phase === 'RESULT' && (
                <button onClick={startNewBattle} className="fixed bottom-10 bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-4 rounded-full font-black shadow-lg hover:scale-105 uppercase tracking-widest z-50">
                    Nova Batalha
                </button>
            )}
        </main>
    );
}