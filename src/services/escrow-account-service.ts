import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import { PaymentGetResponseDto } from "../models/payment";

/**
 * Serviço para gerenciamento de contas garantia (Escrow)
 */
export class EscrowAccountService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Finaliza pagamento em conta garantia
   *
   * @param id - Identificador único do pagamento em conta garantia
   * @param input - Dados para finalização (opcional)
   * @returns Promise com pagamento finalizado
   * @throws {ApiError} Em caso de erro na API
   */
  async finishPaymentEscrowInTheEscrowAccount(id: string, input?: Record<string, any>): Promise<PaymentGetResponseDto> {
    const request = this.buildFinishPaymentEscrowInTheEscrowAccountRequest(id, input || {});
    return this.execute<PaymentGetResponseDto>(request);
  }

  /**
   * Finaliza pagamento em conta garantia (versão assíncrona)
   */
  async finishPaymentEscrowInTheEscrowAccountAsync(
    id: string,
    input?: Record<string, any>
  ): Promise<PaymentGetResponseDto> {
    return this.finishPaymentEscrowInTheEscrowAccount(id, input);
  }

  // Métodos privados para construção de requisições

  private buildFinishPaymentEscrowInTheEscrowAccountRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/escrow/{id}/finish");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }
}

