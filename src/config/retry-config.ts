import { HttpMethod } from "../http/http-method";

/**
 * Configuração de retry para requisições HTTP
 */
export interface RetryConfig {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  backoffFactor: number;
  jitter: number;
  statusCodesToRetry: number[];
  httpMethodsToRetry: HttpMethod[];
  exceptionsToRetry: (new (...args: any[]) => Error)[];
}

/**
 * Configuração padrão de retry
 */
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 1,
  initialDelay: 150,
  maxDelay: 1000,
  backoffFactor: 2,
  jitter: 150,
  statusCodesToRetry: [408, 429, 500, 502, 503, 504],
  httpMethodsToRetry: [HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE],
  exceptionsToRetry: [],
};

