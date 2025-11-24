import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import { PaymentGetResponseDto } from "../models/payment";

/**
 * Serviço para ações de sandbox (apenas ambiente de testes)
 */
export class SandboxActionsService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * (Sandbox apenas) Confirma pagamento
   *
   * @param id - Identificador único do pagamento
   * @param input - Dados para confirmação (opcional)
   * @returns Promise com pagamento confirmado
   * @throws {ApiError} Em caso de erro na API
   */
  async confirmPayment(id: string, input?: Record<string, any>): Promise<PaymentGetResponseDto> {
    const request = this.buildConfirmPaymentRequest(id, input || {});
    return this.execute<PaymentGetResponseDto>(request);
  }

  /**
   * (Sandbox apenas) Confirma pagamento (versão assíncrona)
   */
  async confirmPaymentAsync(id: string, input?: Record<string, any>): Promise<PaymentGetResponseDto> {
    return this.confirmPayment(id, input);
  }

  /**
   * (Sandbox apenas) Força vencimento de cobrança
   *
   * @param id - Identificador único do pagamento
   * @param input - Dados para forçar vencimento (opcional)
   * @returns Promise com pagamento vencido
   * @throws {ApiError} Em caso de erro na API
   */
  async forceExpire(id: string, input?: Record<string, any>): Promise<PaymentGetResponseDto> {
    const request = this.buildForceExpireRequest(id, input || {});
    return this.execute<PaymentGetResponseDto>(request);
  }

  /**
   * (Sandbox apenas) Força vencimento de cobrança (versão assíncrona)
   */
  async forceExpireAsync(id: string, input?: Record<string, any>): Promise<PaymentGetResponseDto> {
    return this.forceExpire(id, input);
  }

  // Métodos privados para construção de requisições

  private buildConfirmPaymentRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/sandbox/payment/{id}/confirm");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }

  private buildForceExpireRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/sandbox/payment/{id}/overdue");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }
}

