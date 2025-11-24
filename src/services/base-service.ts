import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ApiError } from "../exceptions/api-error";
import { ModelConverter } from "../http/model-converter";
import { Environment } from "../http/environment";

interface ErrorMapping {
  modelClass: any; // Interface or class for the error response body
  exceptionClass: new (errorModel: any, message: string, status: number, response?: AxiosResponse) => ApiError;
}

/**
 * Classe base abstrata para todos os serviços da API.
 * Fornece funcionalidades comuns como gerenciamento do cliente HTTP,
 * configuração e mapeamento de erros.
 */
export abstract class BaseService {
  protected httpClient: AxiosInstance;
  protected config: AsaasSdkConfig;
  protected errorMappings: Map<number, ErrorMapping>;

  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    this.httpClient = httpClient;
    this.config = config;
    this.errorMappings = new Map<number, ErrorMapping>();
  }

  /**
   * Define a URL base da API.
   * @param baseUrl A nova URL base.
   */
  public setBaseUrl(baseUrl: string): void {
    this.config.baseUrl = baseUrl;
    this.httpClient.defaults.baseURL = baseUrl;
  }

  /**
   * Define o ambiente da API (Production ou Sandbox).
   * @param environment O ambiente a ser configurado.
   */
  public setEnvironment(environment: Environment): void {
    this.config.environment = environment;
    this.config.baseUrl = environment;
    this.httpClient.defaults.baseURL = environment;
  }

  /**
   * Adiciona um mapeamento de erro para um status HTTP específico.
   * @param status O status HTTP para o qual o erro será mapeado.
   * @param modelClass A classe do modelo de erro esperado no corpo da resposta.
   * @param exceptionClass A classe da exceção a ser lançada.
   */
  protected addErrorMapping(
    status: number,
    modelClass: any,
    exceptionClass: new (errorModel: any, message: string, status: number, response?: AxiosResponse) => ApiError
  ): void {
    this.errorMappings.set(status, { modelClass, exceptionClass });
  }

  /**
   * Extrai a mensagem de erro de uma resposta.
   * @param response A resposta Axios.
   * @param errorModel O modelo de erro deserializado (opcional).
   * @returns A mensagem de erro.
   */
  private extractErrorMessage(response: AxiosResponse, errorModel: any): string {
    let message: string | undefined;

    if (errorModel && typeof errorModel.getMessage === "function") {
      message = errorModel.getMessage();
    }

    if (!message || message.trim() === "") {
      message = response.statusText;
    }

    if (!message || message.trim() === "") {
      message = `${response.status} error in request to: ${response.config.url}`;
    }

    return message;
  }

  /**
   * Executa uma requisição HTTP e retorna o resultado tipado.
   * Lança uma ApiError em caso de falha.
   * @param requestConfig A configuração da requisição Axios.
   * @returns Uma Promise que resolve com o resultado tipado.
   * @throws {ApiError} Em caso de erro na requisição ou na API.
   */
  protected async execute<T>(requestConfig: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse = await this.httpClient.request(requestConfig);
      return ModelConverter.convert<T>(response);
    } catch (error: any) {
      if (error.response) {
        // Erro de resposta da API (status code 4xx ou 5xx)
        const status = error.response.status;
        const errorMapping = this.errorMappings.get(status);

        if (errorMapping) {
          try {
            const errorModel = ModelConverter.convert(error.response);
            const message = this.extractErrorMessage(error.response, errorModel);
            throw new errorMapping.exceptionClass(errorModel, message, status, error.response);
          } catch (deserializationError: any) {
            // Se falhar a deserialização do modelo de erro, lança um ApiError genérico
            throw new ApiError(
              `Failed to deserialize error response for status ${status}. Original error: ${deserializationError?.message || String(deserializationError)}`,
              status,
              error.response
            );
          }
        }
        // Se não houver mapeamento específico, lança um ApiError genérico
        throw new ApiError(this.extractErrorMessage(error.response, null), status, error.response);
      } else if (error.request) {
        // A requisição foi feita, mas nenhuma resposta foi recebida (ex: timeout, rede)
        throw new ApiError("No response received from server.", 0, undefined);
      } else {
        // Algo aconteceu na configuração da requisição que disparou um erro
        throw new ApiError(`Request setup error: ${error.message}`, 0, undefined);
      }
    }
  }

  /**
   * Executa uma requisição HTTP assíncrona e retorna o resultado tipado.
   * @param requestConfig A configuração da requisição Axios.
   * @returns Uma Promise que resolve com o resultado tipado.
   * @throws {ApiError} Em caso de erro na requisição ou na API.
   */
  protected async executeAsync<T>(requestConfig: AxiosRequestConfig): Promise<T> {
    return this.execute<T>(requestConfig); // Reutiliza a lógica do execute
  }
}

