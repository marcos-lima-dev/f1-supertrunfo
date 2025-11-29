// src/components/F1TrumpCard/index.tsx

import React from 'react';
// Ícones Lucide-React - Certifique-se de que estão todos aqui
import { Gauge, Trophy, Flag, Factory, DollarSign, Timer } from 'lucide-react'; 
import { Sparkles } from './Sparkles';
import { StatItem } from './StatItem';
import { CardBack } from './CardBack';
import { DataType } from '../TypeSelector'; 

// Tipagem de Resultado
type AttrResult = 'win' | 'loss' | 'tie' | null;

// Interface genérica para as props do Card
interface CardDataProps {
    id?: string;
    trumpCode: string;
    teamName: string;
    teamColorClass: string;
    isSuperTrump?: boolean;
    pilotName?: string;
    pilotImageSrc?: string;
    pilotFlagSrc?: string;
    teamLogoSrc?: string;
    stats: any; // Mantido 'any' para aceitar Piloto OU Time
    isFlipped?: boolean;
    isWinner?: boolean;
    onAttributeSelect?: (attr: string) => void;
    selectedAttribute?: string | null;
    isPlayerTurn?: boolean;
    dataType: DataType; 
    
    // Função que retorna o status de um atributo para o UX
    getAttrStatus?: (attrKey: string) => AttrResult; 
}


