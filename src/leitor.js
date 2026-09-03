import fs from 'fs';
import xlsx from 'xlsx';
import { REGRAS } from './config.js';

function validarColunas(dados) {
  const colunasEsperadas = Object.values(REGRAS.COLUNAS);
  const colunasExistentes = Object.keys(dados[0] || {});
  
  const colunasFaltando = colunasEsperadas.filter(
    coluna => !colunasExistentes.includes(coluna)
  );
  
  if (colunasFaltando.length > 0) {
    console.error(`Colunas faltando: ${colunasFaltando.join(', ')}`);
    console.error(`Esperadas: ${colunasEsperadas.join(', ')}`);
    return false;
  }
  
  return true;
}

export function lerPlanilha(caminho) {
  try {
    if (!fs.existsSync(caminho)) {
      throw new Error(`Arquivo não encontrado: ${caminho}`);
    }
    
    console.log(`Lendo arquivo: ${caminho}`);
    
    const workbook = xlsx.readFile(caminho);
    const primeiraAba = workbook.SheetNames[0];
    const dados = xlsx.utils.sheet_to_json(workbook.Sheets[primeiraAba]);
    
    if (dados.length === 0) {
      throw new Error('A planilha está vazia');
    }
    
    if (!validarColunas(dados)) {
      throw new Error('Estrutura da planilha inválida');
    }
    
    console.log(`${dados.length} solicitações encontradas`);
    return dados;
    
  } catch (erro) {
    console.error(`Erro ao ler planilha: ${erro.message}`);
    throw erro;
  }
}