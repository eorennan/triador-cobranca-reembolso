export function gerarMensagem(solicitacao, classificacao) {
  const { cliente, tipo, valor, motivo, dias } = solicitacao;
  const { prioridade } = classificacao;
  
  const valorFormatado = valor.toFixed(2);
  
  if (tipo === 'Reembolso') {
    if (prioridade.includes('ALTA')) {
      return `Olá, ${cliente}! Recebemos sua solicitação de reembolso no valor de R$${valorFormatado} referente a: '${motivo}'. Devido ao valor, encaminhamos para validação do nosso time financeiro sênior. Retornaremos em até Xh.`;
    }
    return `Olá, ${cliente}! Confirmamos o recebimento do seu pedido de reembolso de R$${valorFormatado} (${motivo}). Ele já foi enviado para processamento bancário. O prazo para o crédito é de até X dias úteis.`;
  }
  
  if (tipo === 'Cobrança') {
    if (prioridade.includes('CRITICA')) {
      return `Prezado(a) ${cliente}, identificamos uma pendência em aberto há mais de ${dias} dias no valor de R$${valorFormatado}. Queremos te ajudar a regularizar isso da melhor forma! Responda a esta mensagem para conhecer nossas opções de parcelamento facilitado.`;
    }
    return `Olá, ${cliente}! Passando para lembrar que consta um pagamento pendente de R$${valorFormatado} (${motivo}). Caso já tenha realizado o pagamento, por favor, desconsidere esta mensagem ou nos envie o comprovante por aqui.`;
  }
  
  return `Olá, ${cliente}. Precisamos de mais informações sobre o seu caso para prosseguir com o atendimento.`;
}