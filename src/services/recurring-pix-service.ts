import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListRecurrencesParameters,
  ListRecurrenceItemsParameters,
  PixRecurringTransactionGetResponseDto,
  PixRecurringTransactionListResponseDto,
  PixRecurringTransactionGetItemResponseDto,
  RecurringPixTransactionListItemsResponseDto,
} from "../models/recurring-pix";

/**
 * Serviço para gerenciamento de recorrências PIX
 */
export class RecurringPixService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista recorrências PIX
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de recorrências
   * @throws {ApiError} Em caso de erro na API
   */
  async listRecurrences(params?: ListRecurrencesParameters): Promise<PixRecurringTransactionListResponseDto> {
    const request = this.buildListRecurrencesRequest(params);
    return this.execute<PixRecurringTransactionListResponseDto>(request);
  }

  /**
   * Lista recorrências PIX (versão assíncrona)
   */
  async listRecurrencesAsync(params?: ListRecurrencesParameters): Promise<PixRecurringTransactionListResponseDto> {
    return this.listRecurrences(params);
  }

  /**
   * Obtém uma recorrência específica
   *
   * @param id - Identificador único da recorrência
   * @returns Promise com os dados da recorrência
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleRecurrence(id: string): Promise<PixRecurringTransactionGetResponseDto> {
    const request = this.buildRetrieveASingleRecurrenceRequest(id);
    return this.execute<PixRecurringTransactionGetResponseDto>(request);
  }

  /**
   * Obtém uma recorrência específica (versão assíncrona)
   */
  async retrieveASingleRecurrenceAsync(id: string): Promise<PixRecurringTransactionGetResponseDto> {
    return this.retrieveASingleRecurrence(id);
  }

  /**
   * Cancela uma recorrência
   *
   * @param id - Identificador único da recorrência
   * @param input - Dados do cancelamento (opcional)
   * @returns Promise com a recorrência cancelada
   * @throws {ApiError} Em caso de erro na API
   */
  async cancelARecurrence(id: string, input?: Record<string, any>): Promise<PixRecurringTransactionGetResponseDto> {
    const request = this.buildCancelARecurrenceRequest(id, input || {});
    return this.execute<PixRecurringTransactionGetResponseDto>(request);
  }

  /**
   * Cancela uma recorrência (versão assíncrona)
   */
  async cancelARecurrenceAsync(
    id: string,
    input?: Record<string, any>
  ): Promise<PixRecurringTransactionGetResponseDto> {
    return this.cancelARecurrence(id, input);
  }

  /**
   * Lista itens de uma recorrência
   *
   * @param id - Identificador único da recorrência
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de itens
   * @throws {ApiError} Em caso de erro na API
   */
  async listRecurrenceItems(
    id: string,
    params?: ListRecurrenceItemsParameters
  ): Promise<RecurringPixTransactionListItemsResponseDto> {
    const request = this.buildListRecurrenceItemsRequest(id, params);
    return this.execute<RecurringPixTransactionListItemsResponseDto>(request);
  }

  /**
   * Lista itens de uma recorrência (versão assíncrona)
   */
  async listRecurrenceItemsAsync(
    id: string,
    params?: ListRecurrenceItemsParameters
  ): Promise<RecurringPixTransactionListItemsResponseDto> {
    return this.listRecurrenceItems(id, params);
  }

  /**
   * Cancela um item de recorrência
   *
   * @param id - Identificador único do item de recorrência
   * @param input - Dados do cancelamento (opcional)
   * @returns Promise com o item cancelado
   * @throws {ApiError} Em caso de erro na API
   */
  async cancelARecurrenceItem(
    id: string,
    input?: Record<string, any>
  ): Promise<PixRecurringTransactionGetItemResponseDto> {
    const request = this.buildCancelARecurrenceItemRequest(id, input || {});
    return this.execute<PixRecurringTransactionGetItemResponseDto>(request);
  }

  /**
   * Cancela um item de recorrência (versão assíncrona)
   */
  async cancelARecurrenceItemAsync(
    id: string,
    input?: Record<string, any>
  ): Promise<PixRecurringTransactionGetItemResponseDto> {
    return this.cancelARecurrenceItem(id, input);
  }

  // Métodos privados para construção de requisições

  private buildListRecurrencesRequest(params?: ListRecurrencesParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/pix/transactions/recurrings");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("value", params.value)
        .setOptionalQueryParameter("searchText", params.searchText);

      if (params.status) {
        builder.setOptionalQueryParameter("status", params.status);
      }
    }

    return builder.build();
  }

  private buildRetrieveASingleRecurrenceRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/pix/transactions/recurrings/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildCancelARecurrenceRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/pix/transactions/recurrings/{id}/cancel");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }

  private buildListRecurrenceItemsRequest(
    id: string,
    params?: ListRecurrenceItemsParameters
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/pix/transactions/recurrings/{id}/items");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    builder.setPathParameter("id", id);

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit);
    }

    return builder.build();
  }

  private buildCancelARecurrenceItemRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(
      HttpMethod.POST,
      baseUrl,
      "v3/pix/transactions/recurrings/items/{id}/cancel"
    );
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }
}

