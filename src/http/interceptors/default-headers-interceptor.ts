import { InternalAxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../../config/asaas-sdk-config";

/**
 * Cria um interceptor de requisição Axios para adicionar headers padrão.
 */
export function createDefaultHeadersInterceptor(config: AsaasSdkConfig) {
  return (requestConfig: InternalAxiosRequestConfig) => {
    if (config.userAgent) {
      requestConfig.headers["User-Agent"] = config.userAgent;
    }
    return requestConfig;
  };
}

