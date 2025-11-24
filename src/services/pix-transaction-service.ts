import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListTransactionsParameters,
  PixTransactionSaveRequestDto,
  PixTransactionGetResponseDto,
  PixTransactionListResponseDto,
  PixQrCodeDecodeRequestDto,
  PixQrCodeDecodeResponseDto,
} from "../models/pix-transaction";

/**
 * Serviço para gerenciamento de transações PIX
 */
export class PixTransactionService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Paga um QR Code
   *
   * @param pixTransactionSaveRequestDto - Dados da transação PIX
   * @returns Promise com a transação criada
   * @throws {ApiError} Em caso de erro na API
   */
  async payAQrcode(pixTransactionSaveRequestDto: PixTransactionSaveRequestDto): Promise<PixTransactionGetResponseDto> {
    const request = this.buildPayAQrcodeRequest(pixTransactionSaveRequestDto);
    return this.execute<PixTransactionGetResponseDto>(request);
  }

  /**
   * Paga um QR Code (versão assíncrona)
   */
  async payAQrcodeAsync(pixTransactionSaveRequestDto: PixTransactionSaveRequestDto): Promise<PixTransactionGetResponseDto> {
    return this.payAQrcode(pixTransactionSaveRequestDto);
  }

  /**
   * Decodifica um QR Code para pagamento
   *
   * @param pixQrCodeDecodeRequestDto - Dados do QR Code a ser decodificado
   * @returns Promise com dados decodificados do QR Code
   * @throws {ApiError} Em caso de erro na API
   */
  async decodeAQrcodeForPayment(
    pixQrCodeDecodeRequestDto: PixQrCodeDecodeRequestDto
  ): Promise<PixQrCodeDecodeResponseDto> {
    const request = this.buildDecodeAQrcodeForPaymentRequest(pixQrCodeDecodeRequestDto);
    return this.execute<PixQrCodeDecodeResponseDto>(request);
  }

  /**
   * Decodifica um QR Code para pagamento (versão assíncrona)
   */
  async decodeAQrcodeForPaymentAsync(
    pixQrCodeDecodeRequestDto: PixQrCodeDecodeRequestDto
  ): Promise<PixQrCodeDecodeResponseDto> {
    return this.decodeAQrcodeForPayment(pixQrCodeDecodeRequestDto);
  }

  /**
   * Obtém uma transação específica
   *
   * @param id - Identificador único da transação PIX
   * @returns Promise com os dados da transação
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleTransaction(id: string): Promise<PixTransactionGetResponseDto> {
    const request = this.buildRetrieveASingleTransactionRequest(id);
    return this.execute<PixTransactionGetResponseDto>(request);
  }

  /**
   * Obtém uma transação específica (versão assíncrona)
   */
  async retrieveASingleTransactionAsync(id: string): Promise<PixTransactionGetResponseDto> {
    return this.retrieveASingleTransaction(id);
  }

  /**
   * Lista transações PIX
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de transações
   * @throws {ApiError} Em caso de erro na API
   */
  async listTransactions(params?: ListTransactionsParameters): Promise<PixTransactionListResponseDto> {
    const request = this.buildListTransactionsRequest(params);
    return this.execute<PixTransactionListResponseDto>(request);
  }

  /**
   * Lista transações PIX (versão assíncrona)
   */
  async listTransactionsAsync(params?: ListTransactionsParameters): Promise<PixTransactionListResponseDto> {
    return this.listTransactions(params);
  }

  /**
   * Cancela uma transação agendada
   *
   * @param id - Identificador único da transação agendada
   * @param input - Dados do cancelamento (opcional)
   * @returns Promise com a transação cancelada
   * @throws {ApiError} Em caso de erro na API
   */
  async cancelAScheduledTransaction(id: string, input?: Record<string, any>): Promise<PixTransactionGetResponseDto> {
    const request = this.buildCancelAScheduledTransactionRequest(id, input || {});
    return this.execute<PixTransactionGetResponseDto>(request);
  }

  /**
   * Cancela uma transação agendada (versão assíncrona)
   */
  async cancelAScheduledTransactionAsync(
    id: string,
    input?: Record<string, any>
  ): Promise<PixTransactionGetResponseDto> {
    return this.cancelAScheduledTransaction(id, input);
  }

  // Métodos privados para construção de requisições

  private buildPayAQrcodeRequest(pixTransactionSaveRequestDto: PixTransactionSaveRequestDto): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/pix/qrCodes/pay");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(pixTransactionSaveRequestDto).build();
  }

  private buildDecodeAQrcodeForPaymentRequest(
    pixQrCodeDecodeRequestDto: PixQrCodeDecodeRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/pix/qrCodes/decode");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(pixQrCodeDecodeRequestDto).build();
  }

  private buildRetrieveASingleTransactionRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/pix/transactions/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildListTransactionsRequest(params?: ListTransactionsParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/pix/transactions");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("endToEndIdentifier", params.endToEndIdentifier);

      if (params.status) {
        builder.setOptionalQueryParameter("status", params.status);
      }
      if (params.type) {
        builder.setOptionalQueryParameter("type", params.type);
      }
    }

    return builder.build();
  }

  private buildCancelAScheduledTransactionRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/pix/transactions/{id}/cancel");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }
}

