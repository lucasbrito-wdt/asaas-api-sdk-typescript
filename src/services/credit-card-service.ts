import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  CreditCardTokenizeRequestDto,
  CreditCardTokenizeResponseDto,
} from "../models/credit-card";

/**
 * Serviço para tokenização de cartão de crédito
 */
export class CreditCardService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Tokeniza cartão de crédito
   *
   * @param creditCardTokenizeRequestDto - Dados do cartão para tokenização
   * @returns Promise com token do cartão
   * @throws {ApiError} Em caso de erro na API
   */
  async creditCardTokenization(
    creditCardTokenizeRequestDto: CreditCardTokenizeRequestDto
  ): Promise<CreditCardTokenizeResponseDto> {
    const request = this.buildCreditCardTokenizationRequest(creditCardTokenizeRequestDto);
    return this.execute<CreditCardTokenizeResponseDto>(request);
  }

  /**
   * Tokeniza cartão de crédito (versão assíncrona)
   */
  async creditCardTokenizationAsync(
    creditCardTokenizeRequestDto: CreditCardTokenizeRequestDto
  ): Promise<CreditCardTokenizeResponseDto> {
    return this.creditCardTokenization(creditCardTokenizeRequestDto);
  }

  // Métodos privados para construção de requisições

  private buildCreditCardTokenizationRequest(
    creditCardTokenizeRequestDto: CreditCardTokenizeRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/creditCard/tokenizeCreditCard");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(creditCardTokenizeRequestDto).build();
  }
}

