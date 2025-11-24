import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  NotificationUpdateRequestDto,
  NotificationGetResponseDto,
  NotificationBatchUpdateRequestDto,
  NotificationBatchUpdateResponseDto,
} from "../models/notification";

/**
 * Serviço para gerenciamento de notificações
 */
export class NotificationService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Atualiza uma notificação existente
   *
   * @param id - Identificador único da notificação
   * @param notificationUpdateRequestDto - Dados de atualização
   * @returns Promise com notificação atualizada
   * @throws {ApiError} Em caso de erro na API
   */
  async updateExistingNotification(
    id: string,
    notificationUpdateRequestDto: NotificationUpdateRequestDto
  ): Promise<NotificationGetResponseDto> {
    const request = this.buildUpdateExistingNotificationRequest(id, notificationUpdateRequestDto);
    return this.execute<NotificationGetResponseDto>(request);
  }

  /**
   * Atualiza uma notificação existente (versão assíncrona)
   */
  async updateExistingNotificationAsync(
    id: string,
    notificationUpdateRequestDto: NotificationUpdateRequestDto
  ): Promise<NotificationGetResponseDto> {
    return this.updateExistingNotification(id, notificationUpdateRequestDto);
  }

  /**
   * Atualiza notificações existentes em lote
   *
   * @param notificationBatchUpdateRequestDto - Dados de atualização em lote
   * @returns Promise com notificações atualizadas
   * @throws {ApiError} Em caso de erro na API
   */
  async updateExistingNotificationsInBatch(
    notificationBatchUpdateRequestDto: NotificationBatchUpdateRequestDto
  ): Promise<NotificationBatchUpdateResponseDto> {
    const request = this.buildUpdateExistingNotificationsInBatchRequest(notificationBatchUpdateRequestDto);
    return this.execute<NotificationBatchUpdateResponseDto>(request);
  }

  /**
   * Atualiza notificações existentes em lote (versão assíncrona)
   */
  async updateExistingNotificationsInBatchAsync(
    notificationBatchUpdateRequestDto: NotificationBatchUpdateRequestDto
  ): Promise<NotificationBatchUpdateResponseDto> {
    return this.updateExistingNotificationsInBatch(notificationBatchUpdateRequestDto);
  }

  // Métodos privados para construção de requisições

  private buildUpdateExistingNotificationRequest(
    id: string,
    notificationUpdateRequestDto: NotificationUpdateRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.PUT, baseUrl, "v3/notifications/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(notificationUpdateRequestDto).build();
  }

  private buildUpdateExistingNotificationsInBatchRequest(
    notificationBatchUpdateRequestDto: NotificationBatchUpdateRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.PUT, baseUrl, "v3/notifications/batch");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(notificationBatchUpdateRequestDto).build();
  }
}

