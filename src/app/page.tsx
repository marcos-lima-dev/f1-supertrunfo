import { GameController } from '@/components/GameController';
import { fetchAllDrivers } from '@/lib/f1api'; // Este agora retorna apenas a lista local

// Home é um Server Component para buscar os dados iniciais
export default async function Home() {
  const initialDrivers = await fetchAllDrivers();

  return (
    // Ajustamos as classes do main para o novo background
    <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden p-4">
      {/* Overlay de partículas e gradientes para o fundo estilizado */}
      <div 
        className="absolute inset-0 z-0 opacity-40" 
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgba(14, 165, 233, 0.1) 0%, transparent 50%), url(/assets/bg-pattern.svg)',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Brilho laranja/vermelho do topo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-orange-600 to-transparent blur-3xl opacity-30 z-0"></div>
      
      {/* Brilho verde do fundo (para os botões) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-green-500 to-transparent blur-3xl opacity-20 z-0"></div>

      {/* O GameController fica por cima dos backgrounds */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        <GameController initialDrivers={initialDrivers} />
      </div>
    </main>
  );
}