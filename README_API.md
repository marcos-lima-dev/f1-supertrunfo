📝 Arquitetura de Dados - F1 Arena Super Trunfo

Este documento consolida as decisões técnicas tomadas para integrar dados reais de Fórmula 1 no projeto Super Trunfo, substituindo os dados mockados.

1. Estratégia de Coleta de Dados (Arquitetura Híbrida)

Utilizamos uma abordagem de duas APIs gratuitas para obter dados em diferentes frequências:

API

Função (O que ela fornece)

Frequência de Busca

Jolpica F1 (Ergast-compatible)

Dados Históricos/Estatísticos: Vitórias, GPs totais, Títulos, Pontuação da Temporada.

Lenta: Uma vez ao iniciar a aplicação (cache de 1 hora no servidor).

OpenF1

Dados de Telemetria: Velocidade, Posição na pista, Tempos.

Rápida: Usada para a simulação de "Velocidade Máxima" (dados recentes da última qualificação).

Assets Locais (/public/images)

Recursos Visuais: Fotos dos pilotos, logos das equipes, cores primárias das equipes.

Sincronizada: Mapeada estaticamente no src/data/static-db.ts.

2. O Contrato de Dados (Schema Final)

Todos os dados brutos são transformados em um único objeto limpo (DriverCard) antes de serem injetados no Zustand.

Localização: src/types/game.ts

Campo da DriverCard

Tipo

Mapeamento da API / Lógica

id

string

Jolpica.Driver.driverId (ex: 'verstappen')

number

number

Jolpica.Driver.permanentNumber

name

string

Jolpica.Driver.givenName + familyName

color

string

Static DB (static-db.ts)

attributes.victories

number

Jolpica.wins (Total da carreira ou ano)

attributes.gps

number

Cálculo baseado em dados da Jolpica (Total de corridas).

attributes.titles

number

Cálculo baseado em Jolpica.driverStandings (Filtrar posição = 1).

attributes.maxSpeed

number

OpenF1 (Velocidade máxima da última sessão de Qualificação).

attributes.ppc

number

Cálculo: Pontos Totais / GPs (Usado como atributo de desempate).

3. Lógica de Estado do Jogo (Zustand Store)

A gestão do fluxo da partida é centralizada no useGameStore.

Localização: src/store/useGameStore.ts

Métodos Principais:

Método

Função

Disparado por...

initGame(deck)

Embaralha o baralho (deck) e distribui as cartas iniciais.

src/app/page.tsx (no carregamento do lado do servidor).

selectAttribute(attr)

Registra a escolha do jogador e inicia o atraso para a comparação.

Clique no componente StatItem.tsx.

cpuSelectAttribute()

Implementa a IA do jogo (escolhe o atributo de maior valor).

Chamado automaticamente se turn === 'cpu'.

compareCards()

Compara os valores e define o roundWinner (player, cpu, ou tie).

setTimeout após a escolha do atributo.

startNewRound()

Transfere as cartas vencidas para a pilha do ganhador e prepara a próxima mão.

setTimeout após a exibição do resultado.

Fluxo da Partida (Simplificado)

page.tsx ➡️ buildDeck() ➡️ GameArena.tsx ➡️ initGame() ➡️ status: 'selecting' ➡️ Clique no StatItem ➡️ selectAttribute() ➡️ compareCards() ➡️ startNewRound() 🔁

4. Próximos Passos (Checklist)

Para finalizar a funcionalidade do jogo, resta:

Conexão Final da UI: Ligar o seu componente StatItem.tsx aos métodos useGameStore.getState().selectAttribute(attr).

Display de Status: Exibir o estado (status: 'round_end') no GameArena para o usuário ver quem ganhou antes da próxima rodada.