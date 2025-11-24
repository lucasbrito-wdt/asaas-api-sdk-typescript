import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  PaymentRefundListResponseDto,
  PaymentBankSlipRefundResponseDto,
  PaymentRefundRequestDto,
} from "../models/payment";

/**
 * Serviço para gerenciamento de reembolsos de pagamentos
 */
export class PaymentRefundService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Obtém lista de reembolsos de um pagamento específico
   *
   * @param id - Identificador único do pagamento
   * @returns Promise com lista de reembolsos
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveRefundsOfASinglePayment(id: string): Promise<PaymentRefundListResponseDto> {
    const request = this.buildRetrieveRefundsOfASinglePaymentRequest(id);
    return this.execute<PaymentRefundListResponseDto>(request);
  }

  /**
   * Obtém lista de reembolsos de um pagamento específico (versão assíncrona)
   */
  async retrieveRefundsOfASinglePaymentAsync(id: string): Promise<PaymentRefundListResponseDto> {
    return this.retrieveRefundsOfASinglePayment(id);
  }

  /**
   * Reembolsa um boleto
   *
   * @param id - Identificador único do pagamento
   * @param input - Dados do reembolso (opcional)
   * @returns Promise com resposta do reembolso
   * @throws {ApiError} Em caso de erro na API
   */
  async refundBankSlip(id: string, input?: PaymentRefundRequestDto | Record<string, any>): Promise<PaymentBankSlipRefundResponseDto> {
    const request = this.buildRefundBankSlipRequest(id, input || {});
    return this.execute<PaymentBankSlipRefundResponseDto>(request);
  }

  /**
   * Reembolsa um boleto (versão assíncrona)
   */
  async refundBankSlipAsync(id: string, input?: PaymentRefundRequestDto | Record<string, any>): Promise<PaymentBankSlipRefundResponseDto> {
    return this.refundBankSlip(id, input);
  }

  // Métodos privados para construção de requisições

  private buildRetrieveRefundsOfASinglePaymentRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/payments/{id}/refunds");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildRefundBankSlipRequest(id: string, input: PaymentRefundRequestDto | Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/payments/{id}/bankSlip/refund");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }
}

