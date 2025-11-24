import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListWebhooksParameters,
  WebhookConfigSaveRequestDto,
  WebhookConfigGetResponseDto,
  WebhookConfigListResponseDto,
  WebhookConfigUpdateRequestDto,
  WebhookConfigDeleteResponseDto,
} from "../models/webhook";

/**
 * Serviço para gerenciamento de webhooks
 */
export class WebhookService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista webhooks
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de webhooks
   * @throws {ApiError} Em caso de erro na API
   */
  async listWebhooks(params?: ListWebhooksParameters): Promise<WebhookConfigListResponseDto> {
    const request = this.buildListWebhooksRequest(params);
    return this.execute<WebhookConfigListResponseDto>(request);
  }

  /**
   * Lista webhooks (versão assíncrona)
   */
  async listWebhooksAsync(params?: ListWebhooksParameters): Promise<WebhookConfigListResponseDto> {
    return this.listWebhooks(params);
  }

  /**
   * Cria um novo webhook
   *
   * @param webhookConfigSaveRequestDto - Dados do webhook
   * @returns Promise com webhook criado
   * @throws {ApiError} Em caso de erro na API
   */
  async createNewWebhook(
    webhookConfigSaveRequestDto: WebhookConfigSaveRequestDto
  ): Promise<WebhookConfigGetResponseDto> {
    const request = this.buildCreateNewWebhookRequest(webhookConfigSaveRequestDto);
    return this.execute<WebhookConfigGetResponseDto>(request);
  }

  /**
   * Cria um novo webhook (versão assíncrona)
   */
  async createNewWebhookAsync(
    webhookConfigSaveRequestDto: WebhookConfigSaveRequestDto
  ): Promise<WebhookConfigGetResponseDto> {
    return this.createNewWebhook(webhookConfigSaveRequestDto);
  }

  /**
   * Obtém um webhook específico
   *
   * @param id - Identificador único do webhook
   * @returns Promise com webhook
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleWebhook(id: string): Promise<WebhookConfigGetResponseDto> {
    const request = this.buildRetrieveASingleWebhookRequest(id);
    return this.execute<WebhookConfigGetResponseDto>(request);
  }

  /**
   * Obtém um webhook específico (versão assíncrona)
   */
  async retrieveASingleWebhookAsync(id: string): Promise<WebhookConfigGetResponseDto> {
    return this.retrieveASingleWebhook(id);
  }

  /**
   * Atualiza um webhook existente
   *
   * @param id - Identificador único do webhook
   * @param webhookConfigUpdateRequestDto - Dados de atualização
   * @returns Promise com webhook atualizado
   * @throws {ApiError} Em caso de erro na API
   */
  async updateExistingWebhook(
    id: string,
    webhookConfigUpdateRequestDto: WebhookConfigUpdateRequestDto
  ): Promise<WebhookConfigGetResponseDto> {
    const request = this.buildUpdateExistingWebhookRequest(id, webhookConfigUpdateRequestDto);
    return this.execute<WebhookConfigGetResponseDto>(request);
  }

  /**
   * Atualiza um webhook existente (versão assíncrona)
   */
  async updateExistingWebhookAsync(
    id: string,
    webhookConfigUpdateRequestDto: WebhookConfigUpdateRequestDto
  ): Promise<WebhookConfigGetResponseDto> {
    return this.updateExistingWebhook(id, webhookConfigUpdateRequestDto);
  }

  /**
   * Remove um webhook
   *
   * @param id - Identificador único do webhook
   * @returns Promise com resposta de confirmação
   * @throws {ApiError} Em caso de erro na API
   */
  async removeWebhook(id: string): Promise<WebhookConfigDeleteResponseDto> {
    const request = this.buildRemoveWebhookRequest(id);
    return this.execute<WebhookConfigDeleteResponseDto>(request);
  }

  /**
   * Remove um webhook (versão assíncrona)
   */
  async removeWebhookAsync(id: string): Promise<WebhookConfigDeleteResponseDto> {
    return this.removeWebhook(id);
  }

  // Métodos privados para construção de requisições

  private buildListWebhooksRequest(params?: ListWebhooksParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/webhooks");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder.setOptionalQueryParameter("offset", params.offset).setOptionalQueryParameter("limit", params.limit);
    }

    return builder.build();
  }

  private buildCreateNewWebhookRequest(
    webhookConfigSaveRequestDto: WebhookConfigSaveRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/webhooks");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(webhookConfigSaveRequestDto).build();
  }

  private buildRetrieveASingleWebhookRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/webhooks/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildUpdateExistingWebhookRequest(
    id: string,
    webhookConfigUpdateRequestDto: WebhookConfigUpdateRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.PUT, baseUrl, "v3/webhooks/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(webhookConfigUpdateRequestDto).build();
  }

  private buildRemoveWebhookRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.DELETE, baseUrl, "v3/webhooks/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }
}