const F1TrumpCard: React.FC<CardDataProps> = (props) => {
    const { 
        trumpCode, teamName, teamColorClass, 
        isSuperTrump, isFlipped, isWinner, stats,
        onAttributeSelect, selectedAttribute, isPlayerTurn, dataType,
        getAttrStatus
    } = props;

    const isPilot = dataType === 'PILOTS';
    
    // Propriedades dinâmicas
    const primaryName = isPilot ? props.pilotName : props.teamName;
    
    // CORREÇÃO: Removemos o fallback '/assets/logos/default_team.png' que causava o erro 404.
    // imageSrc será agora props.teamLogoSrc, que é uma string vazia ('' || '') = ''.
    const imageSrc = isPilot ? props.pilotImageSrc : (props.teamLogoSrc || ''); 
    
    // Lógica de visibilidade (mantida)
    const showFrontContent = !isFlipped || selectedAttribute; 
    let wrapperClasses = "w-80 h-[560px] rounded-2xl relative group transition-all duration-500 bg-white overflow-hidden ";
    // ... (lógica de wrapperClasses) ...

    return (
        <div className={wrapperClasses}>
            
            {/* ... (Borda Holográfica) ... */}

            {showFrontContent ? (
                // BLOC O DE CONTEÚDO DA FRENTE
                <div className="relative z-10 w-full h-full flex flex-col rounded-xl overflow-hidden bg-white">
                    
                    {/* HEADER */}
                    <div className={`h-16 flex justify-between items-center px-4 text-white transition-colors duration-500 ${isWinner ? 'bg-gradient-to-r from-purple-600 to-orange-500' : teamColorClass}`}>
                        
                        <div className="flex flex-col items-center justify-center bg-white/20 rounded-md w-12 h-12 backdrop-blur-sm">
                          <span className="text-2xl font-black leading-none">{trumpCode.charAt(0)}</span>
                          <span className="text-sm font-bold leading-none">{trumpCode.charAt(1)}</span>
                        </div>
                        
                        <h2 className="text-sm font-bold uppercase tracking-wider truncate mx-2">{teamName}</h2>
                        
                        {/* Renderiza Bandeira ou Logo da Equipe no canto SOMENTE SE HOUVER UMA URL VÁLIDA */}
                        {isPilot ? (
                            props.pilotFlagSrc && (
                                <img src={props.pilotFlagSrc} alt="Flag" className="w-8 h-6 rounded-sm object-cover shadow-sm" />
                            )
                        ) : (
                             props.teamLogoSrc && (
                                <img src={props.teamLogoSrc} alt={teamName + " Logo"} className="w-8 h-8 object-contain p-[2px]" />
                            )
                        )}
                    </div>

                    {/* HERO IMAGE / LOGO CENTRAL */}
                    <div className="flex-grow relative bg-gradient-to-b from-gray-100 to-gray-300 overflow-hidden flex items-center justify-center">
                        
                        {isPilot ? (
                            // Renderização Piloto
                            <>
                                <img src={imageSrc} alt={primaryName} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110 origin-bottom" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 to-transparent p-4 pt-12">
                                    <h1 className="text-white text-2xl font-black uppercase italic leading-tight drop-shadow-md">{primaryName}</h1>
                                </div>
                            </>
                        ) : (
                            // Renderização Fabricante (Logo/Nome Centralizado)
                            <div className='text-center p-8'>
                                <Factory size={64} className="text-gray-500 mx-auto mb-4" />
                                <h1 className="text-slate-800 text-3xl font-black uppercase italic leading-tight drop-shadow-md">{teamName}</h1>
                            </div>
                        )}
                        {isWinner && <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent skew-x-12 animate-[shimmer_2s_infinite_linear] pointer-events-none" />}
                    </div>
                    {/* ... (Fim do Bloco) ... */}

                    {/* STATS GRID (PASSANDO battleResult) */}
                    <div className="bg-slate-900 p-4 pb-6">
                        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                            
                            {isPilot ? (
                                <>
                                {/* ESTATÍSTICAS DO PILOTO */}
                                <StatItem icon={<Trophy size={18} className="text-yellow-500" />} label="Vitórias" value={stats.wins} attrKey="wins" onSelect={onAttributeSelect} isSelectable={isPlayerTurn} isSelected={selectedAttribute === 'wins'} battleResult={getAttrStatus?.('wins')} />
                                <StatItem icon={<Gauge size={18} className="text-red-500" />} label="Vel. Máx." value={stats.topSpeed} attrKey="topSpeed" onSelect={onAttributeSelect} isSelectable={isPlayerTurn} isSelected={selectedAttribute === 'topSpeed'} battleResult={getAttrStatus?.('topSpeed')} />
                                <StatItem icon={<Flag size={18} className="text-blue-500" />} label="GPs" value={stats.experience} attrKey="experience" onSelect={onAttributeSelect} isSelectable={isPlayerTurn} isSelected={selectedAttribute === 'experience'} battleResult={getAttrStatus?.('experience')} />
                                <StatItem icon={<Trophy size={18} className="text-orange-500" />} label="Títulos" value={stats.championships} attrKey="championships" onSelect={onAttributeSelect} isSelectable={isPlayerTurn} isSelected={selectedAttribute === 'championships'} battleResult={getAttrStatus?.('championships')} />
                                </>
                            ) : (
                                <>
                                {/* ESTATÍSTICAS DO FABRICANTE */}
                                <StatItem icon={<Trophy size={18} className="text-white" />} label="Títulos (Construtor)" value={stats.teamChampionships} attrKey="teamChampionships" onSelect={onAttributeSelect} isSelectable={isPlayerTurn} isSelected={selectedAttribute === 'teamChampionships'} battleResult={getAttrStatus?.('teamChampionships')} />
                                
                                <StatItem icon={<Timer size={18} className="text-yellow-500" />} label="Pit Stop Speed" value={`${stats.pitStopSpeed} km/h`} attrKey="pitStopSpeed" onSelect={onAttributeSelect} isSelectable={isPlayerTurn} isSelected={selectedAttribute === 'pitStopSpeed'} battleResult={getAttrStatus?.('pitStopSpeed')} />
                                
                                <StatItem icon={<DollarSign size={18} className="text-green-500" />} label="Desenvolvimento (M)" value={`${stats.carDevelopment}M`} attrKey="carDevelopment" onSelect={onAttributeSelect} isSelectable={isPlayerTurn} isSelected={selectedAttribute === 'carDevelopment'} battleResult={getAttrStatus?.('carDevelopment')} />
                                
                                <StatItem icon={<Flag size={18} className="text-red-500" />} label="Total Vitórias" value={stats.totalTeamWins} attrKey="totalTeamWins" onSelect={onAttributeSelect} isSelectable={isPlayerTurn} isSelected={selectedAttr === 'totalTeamWins'} battleResult={getAttrStatus?.('totalTeamWins')} />
                                </>
                            )}
                        </div>
                    </div>
                </div>

            ) : (
                <CardBack isFlipped={isFlipped} />
            )}
            {/* ... (Componentes Extras) ... */}

        </div>
    );
};

export default F1TrumpCard;