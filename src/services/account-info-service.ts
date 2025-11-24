import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import { AccountInfoSaveRequestDto, AccountInfoGetResponseDto } from "../models/account-info";

/**
 * Serviço para gerenciamento de informações da conta
 */
export class AccountInfoService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Obtém dados comerciais da conta
   *
   * @returns Promise com dados comerciais
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveBusinessData(): Promise<AccountInfoGetResponseDto> {
    const request = this.buildRetrieveBusinessDataRequest();
    return this.execute<AccountInfoGetResponseDto>(request);
  }

  /**
   * Obtém dados comerciais da conta (versão assíncrona)
   */
  async retrieveBusinessDataAsync(): Promise<AccountInfoGetResponseDto> {
    return this.retrieveBusinessData();
  }

  /**
   * Atualiza dados comerciais da conta
   *
   * @param accountInfoSaveRequestDto - Dados comerciais
   * @returns Promise com dados atualizados
   * @throws {ApiError} Em caso de erro na API
   */
  async updateBusinessData(
    accountInfoSaveRequestDto: AccountInfoSaveRequestDto
  ): Promise<AccountInfoGetResponseDto> {
    const request = this.buildUpdateBusinessDataRequest(accountInfoSaveRequestDto);
    return this.execute<AccountInfoGetResponseDto>(request);
  }

  /**
   * Atualiza dados comerciais da conta (versão assíncrona)
   */
  async updateBusinessDataAsync(
    accountInfoSaveRequestDto: AccountInfoSaveRequestDto
  ): Promise<AccountInfoGetResponseDto> {
    return this.updateBusinessData(accountInfoSaveRequestDto);
  }

  // Métodos privados para construção de requisições

  private buildRetrieveBusinessDataRequest(): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/myAccount/commercialInfo/");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.build();
  }

  private buildUpdateBusinessDataRequest(
    accountInfoSaveRequestDto: AccountInfoSaveRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/myAccount/commercialInfo/");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(accountInfoSaveRequestDto).build();
  }
}

