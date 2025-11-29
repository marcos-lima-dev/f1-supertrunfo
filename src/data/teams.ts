// src/data/teams.ts (10 Construtores F1)

export interface TeamStats {
  teamChampionships: number; // Total de Títulos de Construtores
  totalTeamWins: number;      // Total de Vitórias na F1
  pitStopSpeed: number;       // Média de velocidade no pit (em km/h, maior = melhor)
  carDevelopment: number;     // Orçamento (em milhões)
  combinedExperience: number; // GPs combinados dos pilotos atuais
}

export interface Team {
  id: string;
  trumpCode: string;
  typeName: 'team';
  teamName: string;
  teamColorClass: string;
  teamLogoSrc: string; // VAZIO POR ENQUANTO (Será preenchido com a IA)
  isSuperTrump: boolean;
  stats: TeamStats;
}

// Dados mockados, mas baseados na força atual da equipe (2024)
export const teamsList: Team[] = [
  {
    id: "redbull",
    trumpCode: "A1",
    typeName: 'team',
    teamName: "Red Bull Racing",
    teamColorClass: "bg-[#1e41ff]",
    teamLogoSrc: "", // Vazios por enquanto
    isSuperTrump: true,
    stats: { teamChampionships: 6, totalTeamWins: 118, pitStopSpeed: 105, carDevelopment: 450, combinedExperience: 455 }
  },
  {
    id: "ferrari",
    trumpCode: "B1",
    typeName: 'team',
    teamName: "Scuderia Ferrari",
    teamColorClass: "bg-[#EF1A2D]",
    teamLogoSrc: "",
    isSuperTrump: false,
    stats: { teamChampionships: 16, totalTeamWins: 243, pitStopSpeed: 100, carDevelopment: 380, combinedExperience: 250 }
  },
  {
    id: "mercedes",
    trumpCode: "C1",
    typeName: 'team',
    teamName: "Mercedes",
    teamColorClass: "bg-[#00D2BE]",
    teamLogoSrc: "",
    isSuperTrump: false,
    stats: { teamChampionships: 8, totalTeamWins: 125, pitStopSpeed: 102, carDevelopment: 400, combinedExperience: 436 }
  },
  {
    id: "mclaren",
    trumpCode: "D1",
    typeName: 'team',
    teamName: "McLaren",
    teamColorClass: "bg-[#FF8000]",
    teamLogoSrc: "",
    isSuperTrump: false,
    stats: { teamChampionships: 8, totalTeamWins: 183, pitStopSpeed: 98, carDevelopment: 350, combinedExperience: 200 }
  },
  {
    id: "astonmartin",
    trumpCode: "E1",
    typeName: 'team',
    teamName: "Aston Martin",
    teamColorClass: "bg-[#006F62]",
    teamLogoSrc: "",
    isSuperTrump: false,
    stats: { teamChampionships: 0, totalTeamWins: 32, pitStopSpeed: 95, carDevelopment: 300, combinedExperience: 484 }
  },
  {
    id: "alpine",
    trumpCode: "F1",
    typeName: 'team',
    teamName: "Alpine",
    teamColorClass: "bg-[#0090FF]",
    teamLogoSrc: "",
    isSuperTrump: false,
    stats: { teamChampionships: 2, totalTeamWins: 36, pitStopSpeed: 90, carDevelopment: 280, combinedExperience: 250 }
  },
  {
    id: "williams",
    trumpCode: "G1",
    typeName: 'team',
    teamName: "Williams",
    teamColorClass: "bg-[#005AFF]",
    teamLogoSrc: "",
    isSuperTrump: false,
    stats: { teamChampionships: 9, totalTeamWins: 114, pitStopSpeed: 92, carDevelopment: 220, combinedExperience: 140 }
  },
  {
    id: "rb",
    trumpCode: "H1",
    typeName: 'team',
    teamName: "RB F1 Team",
    teamColorClass: "bg-[#6692FF]",
    teamLogoSrc: "",
    isSuperTrump: false,
    stats: { teamChampionships: 0, totalTeamWins: 0, pitStopSpeed: 90, carDevelopment: 200, combinedExperience: 335 }
  },
  {
    id: "haas",
    trumpCode: "I1",
    typeName: 'team',
    teamName: "Haas F1 Team",
    teamColorClass: "bg-[#B6BABE]",
    teamLogoSrc: "",
    isSuperTrump: false,
    stats: { teamChampionships: 0, totalTeamWins: 0, pitStopSpeed: 88, carDevelopment: 180, combinedExperience: 260 }
  },
  {
    id: "stake",
    trumpCode: "J1",
    typeName: 'team',
    teamName: "Stake F1 Team",
    teamColorClass: "bg-[#52E252]",
    teamLogoSrc: "",
    isSuperTrump: false,
    stats: { teamChampionships: 0, totalTeamWins: 10, pitStopSpeed: 93, carDevelopment: 250, combinedExperience: 303 }
  },
];