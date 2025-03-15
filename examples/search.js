const mcp = require('../src/mcp');

async function exemploBuscaComponente() {
  try {
    // Busca por um componente de botão
    const resultados = await mcp.searchComponents('botão com ícone e loading state');
    console.log('Componentes encontrados:', resultados);
  } catch (error) {
    console.error('Erro no exemplo:', error);
  }
}

async function exemploGeracaoPrompt() {
  try {
    // Gera um prompt para criar um componente
    const prompt = await mcp.generatePrompt({
      type: 'component',
      description: 'Criar um botão de login com estado de loading',
      framework: 'react',
      style: 'tailwind'
    });
    console.log('Prompt gerado:', prompt);
  } catch (error) {
    console.error('Erro no exemplo:', error);
  }
}

// Executa os exemplos
exemploBuscaComponente();
exemploGeracaoPrompt();