# Triador de Cobrança e Reembolso

> Ferramenta de automação para triagem de solicitações e geração de mensagens personalizadas de atendimento ao cliente, desenvolvida em **JavaScript (Node.js)**.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/uso-educacional-blue)

---

## Sobre o projeto

Em equipes de atendimento ao cliente, a análise manual de planilhas de cobrança e reembolso — e a redação repetitiva de mensagens para cada solicitação — consome horas do dia útil.

O **Triador de Cobrança e Reembolso** automatiza esse fluxo: lê planilhas Excel com as solicitações pendentes, aplica regras de negócio para classificar a prioridade de cada uma e gera automaticamente mensagens personalizadas, prontas para copiar e enviar ao cliente. O resultado é um ganho direto de eficiência operacional, com menos tempo gasto em tarefas repetitivas e mais consistência nas respostas enviadas.

---

## Funcionalidades

- Leitura de planilhas Excel com estrutura predefinida
- Classificação automática de prioridade por tipo de solicitação
- Geração de mensagens personalizadas para cada cliente
- Criação de aba de resumo com estatísticas por prioridade
- Interface de linha de comando (CLI) com argumentos
- Modo preview, para visualizar o resultado sem gerar arquivo
- Validação robusta de entrada e tratamento de erros
- Código modular e documentado, fácil de manter e estender

---

## Arquitetura

| Tecnologia | Uso |
|---|---|
| **Node.js** | Runtime da aplicação |
| **JavaScript (ES Modules)** | Linguagem principal |
| **xlsx (SheetJS)** | Leitura e escrita de planilhas Excel |
| **yargs** | Interface de linha de comando |

---

## Requisitos

- Node.js 18 ou superior
- npm

---

## Instalação

```bash
# Clone o repositório
git clone https://github.com/eorennan/triador-cobranca-reembolso.git
cd triador-cobranca-reembolso

# Instale as dependências
npm install
```

---

## Como usar

### Estrutura da planilha de entrada

A planilha deve conter as seguintes colunas:

| Coluna | Descrição |
|---|---|
| `Cliente` | Nome do cliente |
| `Tipo` | Tipo da solicitação (`Reembolso` ou `Cobrança`) |
| `Valor` | Valor da solicitação (numérico) |
| `Motivo_Status` | Motivo da solicitação ou status atual |
| `Dias_Atraso_ou_Prazo` | Dias em atraso ou prazo restante |

### Comandos disponíveis

| Comando | Descrição |
|---|---|
| `node criar_teste.js` | Gera uma planilha de exemplo para testes |
| `node src/index.js --entrada <arquivo>` | Processa a planilha e gera arquivo de saída |
| `node src/index.js --entrada <arquivo> --preview` | Processa a planilha e exibe o resultado no terminal, sem salvar |
| `node src/index.js --entrada <arquivo> --saida <nome>` | Processa e salva o resultado com nome personalizado |

### Exemplos

```bash
# Criar planilha de teste
node criar_teste.js

# Processar planilha
node src/index.js --entrada dados/solicitacoes.xlsx

# Visualizar resultados sem salvar
node src/index.js --entrada dados/solicitacoes.xlsx --preview

# Salvar com nome específico
node src/index.js --entrada dados/solicitacoes.xlsx --saida relatorio_operacao.xlsx
```

---

## Estrutura do projeto

```
triador-cobranca-reembolso/
├── src/
│   ├── index.js          # Ponto de entrada (CLI)
│   ├── leitor.js         # Leitura da planilha
│   ├── triador.js        # Regras de prioridade
│   ├── mensagens.js      # Geração de mensagens
│   ├── escritor.js       # Escrita do resultado
│   └── config.js         # Constantes e regras
├── dados/                # Planilhas de entrada
├── resultados/           # Planilhas geradas
├── criar_teste.js        # Script para gerar planilha de exemplo
├── .gitignore
├── package.json
└── README.md
```

---

## Configuração

As regras de negócio podem ser ajustadas em `src/config.js`:

```javascript
export const REGRAS = {
  VALOR_LIMITE_ALTO: 1000,    // Reembolsos acima disso vão para aprovação especial
  DIAS_PARA_CRITICO: 30,      // Cobranças com mais de X dias são consideradas críticas
  // ...
};
```

---

## 📄 Licença

Licenciamento para fins educacionais — Copyright © 2026

**Permissões**
- Uso educacional e de estudo
- Execução para fins não comerciais
- Fork para estudo pessoal
- Modificação para aprendizado

**Restrições**
- ❌ Uso comercial sem autorização prévia
- ❌ Distribuição sem atribuição ao autor

---

## Desenvolvedor

**Renan Costa Pereira**

[![GitHub](https://img.shields.io/badge/GitHub-perfil-181717?logo=github)](https://github.com/eorennan)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-perfil-0A66C2?logo=linkedin)](https://www.linkedin.com/in/renan-costa-pereira-5354ab3b9)

---

## ⚠️ Aviso legal

Este software é fornecido "como está", sem garantias de qualquer tipo. O desenvolvedor não se responsabiliza por qualquer uso indevido ou danos causados pela utilização desta ferramenta.

O usuário é responsável por garantir que o uso desta ferramenta está em conformidade com as políticas da empresa e leis aplicáveis.
