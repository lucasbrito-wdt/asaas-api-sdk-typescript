import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListSubaccountsParameters,
  AccountSaveRequestDto,
  AccountSaveResponseDto,
  AccountGetResponseDto,
  AccountListResponseDto,
} from "../models/subaccount";

/**
 * Serviço para gerenciamento de subcontas
 */
export class SubaccountService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista subcontas
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de subcontas
   * @throws {ApiError} Em caso de erro na API
   */
  async listSubaccounts(params?: ListSubaccountsParameters): Promise<AccountListResponseDto> {
    const request = this.buildListSubaccountsRequest(params);
    return this.execute<AccountListResponseDto>(request);
  }

  /**
   * Lista subcontas (versão assíncrona)
   */
  async listSubaccountsAsync(params?: ListSubaccountsParameters): Promise<AccountListResponseDto> {
    return this.listSubaccounts(params);
  }

  /**
   * Cria uma subconta
   *
   * @param accountSaveRequestDto - Dados da subconta
   * @returns Promise com subconta criada
   * @throws {ApiError} Em caso de erro na API
   */
  async createSubaccount(accountSaveRequestDto: AccountSaveRequestDto): Promise<AccountSaveResponseDto> {
    const request = this.buildCreateSubaccountRequest(accountSaveRequestDto);
    return this.execute<AccountSaveResponseDto>(request);
  }

  /**
   * Cria uma subconta (versão assíncrona)
   */
  async createSubaccountAsync(accountSaveRequestDto: AccountSaveRequestDto): Promise<AccountSaveResponseDto> {
    return this.createSubaccount(accountSaveRequestDto);
  }

  /**
   * Obtém uma subconta específica
   *
   * @param id - Identificador único da subconta
   * @returns Promise com subconta
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleSubaccount(id: string): Promise<AccountGetResponseDto> {
    const request = this.buildRetrieveASingleSubaccountRequest(id);
    return this.execute<AccountGetResponseDto>(request);
  }

  /**
   * Obtém uma subconta específica (versão assíncrona)
   */
  async retrieveASingleSubaccountAsync(id: string): Promise<AccountGetResponseDto> {
    return this.retrieveASingleSubaccount(id);
  }

  // Métodos privados para construção de requisições

  private buildListSubaccountsRequest(params?: ListSubaccountsParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/accounts");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("cpfCnpj", params.cpfCnpj)
        .setOptionalQueryParameter("email", params.email)
        .setOptionalQueryParameter("name", params.name)
        .setOptionalQueryParameter("walletId", params.walletId);
    }

    return builder.build();
  }

  private buildCreateSubaccountRequest(accountSaveRequestDto: AccountSaveRequestDto): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/accounts");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(accountSaveRequestDto).build();
  }

  private buildRetrieveASingleSubaccountRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/accounts/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }
}

