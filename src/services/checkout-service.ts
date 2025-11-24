import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  CheckoutSessionSaveRequestDto,
  CheckoutSessionResponseDto,
} from "../models/checkout";

/**
 * Serviço para gerenciamento de checkout
 */
export class CheckoutService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Cria um novo checkout
   *
   * @param checkoutSessionSaveRequestDto - Dados da sessão de checkout
   * @returns Promise com sessão de checkout criada
   * @throws {ApiError} Em caso de erro na API
   */
  async createNewCheckout(
    checkoutSessionSaveRequestDto: CheckoutSessionSaveRequestDto
  ): Promise<CheckoutSessionResponseDto> {
    const request = this.buildCreateNewCheckoutRequest(checkoutSessionSaveRequestDto);
    return this.execute<CheckoutSessionResponseDto>(request);
  }

  /**
   * Cria um novo checkout (versão assíncrona)
   */
  async createNewCheckoutAsync(
    checkoutSessionSaveRequestDto: CheckoutSessionSaveRequestDto
  ): Promise<CheckoutSessionResponseDto> {
    return this.createNewCheckout(checkoutSessionSaveRequestDto);
  }

  /**
   * Cancela um checkout
   *
   * @param id - Identificador único do checkout
   * @param input - Dados do cancelamento (opcional)
   * @returns Promise com checkout cancelado
   * @throws {ApiError} Em caso de erro na API
   */
  async cancelACheckout(id: string, input?: Record<string, any>): Promise<CheckoutSessionResponseDto> {
    const request = this.buildCancelACheckoutRequest(id, input || {});
    return this.execute<CheckoutSessionResponseDto>(request);
  }

  /**
   * Cancela um checkout (versão assíncrona)
   */
  async cancelACheckoutAsync(id: string, input?: Record<string, any>): Promise<CheckoutSessionResponseDto> {
    return this.cancelACheckout(id, input);
  }

  // Métodos privados para construção de requisições

  private buildCreateNewCheckoutRequest(
    checkoutSessionSaveRequestDto: CheckoutSessionSaveRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/checkouts");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(checkoutSessionSaveRequestDto).build();
  }

  private buildCancelACheckoutRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/checkouts/{id}/cancel");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }
}

