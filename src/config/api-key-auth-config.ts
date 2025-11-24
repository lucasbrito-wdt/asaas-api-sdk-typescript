/**
 * Configuração de autenticação por API Key
 */
export interface ApiKeyAuthConfig {
  apiKeyHeader: string;
  apiKey?: string;
}

/**
 * Configuração padrão de autenticação por API Key
 */
export const DEFAULT_API_KEY_AUTH_CONFIG: ApiKeyAuthConfig = {
  apiKeyHeader: "access_token",
};

