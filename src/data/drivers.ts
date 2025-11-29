// src/data/drivers.ts (Versão Completa 2024)

// Interface Base que TODOS os tipos de cartas devem seguir
export interface CardData {
  id: string;
  trumpCode: string;
  teamName: string;
  teamColorClass: string;
  isSuperTrump: boolean;
  
  // Propriedades específicas de Piloto/Time (para garantir que uma seja usada)
  pilotName?: string; 
  pilotImageSrc?: string;
  teamLogoSrc?: string;

  // O bloco de estatísticas que o F1TrumpCard irá renderizar
  stats: any; // Usaremos 'any' temporariamente, ou um bloco que combine todos os stats
}

export interface DriverStats {
  wins: number;
  topSpeed: number;
  experience: number; // GPs
  bestLapTime?: string;
  championships: number;
}

export interface Driver {
  id: string;
  trumpCode: string;
  teamName: string;
  teamColorClass: string;
  pilotName: string;
  pilotImageSrc: string;
  pilotFlagSrc: string;
  isSuperTrump: boolean;
  stats: DriverStats;
}

export const driversList: Driver[] = [
  { id: "verstappen", trumpCode: "A1", teamName: "Red Bull Racing", teamColorClass: "bg-[#1e41ff]", pilotName: "Max Verstappen", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/nl.png", isSuperTrump: true, stats: { wins: 61, topSpeed: 345, experience: 195, championships: 3 } },
  { id: "perez", trumpCode: "A2", teamName: "Red Bull Racing", teamColorClass: "bg-[#1e41ff]", pilotName: "Sergio Perez", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/S/SERPER01_Sergio_Perez/serper01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/mx.png", isSuperTrump: false, stats: { wins: 6, topSpeed: 340, experience: 260, championships: 0 } },
  { id: "leclerc", trumpCode: "B1", teamName: "Ferrari", teamColorClass: "bg-[#EF1A2D]", pilotName: "Charles Leclerc", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/mc.png", isSuperTrump: false, stats: { wins: 6, topSpeed: 342, experience: 135, championships: 0 } },
  { id: "sainz", trumpCode: "B2", teamName: "Ferrari", teamColorClass: "bg-[#EF1A2D]", pilotName: "Carlos Sainz", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/C/CARSAI01_Carlos_Sainz/carsai01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/es.png", isSuperTrump: false, stats: { wins: 3, topSpeed: 342, experience: 185, championships: 0 } },
  { id: "hamilton", trumpCode: "C1", teamName: "Mercedes", teamColorClass: "bg-[#00D2BE]", pilotName: "Lewis Hamilton", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/gb.png", isSuperTrump: false, stats: { wins: 103, topSpeed: 338, experience: 332, championships: 7 } },
  { id: "russell", trumpCode: "C2", teamName: "Mercedes", teamColorClass: "bg-[#00D2BE]", pilotName: "George Russell", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GEORUS01_George_Russell/georus01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/gb.png", isSuperTrump: false, stats: { wins: 1, topSpeed: 339, experience: 104, championships: 0 } },
  { id: "norris", trumpCode: "D1", teamName: "McLaren", teamColorClass: "bg-[#FF8000]", pilotName: "Lando Norris", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANNOR01_Lando_Norris/lannor01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/gb.png", isSuperTrump: false, stats: { wins: 1, topSpeed: 335, experience: 104, championships: 0 } },
  { id: "piastri", trumpCode: "D2", teamName: "McLaren", teamColorClass: "bg-[#FF8000]", pilotName: "Oscar Piastri", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/O/OSCPIA01_Oscar_Piastri/oscpia01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/au.png", isSuperTrump: false, stats: { wins: 0, topSpeed: 336, experience: 43, championships: 0 } },
  { id: "alonso", trumpCode: "E1", teamName: "Aston Martin", teamColorClass: "bg-[#006F62]", pilotName: "Fernando Alonso", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/es.png", isSuperTrump: false, stats: { wins: 32, topSpeed: 330, experience: 380, championships: 2 } },
  { id: "stroll", trumpCode: "E2", teamName: "Aston Martin", teamColorClass: "bg-[#006F62]", pilotName: "Lance Stroll", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/ca.png", isSuperTrump: false, stats: { wins: 0, topSpeed: 331, experience: 165, championships: 0 } },
  { id: "tsunoda", trumpCode: "F1", teamName: "RB F1 Team", teamColorClass: "bg-[#6692FF]", pilotName: "Yuki Tsunoda", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/Y/YUKTSU01_Yuki_Tsunoda/yuktsu01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/jp.png", isSuperTrump: false, stats: { wins: 0, topSpeed: 334, experience: 78, championships: 0 } },
  { id: "ricciardo", trumpCode: "F2", teamName: "RB F1 Team", teamColorClass: "bg-[#6692FF]", pilotName: "Daniel Ricciardo", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/D/DANRIC01_Daniel_Ricciardo/danric01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/au.png", isSuperTrump: false, stats: { wins: 8, topSpeed: 333, experience: 257, championships: 0 } },
  { id: "hulkenberg", trumpCode: "G1", teamName: "Haas F1 Team", teamColorClass: "bg-[#B6BABE]", pilotName: "Nico Hulkenberg", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/N/NICHUL01_Nico_Hulkenberg/nichul01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/de.png", isSuperTrump: false, stats: { wins: 0, topSpeed: 332, experience: 215, championships: 0 } },
  { id: "magnussen", trumpCode: "G2", teamName: "Haas F1 Team", teamColorClass: "bg-[#B6BABE]", pilotName: "Kevin Magnussen", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/K/KEVMAG01_Kevin_Magnussen/kevmag01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/dk.png", isSuperTrump: false, stats: { wins: 0, topSpeed: 331, experience: 175, championships: 0 } },
  { id: "bottas", trumpCode: "H1", teamName: "Stake F1 Team", teamColorClass: "bg-[#52E252]", pilotName: "Valtteri Bottas", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/V/VALBOT01_Valtteri_Bottas/valbot01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/fi.png", isSuperTrump: false, stats: { wins: 10, topSpeed: 337, experience: 245, championships: 0 } },
  { id: "zhou", trumpCode: "H2", teamName: "Stake F1 Team", teamColorClass: "bg-[#52E252]", pilotName: "Guanyu Zhou", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/G/GUAZHO01_Guanyu_Zhou/guazho01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/cn.png", isSuperTrump: false, stats: { wins: 0, topSpeed: 336, experience: 58, championships: 0 } },
  { id: "albon", trumpCode: "I1", teamName: "Williams", teamColorClass: "bg-[#005AFF]", pilotName: "Alex Albon", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/A/ALEALB01_Alex_Albon/alealb01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/th.png", isSuperTrump: false, stats: { wins: 0, topSpeed: 338, experience: 85, championships: 0 } },
  { id: "sargeant", trumpCode: "I2", teamName: "Williams", teamColorClass: "bg-[#005AFF]", pilotName: "Logan Sargeant", pilotImageSrc: "https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/L/LOGSAR01_Logan_Sargeant/logsar01.png.transform/2col/image.png", pilotFlagSrc: "https://flagcdn.com/w40/us.png", isSuperTrump: false, stats: { wins: 0, topSpeed: 337, experience: 43, championships: 0 } },
];