import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  RetrieveExtractParameters,
  FinancialTransactionListResponseDto,
} from "../models/financial-transaction";

/**
 * Serviço para transações financeiras e extrato
 */
export class FinancialTransactionService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Recupera extrato financeiro
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de transações financeiras
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveExtract(params?: RetrieveExtractParameters): Promise<FinancialTransactionListResponseDto> {
    const request = this.buildRetrieveExtractRequest(params);
    return this.execute<FinancialTransactionListResponseDto>(request);
  }

  /**
   * Recupera extrato financeiro (versão assíncrona)
   */
  async retrieveExtractAsync(params?: RetrieveExtractParameters): Promise<FinancialTransactionListResponseDto> {
    return this.retrieveExtract(params);
  }

  // Métodos privados para construção de requisições

  private buildRetrieveExtractRequest(params?: RetrieveExtractParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/financialTransactions");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("startDate", params.startDate)
        .setOptionalQueryParameter("finishDate", params.finishDate)
        .setOptionalQueryParameter("order", params.order);
    }

    return builder.build();
  }
}

