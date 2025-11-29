// src/lib/utils.ts

/**
 * Embaralha um array usando o algoritmo Fisher-Yates.
 * Usa um tipo genérico <T> para aceitar arrays de Pilotos, Times, ou qualquer outro objeto.
 */
export function shuffleArray<T>(array: T[]): T[] {
  // O restante do código é o mesmo:
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}