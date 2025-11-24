import { AxiosInstance, AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  PaymentDocumentSaveRequestDto,
  PaymentDocumentUpdateRequestDto,
  PaymentDocumentGetResponseDto,
  PaymentDocumentListResponseDto,
  PaymentDocumentDeleteResponseDto,
} from "../models/payment";

/**
 * Serviço para gerenciamento de documentos de pagamentos
 */
export class PaymentDocumentService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista documentos de um pagamento
   *
   * @param id - Identificador único do pagamento
   * @returns Promise com lista de documentos
   * @throws {ApiError} Em caso de erro na API
   */
  async listDocumentsOfAPayment(id: string): Promise<PaymentDocumentListResponseDto> {
    const request = this.buildListDocumentsOfAPaymentRequest(id);
    return this.execute<PaymentDocumentListResponseDto>(request);
  }

  /**
   * Lista documentos de um pagamento (versão assíncrona)
   */
  async listDocumentsOfAPaymentAsync(id: string): Promise<PaymentDocumentListResponseDto> {
    return this.listDocumentsOfAPayment(id);
  }

  /**
   * Faz upload de documentos de um pagamento
   *
   * @param id - Identificador único do pagamento
   * @param paymentDocumentSaveRequestDto - Dados do documento a ser enviado
   * @param filename - Nome do arquivo
   * @returns Promise com documento criado
   * @throws {ApiError} Em caso de erro na API
   */
  async uploadPaymentDocuments(
    id: string,
    paymentDocumentSaveRequestDto: PaymentDocumentSaveRequestDto,
    filename: string
  ): Promise<PaymentDocumentGetResponseDto> {
    const request = this.buildUploadPaymentDocumentsRequest(id, paymentDocumentSaveRequestDto, filename);
    return this.execute<PaymentDocumentGetResponseDto>(request);
  }

  /**
   * Faz upload de documentos de um pagamento (versão assíncrona)
   */
  async uploadPaymentDocumentsAsync(
    id: string,
    paymentDocumentSaveRequestDto: PaymentDocumentSaveRequestDto,
    filename: string
  ): Promise<PaymentDocumentGetResponseDto> {
    return this.uploadPaymentDocuments(id, paymentDocumentSaveRequestDto, filename);
  }

  /**
   * Obtém um documento específico de um pagamento
   *
   * @param id - Identificador único do pagamento
   * @param documentId - Identificador único do documento
   * @returns Promise com documento
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleDocumentOfAPayment(id: string, documentId: string): Promise<PaymentDocumentGetResponseDto> {
    const request = this.buildRetrieveASingleDocumentOfAPaymentRequest(id, documentId);
    return this.execute<PaymentDocumentGetResponseDto>(request);
  }

  /**
   * Obtém um documento específico de um pagamento (versão assíncrona)
   */
  async retrieveASingleDocumentOfAPaymentAsync(id: string, documentId: string): Promise<PaymentDocumentGetResponseDto> {
    return this.retrieveASingleDocumentOfAPayment(id, documentId);
  }

  /**
   * Atualiza configurações de um documento de um pagamento
   *
   * @param id - Identificador único do pagamento
   * @param documentId - Identificador único do documento
   * @param paymentDocumentUpdateRequestDto - Dados de atualização
   * @returns Promise com documento atualizado
   * @throws {ApiError} Em caso de erro na API
   */
  async updateSettingsOfADocumentOfAPayment(
    id: string,
    documentId: string,
    paymentDocumentUpdateRequestDto: PaymentDocumentUpdateRequestDto
  ): Promise<PaymentDocumentGetResponseDto> {
    const request = this.buildUpdateSettingsOfADocumentOfAPaymentRequest(id, documentId, paymentDocumentUpdateRequestDto);
    return this.execute<PaymentDocumentGetResponseDto>(request);
  }

  /**
   * Atualiza configurações de um documento de um pagamento (versão assíncrona)
   */
  async updateSettingsOfADocumentOfAPaymentAsync(
    id: string,
    documentId: string,
    paymentDocumentUpdateRequestDto: PaymentDocumentUpdateRequestDto
  ): Promise<PaymentDocumentGetResponseDto> {
    return this.updateSettingsOfADocumentOfAPayment(id, documentId, paymentDocumentUpdateRequestDto);
  }

  /**
   * Remove um documento de um pagamento
   *
   * @param id - Identificador único do pagamento
   * @param documentId - Identificador único do documento
   * @returns Promise com resposta de confirmação
   * @throws {ApiError} Em caso de erro na API
   */
  async deleteDocumentFromAPayment(id: string, documentId: string): Promise<PaymentDocumentDeleteResponseDto> {
    const request = this.buildDeleteDocumentFromAPaymentRequest(id, documentId);
    return this.execute<PaymentDocumentDeleteResponseDto>(request);
  }

  /**
   * Remove um documento de um pagamento (versão assíncrona)
   */
  async deleteDocumentFromAPaymentAsync(id: string, documentId: string): Promise<PaymentDocumentDeleteResponseDto> {
    return this.deleteDocumentFromAPayment(id, documentId);
  }

  // Métodos privados para construção de requisições

  private buildListDocumentsOfAPaymentRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/payments/{id}/documents");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildUploadPaymentDocumentsRequest(
    id: string,
    paymentDocumentSaveRequestDto: PaymentDocumentSaveRequestDto,
    filename: string
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    
    // Cria FormData para multipart/form-data
    const formData = new FormData();
    formData.append("availableAfterPayment", String(paymentDocumentSaveRequestDto.availableAfterPayment));
    formData.append("type", paymentDocumentSaveRequestDto.type);
    
    // Converte o arquivo para Buffer se necessário
    let fileBuffer: Buffer;
    if (Buffer.isBuffer(paymentDocumentSaveRequestDto.file)) {
      fileBuffer = paymentDocumentSaveRequestDto.file;
    } else if (paymentDocumentSaveRequestDto.file instanceof ArrayBuffer) {
      fileBuffer = Buffer.from(paymentDocumentSaveRequestDto.file);
    } else if (paymentDocumentSaveRequestDto.file instanceof Uint8Array) {
      fileBuffer = Buffer.from(paymentDocumentSaveRequestDto.file);
    } else {
      fileBuffer = Buffer.from(paymentDocumentSaveRequestDto.file as any);
    }
    
    formData.append("file", fileBuffer, {
      filename: filename,
      contentType: "application/octet-stream",
    });

    // Constrói a URL
    const url = `${baseUrl.replace(/\/$/, "")}/v3/payments/${encodeURIComponent(id)}/documents`;

    // Configura headers com FormData
    const headers: Record<string, string> = {
      ...formData.getHeaders(),
    };

    // Adiciona API Key se configurada
    if (this.config.apiKeyAuthConfig?.apiKey) {
      headers[this.config.apiKeyAuthConfig.apiKeyHeader || "access_token"] = this.config.apiKeyAuthConfig.apiKey;
    }

    return {
      method: HttpMethod.POST,
      url,
      data: formData,
      headers,
    };
  }

  private buildRetrieveASingleDocumentOfAPaymentRequest(id: string, documentId: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/payments/{id}/documents/{documentId}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setPathParameter("documentId", documentId).build();
  }

  private buildUpdateSettingsOfADocumentOfAPaymentRequest(
    id: string,
    documentId: string,
    paymentDocumentUpdateRequestDto: PaymentDocumentUpdateRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.PUT, baseUrl, "v3/payments/{id}/documents/{documentId}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder
      .setPathParameter("id", id)
      .setPathParameter("documentId", documentId)
      .setJsonContent(paymentDocumentUpdateRequestDto)
      .build();
  }

  private buildDeleteDocumentFromAPaymentRequest(id: string, documentId: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.DELETE, baseUrl, "v3/payments/{id}/documents/{documentId}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setPathParameter("documentId", documentId).build();
  }
}

