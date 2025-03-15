const axios = require('axios');
const config = require('../config.json');

class MCP {
  constructor() {
    this.api = axios.create({
      baseURL: config.api.baseUrl,
      headers: {
        'Authorization': `Bearer ${config.api.key}`,
        'Content-Type': 'application/json'
      },
      timeout: config.settings.timeout
    });
  }

  /**
   * Realiza uma busca semântica por componentes
   * @param {string} query - Query de busca em linguagem natural
   * @returns {Promise<Array>} Lista de componentes encontrados
   */
  async searchComponents(query) {
    try {
      const response = await this.api.post(config.components.search.endpoint, {
        query,
        maxResults: config.settings.maxResults
      });
      return response.data;
    } catch (error) {
      console.error('Erro na busca de componentes:', error.message);
      throw error;
    }
  }

  /**
   * Gera um prompt baseado nos parâmetros fornecidos
   * @param {Object} params - Parâmetros para geração do prompt
   * @returns {Promise<string>} Prompt gerado
   */
  async generatePrompt(params) {
    try {
      const response = await this.api.post(config.components.generate.endpoint, params);
      return response.data;
    } catch (error) {
      console.error('Erro na geração do prompt:', error.message);
      throw error;
    }
  }

  /**
   * Função de retry para chamadas à API
   * @param {Function} fn - Função a ser executada
   * @param {Array} args - Argumentos da função
   * @returns {Promise} Resultado da função
   */
  async retryOperation(fn, ...args) {
    let lastError;
    for (let i = 0; i < config.settings.retryAttempts; i++) {
      try {
        return await fn.apply(this, args);
      } catch (error) {
        lastError = error;
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    }
    throw lastError;
  }
}

module.exports = new MCP();