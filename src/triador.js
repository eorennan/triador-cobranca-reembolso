import { REGRAS } from './config.js';

export function classificarPrioridade(solicitacao) {
  const { tipo, valor, dias } = solicitacao;
  
  if (tipo === 'Reembolso') {
    if (valor > REGRAS.VALOR_LIMITE_ALTO) {
      return {
        prioridade: REGRAS.PRIORIDADES.ALTA.nome,
        nivel: REGRAS.PRIORIDADES.ALTA.nivel
      };
    }
    return {
      prioridade: REGRAS.PRIORIDADES.MEDIA.nome,
      nivel: REGRAS.PRIORIDADES.MEDIA.nivel
    };
  }
  
  if (tipo === 'Cobrança') {
    if (dias > REGRAS.DIAS_PARA_CRITICO) {
      return {
        prioridade: REGRAS.PRIORIDADES.CRITICA.nome,
        nivel: REGRAS.PRIORIDADES.CRITICA.nivel
      };
    }
    return {
      prioridade: REGRAS.PRIORIDADES.BAIXA.nome,
      nivel: REGRAS.PRIORIDADES.BAIXA.nivel
    };
  }
  
  return {
    prioridade: REGRAS.PRIORIDADES.MANUAL.nome,
    nivel: REGRAS.PRIORIDADES.MANUAL.nivel
  };
}