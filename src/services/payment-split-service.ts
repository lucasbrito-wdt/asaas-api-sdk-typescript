import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListPaidSplitsParameters,
  ListReceivedSplitsParameters,
  PaymentSplitGetResponseDto,
  PaymentSplitListResponseDto,
} from "../models/payment-split";

/**
 * Serviço para gerenciamento de splits de pagamento
 */
export class PaymentSplitService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Obtém um split pago específico
   *
   * @param id - Identificador único do split
   * @returns Promise com os dados do split
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASinglePaidSplit(id: string): Promise<PaymentSplitGetResponseDto> {
    const request = this.buildRetrieveASinglePaidSplitRequest(id);
    return this.execute<PaymentSplitGetResponseDto>(request);
  }

  /**
   * Obtém um split pago específico (versão assíncrona)
   */
  async retrieveASinglePaidSplitAsync(id: string): Promise<PaymentSplitGetResponseDto> {
    return this.retrieveASinglePaidSplit(id);
  }

  /**
   * Lista splits pagos
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de splits pagos
   * @throws {ApiError} Em caso de erro na API
   */
  async listPaidSplits(params?: ListPaidSplitsParameters): Promise<PaymentSplitListResponseDto> {
    const request = this.buildListPaidSplitsRequest(params);
    return this.execute<PaymentSplitListResponseDto>(request);
  }

  /**
   * Lista splits pagos (versão assíncrona)
   */
  async listPaidSplitsAsync(params?: ListPaidSplitsParameters): Promise<PaymentSplitListResponseDto> {
    return this.listPaidSplits(params);
  }

  /**
   * Obtém um split recebido específico
   *
   * @param id - Identificador único do split
   * @returns Promise com os dados do split
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleReceivedSplit(id: string): Promise<PaymentSplitGetResponseDto> {
    const request = this.buildRetrieveASingleReceivedSplitRequest(id);
    return this.execute<PaymentSplitGetResponseDto>(request);
  }

  /**
   * Obtém um split recebido específico (versão assíncrona)
   */
  async retrieveASingleReceivedSplitAsync(id: string): Promise<PaymentSplitGetResponseDto> {
    return this.retrieveASingleReceivedSplit(id);
  }

  /**
   * Lista splits recebidos
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de splits recebidos
   * @throws {ApiError} Em caso de erro na API
   */
  async listReceivedSplits(params?: ListReceivedSplitsParameters): Promise<PaymentSplitListResponseDto> {
    const request = this.buildListReceivedSplitsRequest(params);
    return this.execute<PaymentSplitListResponseDto>(request);
  }

  /**
   * Lista splits recebidos (versão assíncrona)
   */
  async listReceivedSplitsAsync(params?: ListReceivedSplitsParameters): Promise<PaymentSplitListResponseDto> {
    return this.listReceivedSplits(params);
  }

  // Métodos privados para construção de requisições

  private buildRetrieveASinglePaidSplitRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/payments/splits/paid/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildListPaidSplitsRequest(params?: ListPaidSplitsParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/payments/splits/paid");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("paymentId", params.paymentId)
        .setOptionalQueryParameter("paymentConfirmedDate[ge]", params.paymentConfirmedDateGe)
        .setOptionalQueryParameter("paymentConfirmedDate[le]", params.paymentConfirmedDateLe)
        .setOptionalQueryParameter("creditDate[ge]", params.creditDateGe)
        .setOptionalQueryParameter("creditDate[le]", params.creditDateLe);

      if (params.status) {
        builder.setOptionalQueryParameter("status", params.status);
      }
    }

    return builder.build();
  }

  private buildRetrieveASingleReceivedSplitRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/payments/splits/received/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildListReceivedSplitsRequest(params?: ListReceivedSplitsParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/payments/splits/received");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("paymentId", params.paymentId)
        .setOptionalQueryParameter("paymentConfirmedDate[ge]", params.paymentConfirmedDateGe)
        .setOptionalQueryParameter("paymentConfirmedDate[le]", params.paymentConfirmedDateLe)
        .setOptionalQueryParameter("creditDate[ge]", params.creditDateGe)
        .setOptionalQueryParameter("creditDate[le]", params.creditDateLe);

      if (params.status) {
        builder.setOptionalQueryParameter("status", params.status);
      }
    }

    return builder.build();
  }
}

