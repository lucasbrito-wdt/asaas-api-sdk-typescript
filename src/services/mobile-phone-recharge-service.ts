import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListMobileRechargesParameters,
  MobilePhoneRechargeSaveRequestDto,
  MobilePhoneRechargeGetResponseDto,
  MobilePhoneRechargeListResponseDto,
  MobilePhoneRechargeFindProviderResponseDto,
} from "../models/mobile-phone-recharge";

/**
 * Serviço para recarga de celular
 */
export class MobilePhoneRechargeService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista recargas de celular
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de recargas
   * @throws {ApiError} Em caso de erro na API
   */
  async listMobileRecharges(params?: ListMobileRechargesParameters): Promise<MobilePhoneRechargeListResponseDto> {
    const request = this.buildListMobileRechargesRequest(params);
    return this.execute<MobilePhoneRechargeListResponseDto>(request);
  }

  /**
   * Lista recargas de celular (versão assíncrona)
   */
  async listMobileRechargesAsync(
    params?: ListMobileRechargesParameters
  ): Promise<MobilePhoneRechargeListResponseDto> {
    return this.listMobileRecharges(params);
  }

  /**
   * Solicita recarga
   *
   * @param mobilePhoneRechargeSaveRequestDto - Dados da recarga
   * @returns Promise com recarga solicitada
   * @throws {ApiError} Em caso de erro na API
   */
  async requestRecharge(
    mobilePhoneRechargeSaveRequestDto: MobilePhoneRechargeSaveRequestDto
  ): Promise<MobilePhoneRechargeGetResponseDto> {
    const request = this.buildRequestRechargeRequest(mobilePhoneRechargeSaveRequestDto);
    return this.execute<MobilePhoneRechargeGetResponseDto>(request);
  }

  /**
   * Solicita recarga (versão assíncrona)
   */
  async requestRechargeAsync(
    mobilePhoneRechargeSaveRequestDto: MobilePhoneRechargeSaveRequestDto
  ): Promise<MobilePhoneRechargeGetResponseDto> {
    return this.requestRecharge(mobilePhoneRechargeSaveRequestDto);
  }

  /**
   * Obtém uma recarga específica
   *
   * @param id - Identificador único da recarga
   * @returns Promise com recarga
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleMobileRecharge(id: string): Promise<MobilePhoneRechargeGetResponseDto> {
    const request = this.buildRetrieveASingleMobileRechargeRequest(id);
    return this.execute<MobilePhoneRechargeGetResponseDto>(request);
  }

  /**
   * Obtém uma recarga específica (versão assíncrona)
   */
  async retrieveASingleMobileRechargeAsync(id: string): Promise<MobilePhoneRechargeGetResponseDto> {
    return this.retrieveASingleMobileRecharge(id);
  }

  /**
   * Obtém uma recarga específica (alias para compatibilidade)
   */
  async recoverASingleCellphoneRecharge(id: string): Promise<MobilePhoneRechargeGetResponseDto> {
    return this.retrieveASingleMobileRecharge(id);
  }

  /**
   * Obtém uma recarga específica (versão assíncrona)
   */
  async recoverASingleCellphoneRechargeAsync(id: string): Promise<MobilePhoneRechargeGetResponseDto> {
    return this.retrieveASingleMobileRecharge(id);
  }

  /**
   * Cancela uma recarga de celular
   *
   * @param id - Identificador único da recarga
   * @param input - Dados do cancelamento (opcional)
   * @returns Promise com recarga cancelada
   * @throws {ApiError} Em caso de erro na API
   */
  async cancelACellphoneRecharge(id: string, input?: Record<string, any>): Promise<MobilePhoneRechargeGetResponseDto> {
    const request = this.buildCancelACellphoneRechargeRequest(id, input || {});
    return this.execute<MobilePhoneRechargeGetResponseDto>(request);
  }

  /**
   * Cancela uma recarga de celular (versão assíncrona)
   */
  async cancelACellphoneRechargeAsync(
    id: string,
    input?: Record<string, any>
  ): Promise<MobilePhoneRechargeGetResponseDto> {
    return this.cancelACellphoneRecharge(id, input);
  }

  /**
   * Busca provedor pelo número
   *
   * @param phoneNumber - Número do celular
   * @returns Promise com provedor encontrado
   * @throws {ApiError} Em caso de erro na API
   */
  async searchForCellPhoneProvider(phoneNumber: string): Promise<MobilePhoneRechargeFindProviderResponseDto> {
    const request = this.buildSearchForCellPhoneProviderRequest(phoneNumber);
    return this.execute<MobilePhoneRechargeFindProviderResponseDto>(request);
  }

  /**
   * Busca provedor pelo número (versão assíncrona)
   */
  async searchForCellPhoneProviderAsync(phoneNumber: string): Promise<MobilePhoneRechargeFindProviderResponseDto> {
    return this.searchForCellPhoneProvider(phoneNumber);
  }

  // Métodos privados para construção de requisições

  private buildListMobileRechargesRequest(params?: ListMobileRechargesParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/mobilePhoneRecharges");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder.setOptionalQueryParameter("offset", params.offset).setOptionalQueryParameter("limit", params.limit);
    }

    return builder.build();
  }

  private buildRequestRechargeRequest(
    mobilePhoneRechargeSaveRequestDto: MobilePhoneRechargeSaveRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/mobilePhoneRecharges");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(mobilePhoneRechargeSaveRequestDto).build();
  }

  private buildRetrieveASingleMobileRechargeRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/mobilePhoneRecharges/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildCancelACellphoneRechargeRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/mobilePhoneRecharges/{id}/cancel");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }

  private buildSearchForCellPhoneProviderRequest(phoneNumber: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/mobilePhoneRecharges/{phoneNumber}/provider");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("phoneNumber", phoneNumber).build();
  }
}

