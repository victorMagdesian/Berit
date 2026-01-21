/**
 * ============================================================================
 * BERIT - Configurações Globais
 * ============================================================================
 * 
 * CONFIGURAÇÕES:
 * - alwaysCompare: Define se abre direto em modo comparação
 * - accessPassword: Senha de acesso ao sistema
 * - transitionDuration: Duração padrão das transições
 * 
 * MAINTENANCE:
 * - Alterar alwaysCompare para mudar comportamento inicial
 * - Senha pode ser alterada para diferentes ambientes
 * ============================================================================
 */

export const beritConfig = {
  // Define se o app abre direto no modo de comparação
  alwaysCompare: false,
  
  // Senha de acesso ao sistema
  accessPassword: '06122025',
  
  // Duração das transições em ms
  transitionDuration: 700,
  
  // Nome do sistema
  systemName: 'Berit',
  systemSubtitle: 'Aliança Sagrada',
  
  // Categorias de feedback do Modo Arquiteta
  feedbackCategories: {
    bug: 'Ajustar Brilho',
    idea: 'Expandir Horizonte',
  },
} as const

export type FeedbackCategory = keyof typeof beritConfig.feedbackCategories
