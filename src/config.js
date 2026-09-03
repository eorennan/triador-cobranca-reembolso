export const REGRAS = {
  VALOR_LIMITE_ALTO: 1000,
  DIAS_PARA_CRITICO: 30,
  COLUNAS: {
    CLIENTE: 'Cliente',
    TIPO: 'Tipo',
    VALOR: 'Valor',
    MOTIVO: 'Motivo_Status',
    DIAS: 'Dias_Atraso_ou_Prazo'
  },
  PRIORIDADES: {
    CRITICA: { nome: 'CRITICA (Acordo Urgente)', nivel: 3 },
    ALTA: { nome: 'ALTA (Requer Alçada Superior)', nivel: 3 },
    MEDIA: { nome: 'MEDIA (Fluxo Padrão)', nivel: 2 },
    BAIXA: { nome: 'BAIXA (Lembrete Amigável)', nivel: 1 },
    MANUAL: { nome: 'Análise Manual', nivel: 0 }
  }
};