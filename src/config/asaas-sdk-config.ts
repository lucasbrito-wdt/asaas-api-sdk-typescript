import { ApiKeyAuthConfig, DEFAULT_API_KEY_AUTH_CONFIG } from "./api-key-auth-config";
import { RetryConfig, DEFAULT_RETRY_CONFIG } from "./retry-config";
import { Environment } from "../http/environment";

/**
 * Configuração principal do SDK Asaas
 */
export interface AsaasSdkConfig {
  userAgent?: string;
  baseUrl?: string;
  retryConfig?: Partial<RetryConfig>;
  apiKeyAuthConfig?: Partial<ApiKeyAuthConfig>;
  timeout?: number;
  environment?: Environment;
}

/**
 * Cria uma configuração do SDK com valores padrão
 */
export function createAsaasSdkConfig(
  config?: AsaasSdkConfig
): Required<Omit<AsaasSdkConfig, "baseUrl" | "environment">> & { baseUrl: string; environment?: Environment } {
  const mergedConfig = {
    userAgent: config?.userAgent ?? "apisdk/1.0.0",
    retryConfig: { ...DEFAULT_RETRY_CONFIG, ...config?.retryConfig },
    apiKeyAuthConfig: { ...DEFAULT_API_KEY_AUTH_CONFIG, ...config?.apiKeyAuthConfig },
    timeout: config?.timeout ?? 10000,
    environment: config?.environment ?? Environment.DEFAULT,
  };

  const baseUrl = config?.baseUrl ?? mergedConfig.environment;

  return { ...mergedConfig, baseUrl };
}

