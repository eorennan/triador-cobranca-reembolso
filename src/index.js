import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { lerPlanilha } from './leitor.js';
import { classificarPrioridade } from './triador.js';
import { gerarMensagem } from './mensagens.js';
import { salvarResultado } from './escritor.js';

// CLI
const argv = yargs(hideBin(process.argv))
  .option('entrada', {
    alias: 'e',
    description: 'Caminho da planilha de entrada',
    type: 'string',
    demandOption: true
  })
  .option('saida', {
    alias: 's',
    description: 'Caminho da planilha de saída',
    type: 'string',
    default: 'resultados/relatorio_triagem.xlsx'
  })
  .option('preview', {
    alias: 'p',
    description: 'Exibir resultados no terminal sem salvar',
    type: 'boolean',
    default: false
  })
  .help()
  .argv;

/**
 * exibe no terminal
 */
function exibirEstatisticas(resultados) {
  const contagem = {};
  let valorTotal = 0;
  
  resultados.forEach(item => {
    const prioridade = item.prioridade || 'Não Classificado';
    contagem[prioridade] = (contagem[prioridade] || 0) + 1;
    valorTotal += item.valor || 0;
  });
  
  console.log('\nESTATÍSTICAS DA TRIAGEM');
  console.log('═'.repeat(50));
  
  Object.entries(contagem).forEach(([prioridade, quantidade]) => {
    const icone = prioridade.includes('CRÍTICA') || prioridade.includes('ALTA') ? '🔴' :
                  prioridade.includes('MÉDIA') ? '🟡' :
                  prioridade.includes('BAIXA') ? '🟢' : '⚪';
    console.log(`${icone} ${prioridade}: ${quantidade} casos`);
  });
  
  console.log('═'.repeat(50));
  console.log(`Valor total envolvido: R$ ${valorTotal.toFixed(2)}`);
  console.log(`Total de solicitações: ${resultados.length}`);
  console.log('═'.repeat(50));
}

async function main() {
  console.log('\nTRIADOR DE COBRANÇA E REEMBOLSO');
  console.log('═'.repeat(50));
  
  try {
    const dados = lerPlanilha(argv.entrada);
    
    console.log('\n Processando solicitações...');
    
    const resultados = dados.map((solicitacao, index) => {
      const cliente = solicitacao['Cliente'];
      const tipo = solicitacao['Tipo'];
      const valor = parseFloat(solicitacao['Valor']) || 0;
      const motivo = solicitacao['Motivo_Status'] || '';
      const dias = parseInt(solicitacao['Dias_Atraso_ou_Prazo']) || 0;
      
      const classificacao = classificarPrioridade({
        tipo,
        valor,
        dias
      });
      
      const mensagem = gerarMensagem({
        cliente,
        tipo,
        valor,
        motivo,
        dias
      }, classificacao);
      
      return {
        ...solicitacao,
        prioridade: classificacao.prioridade,
        nivel: classificacao.nivel,
        mensagem,
        valor
      };
    });
    
    exibirEstatisticas(resultados);
    
    if (argv.preview) {
      console.log('\nPREVIEW DOS RESULTADOS');
      console.log('═'.repeat(50));
      
      resultados.slice(0, 3).forEach((item, index) => {
        console.log(`\nCaso ${index + 1}: ${item['Cliente']}`);
        console.log(`   Prioridade: ${item.prioridade}`);
        console.log(`   Mensagem: ${item.mensagem.substring(0, 80)}...`);
      });
      
      if (resultados.length > 3) {
        console.log(`\n... e mais ${resultados.length - 3} casos`);
      }
      
      console.log('\nUse --preview sem --saida para visualizar, ou remova --preview para salvar o arquivo.');
      
    } else {
      // Salva o resultado
      salvarResultado(argv.saida, dados, resultados);
    }
    
    console.log('\n✅ Processamento concluído com sucesso!');
    
  } catch (erro) {
    console.error(`\n❌ Falha no processamento: ${erro.message}`);
    process.exit(1);
  }
}

main();