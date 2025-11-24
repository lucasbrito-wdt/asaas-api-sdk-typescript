import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  BillingStatisticsParameters,
  FinanceBalanceResponseDto,
  FinanceGetPaymentStatisticsResponseDto,
  FinanceGetSplitStatisticsResponseDto,
} from "../models/finance";

/**
 * Serviço para estatísticas e informações financeiras
 */
export class FinanceService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Obtém o saldo da conta
   *
   * @returns Promise com o saldo da conta
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveAccountBalance(): Promise<FinanceBalanceResponseDto> {
    const request = this.buildRetrieveAccountBalanceRequest();
    return this.execute<FinanceBalanceResponseDto>(request);
  }

  /**
   * Obtém o saldo da conta (versão assíncrona)
   */
  async retrieveAccountBalanceAsync(): Promise<FinanceBalanceResponseDto> {
    return this.retrieveAccountBalance();
  }

  /**
   * Estatísticas de cobrança
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com estatísticas de cobrança
   * @throws {ApiError} Em caso de erro na API
   */
  async billingStatistics(params?: BillingStatisticsParameters): Promise<FinanceGetPaymentStatisticsResponseDto> {
    const request = this.buildBillingStatisticsRequest(params);
    return this.execute<FinanceGetPaymentStatisticsResponseDto>(request);
  }

  /**
   * Estatísticas de cobrança (versão assíncrona)
   */
  async billingStatisticsAsync(params?: BillingStatisticsParameters): Promise<FinanceGetPaymentStatisticsResponseDto> {
    return this.billingStatistics(params);
  }

  /**
   * Obtém valores de splits
   *
   * @returns Promise com estatísticas de splits
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveSplitValues(): Promise<FinanceGetSplitStatisticsResponseDto> {
    const request = this.buildRetrieveSplitValuesRequest();
    return this.execute<FinanceGetSplitStatisticsResponseDto>(request);
  }

  /**
   * Obtém valores de splits (versão assíncrona)
   */
  async retrieveSplitValuesAsync(): Promise<FinanceGetSplitStatisticsResponseDto> {
    return this.retrieveSplitValues();
  }

  // Métodos privados para construção de requisições

  private buildRetrieveAccountBalanceRequest(): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/finance/balance");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.build();
  }

  private buildBillingStatisticsRequest(params?: BillingStatisticsParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/finance/payment/statistics");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("customer", params.customer)
        .setOptionalQueryParameter("anticipated", params.anticipated)
        .setOptionalQueryParameter("dateCreated[ge]", params.dateCreatedGe)
        .setOptionalQueryParameter("dateCreated[le]", params.dateCreatedLe)
        .setOptionalQueryParameter("dueDate[ge]", params.dueDateGe)
        .setOptionalQueryParameter("dueDate[le]", params.dueDateLe)
        .setOptionalQueryParameter("estimatedCreditDate[ge]", params.estimatedCreditDateGe)
        .setOptionalQueryParameter("estimatedCreditDate[le]", params.estimatedCreditDateLe)
        .setOptionalQueryParameter("externalReference", params.externalReference);

      if (params.billingType) {
        builder.setOptionalQueryParameter("billingType", params.billingType);
      }
      if (params.status) {
        builder.setOptionalQueryParameter("status", params.status);
      }
    }

    return builder.build();
  }

  private buildRetrieveSplitValuesRequest(): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/finance/split/statistics");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.build();
  }
}

