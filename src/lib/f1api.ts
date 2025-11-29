// src/lib/f1api.ts

import { Driver, driversList } from '@/data/drivers'; // Sua lista de stats de Super Trunfo

// --- URLs das APIs (Mantidas para referência) ---
const ERGAST_CURRENT_DRIVERS_URL = "http://ergast.com/api/f1/current/drivers.json";
const OPENF1_URL = "https://api.openf1.org/v1/drivers?session_key=9485"; 

// --- Interfaces para Tipagem das Respostas (Mantidas) ---
interface ErgastDriverResponse {
    MRData: {
        DriverTable: {
            Drivers: {
                driverId: string;
                code: string; 
                givenName: string;
                familyName: string;
            }[]
        }
    }
}

interface OpenF1DriverResponse {
    headshot_url: string;
    full_name: string;
    team_name: string;
    name_acronym: string; 
}

/**
 * Busca dados da API (Ergast/OpenF1) e faz o merge com as estatísticas locais de carreira.
 * ATENÇÃO: A lógica de FETCH foi desativada temporariamente para evitar o erro ECONNREFUSED no ambiente local.
 * @returns Lista de pilotos prontos para o GameController (usando o mock local).
 */
export async function fetchAllDrivers(): Promise<Driver[]> {
    
    // FALLBACK: Se o fetch falhar, retornamos a lista local
    const fallback = driversList; 
    
    console.log("--- Executando fetch LOCAL (API externa desativada para estabilidade) ---");

    /* // --- LÓGICA DE FETCH HÍBRIDA (COMENTADA PARA ESTABILIDADE) ---
    // Configuração de cache Next.js: Dados do grid não mudam diariamente, então cacheamos por 24h
    const fetchOptions = {
        next: { revalidate: 86400 } 
    };
    
    try {
        // 1. FETCH ERGAST (Lista oficial de quem está no grid)
        const ergastRes = await fetch(ERGAST_CURRENT_DRIVERS_URL, fetchOptions);
        if (!ergastRes.ok) {
            console.error("Falha ao buscar Ergast. Usando dados locais como fallback.");
            return fallback;
        }
        const ergastData: ErgastDriverResponse = await ergastRes.json();
        const ergastDrivers = ergastData.MRData.DriverTable.Drivers;
        
        // 2. FETCH OPENF1 (Imagens, Nome Completo)
        const openF1Res = await fetch(OPENF1_URL, fetchOptions);
        const openF1Drivers: OpenF1DriverResponse[] = openF1Res.ok ? await openF1Res.json() : [];

        // 3. PRÉ-PREPARAÇÃO DE MAPAS PARA MERGE RÁPIDO
        const localStatsMap = new Map<string, Driver>();
        driversList.forEach(d => localStatsMap.set(d.id, d));
        
        const openF1Map = new Map<string, OpenF1DriverResponse>();
        openF1Drivers.forEach(d => openF1Map.set(d.name_acronym.toLowerCase(), d));

        
        // 4. MERGE (Iterar pelo Ergast, que é a fonte de verdade do grid)
        const finalDrivers: Driver[] = ergastDrivers.map(ergastDriver => {
            const id = ergastDriver.code.toLowerCase();
            const localData = localStatsMap.get(id);
            const openF1Data = openF1Map.get(id);

            if (!localData) {
                 console.warn(`Piloto ${ergastDriver.code} encontrado na API, mas sem stats de Super Trunfo locais.`);
                 return null; 
            }

            return {
                ...localData, 
                id: id,
                trumpCode: ergastDriver.code,
                pilotName: openF1Data?.full_name || `${ergastDriver.givenName} ${ergastDriver.familyName}`,
                pilotImageSrc: openF1Data?.headshot_url || localData.pilotImageSrc, 
                teamName: openF1Data?.team_name || localData.teamName, 
            } as Driver;
        }).filter((d): d is Driver => d !== null); 

        if (finalDrivers.length > 0) {
            return finalDrivers;
        }
        
    } catch (error) {
        console.error("Erro fatal no fetch ou merge da API. Usando lista local.", error);
    }
    */
    
    // Retorno de segurança: Retorna a lista local (mock)
    return fallback;
}