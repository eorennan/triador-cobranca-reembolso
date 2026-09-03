import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';

function gerarResumo(resultados) {
  const resumo = {};
  let valorTotal = 0;
  
  resultados.forEach(item => {
    const prioridade = item.prioridade || 'Nao Classificado';
    
    if (!resumo[prioridade]) {
      resumo[prioridade] = {
        quantidade: 0,
        valorTotal: 0
      };
    }
    
    resumo[prioridade].quantidade++;
    resumo[prioridade].valorTotal += item.valor || 0;
    valorTotal += item.valor || 0;
  });
  
  const dadosResumo = Object.keys(resumo).map(prioridade => ({
    prioridade,
    quantidade: resumo[prioridade].quantidade,
    valorTotal: resumo[prioridade].valorTotal
  }));
  
  dadosResumo.push({
    prioridade: 'TOTAL',
    quantidade: resultados.length,
    valorTotal
  });
  
  return dadosResumo;
}

export function salvarResultado(caminho, dados, resultados) {
  try {
    const diretorio = path.dirname(caminho);
    if (!fs.existsSync(diretorio)) {
      fs.mkdirSync(diretorio, { recursive: true });
    }
    
    const dadosCompletos = dados.map((item, index) => ({
      ...item,
      Prioridade_Triagem: resultados[index].prioridade,
      Mensagem_Customizada_Pronta: resultados[index].mensagem
    }));
    
    const resumo = gerarResumo(dadosCompletos);
    
    const workbook = xlsx.utils.book_new();
    
    const abaPrincipal = xlsx.utils.json_to_sheet(dadosCompletos);
    xlsx.utils.book_append_sheet(workbook, abaPrincipal, 'Triagem');
    
    const abaResumo = xlsx.utils.json_to_sheet(resumo);
    xlsx.utils.book_append_sheet(workbook, abaResumo, 'Resumo');
    
    xlsx.writeFile(workbook, caminho);
    
    console.log(`Arquivo salvo em: ${caminho}`);
    console.log(`${dados.length} solicitações processadas`);
    console.log('Aba "Triagem" com os detalhes');
    console.log('Aba "Resumo" com estatísticas');
    
  } catch (erro) {
    console.error(`Erro ao salvar arquivo: ${erro.message}`);
    throw erro;
  }
}