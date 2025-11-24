import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { RetryConfig, DEFAULT_RETRY_CONFIG } from "../../config/retry-config";
import { HttpMethod } from "../http-method";

/**
 * Cria um interceptor de resposta Axios para implementar a lógica de retry.
 */
export function createRetryInterceptor(retryConfig: Partial<RetryConfig> | undefined, axios: AxiosInstance) {
  const config: RetryConfig = { ...DEFAULT_RETRY_CONFIG, ...retryConfig };
  let currentRetries = 0;

  const calculateDelay = (attempt: number): number => {
    const delay = config.initialDelay * Math.pow(config.backoffFactor, attempt - 1);
    return Math.min(delay, config.maxDelay);
  };

  const isRetryable = (error: AxiosError): boolean => {
    if (!error.response) {
      // Network error, timeout, etc.
      return true;
    }

    const isRetryableStatusCode = config.statusCodesToRetry.includes(error.response.status);
    const isRetryableMethod = config.httpMethodsToRetry.includes(
      (error.config?.method?.toUpperCase() as HttpMethod) || HttpMethod.GET
    );

    return isRetryableStatusCode && isRetryableMethod;
  };

  const onFulfilled = (response: AxiosResponse) => {
    currentRetries = 0; // Reset retry count on success
    return response;
  };

  const onRejected = async (error: AxiosError) => {
    if (currentRetries < config.maxRetries && isRetryable(error)) {
      currentRetries++;
      const delay = calculateDelay(currentRetries);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return axios.request(error.config as AxiosRequestConfig);
    }
    currentRetries = 0; // Reset retry count on final failure
    return Promise.reject(error);
  };

  return { onFulfilled, onRejected };
}

