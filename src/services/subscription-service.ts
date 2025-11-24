import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListSubscriptionsParameters,
  SubscriptionSaveRequestDto,
  SubscriptionGetResponseDto,
  SubscriptionListResponseDto,
  SubscriptionUpdateRequestDto,
  SubscriptionDeleteResponseDto,
  ListPaymentsOfASubscriptionParameters,
} from "../models/subscription";
import { PaymentListResponseDto } from "../models/payment";

/**
 * Serviço para gerenciamento de assinaturas
 */
export class SubscriptionService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista assinaturas
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de assinaturas
   * @throws {ApiError} Em caso de erro na API
   */
  async listSubscriptions(params?: ListSubscriptionsParameters): Promise<SubscriptionListResponseDto> {
    const request = this.buildListSubscriptionsRequest(params);
    return this.execute<SubscriptionListResponseDto>(request);
  }

  /**
   * Lista assinaturas (versão assíncrona)
   */
  async listSubscriptionsAsync(params?: ListSubscriptionsParameters): Promise<SubscriptionListResponseDto> {
    return this.listSubscriptions(params);
  }

  /**
   * Cria uma nova assinatura
   *
   * @param subscriptionSaveRequestDto - Dados da assinatura a ser criada
   * @returns Promise com a assinatura criada
   * @throws {ApiError} Em caso de erro na API
   */
  async createNewSubscription(
    subscriptionSaveRequestDto: SubscriptionSaveRequestDto
  ): Promise<SubscriptionGetResponseDto> {
    const request = this.buildCreateNewSubscriptionRequest(subscriptionSaveRequestDto);
    return this.execute<SubscriptionGetResponseDto>(request);
  }

  /**
   * Cria uma nova assinatura (versão assíncrona)
   */
  async createNewSubscriptionAsync(
    subscriptionSaveRequestDto: SubscriptionSaveRequestDto
  ): Promise<SubscriptionGetResponseDto> {
    return this.createNewSubscription(subscriptionSaveRequestDto);
  }

  /**
   * Obtém uma assinatura específica
   *
   * @param id - Identificador único da assinatura
   * @returns Promise com os dados da assinatura
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleSubscription(id: string): Promise<SubscriptionGetResponseDto> {
    const request = this.buildRetrieveASingleSubscriptionRequest(id);
    return this.execute<SubscriptionGetResponseDto>(request);
  }

  /**
   * Obtém uma assinatura específica (versão assíncrona)
   */
  async retrieveASingleSubscriptionAsync(id: string): Promise<SubscriptionGetResponseDto> {
    return this.retrieveASingleSubscription(id);
  }

  /**
   * Atualiza uma assinatura existente
   *
   * @param id - Identificador único da assinatura
   * @param subscriptionUpdateRequestDto - Dados de atualização
   * @returns Promise com a assinatura atualizada
   * @throws {ApiError} Em caso de erro na API
   */
  async updateExistingSubscription(
    id: string,
    subscriptionUpdateRequestDto: SubscriptionUpdateRequestDto
  ): Promise<SubscriptionGetResponseDto> {
    const request = this.buildUpdateExistingSubscriptionRequest(id, subscriptionUpdateRequestDto);
    return this.execute<SubscriptionGetResponseDto>(request);
  }

  /**
   * Atualiza uma assinatura existente (versão assíncrona)
   */
  async updateExistingSubscriptionAsync(
    id: string,
    subscriptionUpdateRequestDto: SubscriptionUpdateRequestDto
  ): Promise<SubscriptionGetResponseDto> {
    return this.updateExistingSubscription(id, subscriptionUpdateRequestDto);
  }

  /**
   * Remove uma assinatura
   *
   * @param id - Identificador único da assinatura
   * @returns Promise com resposta de confirmação
   * @throws {ApiError} Em caso de erro na API
   */
  async removeSubscription(id: string): Promise<SubscriptionDeleteResponseDto> {
    const request = this.buildRemoveSubscriptionRequest(id);
    return this.execute<SubscriptionDeleteResponseDto>(request);
  }

  /**
   * Remove uma assinatura (versão assíncrona)
   */
  async removeSubscriptionAsync(id: string): Promise<SubscriptionDeleteResponseDto> {
    return this.removeSubscription(id);
  }

  /**
   * Lista pagamentos de uma assinatura
   *
   * @param id - Identificador único da assinatura
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de pagamentos
   * @throws {ApiError} Em caso de erro na API
   */
  async listPaymentsOfASubscription(
    id: string,
    params?: ListPaymentsOfASubscriptionParameters
  ): Promise<PaymentListResponseDto> {
    const request = this.buildListPaymentsOfASubscriptionRequest(id, params);
    return this.execute<PaymentListResponseDto>(request);
  }

  /**
   * Lista pagamentos de uma assinatura (versão assíncrona)
   */
  async listPaymentsOfASubscriptionAsync(
    id: string,
    params?: ListPaymentsOfASubscriptionParameters
  ): Promise<PaymentListResponseDto> {
    return this.listPaymentsOfASubscription(id, params);
  }

  // Métodos privados para construção de requisições

  private buildListSubscriptionsRequest(params?: ListSubscriptionsParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/subscriptions");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("customer", params.customer)
        .setOptionalQueryParameter("customerGroupName", params.customerGroupName)
        .setOptionalQueryParameter("deletedOnly", params.deletedOnly)
        .setOptionalQueryParameter("includeDeleted", params.includeDeleted)
        .setOptionalQueryParameter("externalReference", params.externalReference)
        .setOptionalQueryParameter("order", params.order)
        .setOptionalQueryParameter("sort", params.sort);

      if (params.billingType) {
        builder.setOptionalQueryParameter("billingType", params.billingType);
      }
      if (params.status) {
        builder.setOptionalQueryParameter("status", params.status);
      }
    }

    return builder.build();
  }

  private buildCreateNewSubscriptionRequest(
    subscriptionSaveRequestDto: SubscriptionSaveRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/subscriptions");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(subscriptionSaveRequestDto).build();
  }

  private buildRetrieveASingleSubscriptionRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/subscriptions/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildUpdateExistingSubscriptionRequest(
    id: string,
    subscriptionUpdateRequestDto: SubscriptionUpdateRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.PUT, baseUrl, "v3/subscriptions/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(subscriptionUpdateRequestDto).build();
  }

  private buildRemoveSubscriptionRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.DELETE, baseUrl, "v3/subscriptions/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildListPaymentsOfASubscriptionRequest(
    id: string,
    params?: ListPaymentsOfASubscriptionParameters
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/subscriptions/{id}/payments");
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
}

