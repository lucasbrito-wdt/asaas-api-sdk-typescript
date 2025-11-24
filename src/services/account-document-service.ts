import { AxiosInstance, AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  AccountDocumentShowResponseDto,
  AccountDocumentSaveRequestDto,
  AccountDocumentGetResponseDto,
  AccountDocumentUpdateRequestDto,
  AccountDocumentDeleteResponseDto,
} from "../models/account-document";

/**
 * Serviço para gerenciamento de documentos da conta
 */
export class AccountDocumentService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Verifica documentos pendentes
   *
   * @returns Promise com documentos pendentes
   * @throws {ApiError} Em caso de erro na API
   */
  async checkPendingDocuments(): Promise<AccountDocumentShowResponseDto> {
    const request = this.buildCheckPendingDocumentsRequest();
    return this.execute<AccountDocumentShowResponseDto>(request);
  }

  /**
   * Verifica documentos pendentes (versão assíncrona)
   */
  async checkPendingDocumentsAsync(): Promise<AccountDocumentShowResponseDto> {
    return this.checkPendingDocuments();
  }

  /**
   * Envia documentos
   *
   * @param id - Identificador único do documento
   * @param accountDocumentSaveRequestDto - Dados do documento
   * @param filename - Nome do arquivo
   * @returns Promise com documento enviado
   * @throws {ApiError} Em caso de erro na API
   */
  async sendDocuments(
    id: string,
    accountDocumentSaveRequestDto: AccountDocumentSaveRequestDto,
    filename: string
  ): Promise<AccountDocumentGetResponseDto> {
    const request = this.buildSendDocumentsRequest(id, accountDocumentSaveRequestDto, filename);
    return this.execute<AccountDocumentGetResponseDto>(request);
  }

  /**
   * Envia documentos (versão assíncrona)
   */
  async sendDocumentsAsync(
    id: string,
    accountDocumentSaveRequestDto: AccountDocumentSaveRequestDto,
    filename: string
  ): Promise<AccountDocumentGetResponseDto> {
    return this.sendDocuments(id, accountDocumentSaveRequestDto, filename);
  }

  /**
   * Visualiza documento enviado
   *
   * @param id - Identificador único do documento
   * @returns Promise com documento
   * @throws {ApiError} Em caso de erro na API
   */
  async viewDocumentSent(id: string): Promise<AccountDocumentGetResponseDto> {
    const request = this.buildViewDocumentSentRequest(id);
    return this.execute<AccountDocumentGetResponseDto>(request);
  }

  /**
   * Visualiza documento enviado (versão assíncrona)
   */
  async viewDocumentSentAsync(id: string): Promise<AccountDocumentGetResponseDto> {
    return this.viewDocumentSent(id);
  }

  /**
   * Atualiza documento enviado
   *
   * @param id - Identificador único do documento
   * @param accountDocumentUpdateRequestDto - Dados atualizados
   * @param filename - Nome do arquivo
   * @returns Promise com documento atualizado
   * @throws {ApiError} Em caso de erro na API
   */
  async updateSentDocument(
    id: string,
    accountDocumentUpdateRequestDto: AccountDocumentUpdateRequestDto,
    filename: string
  ): Promise<AccountDocumentGetResponseDto> {
    const request = this.buildUpdateSentDocumentRequest(id, accountDocumentUpdateRequestDto, filename);
    return this.execute<AccountDocumentGetResponseDto>(request);
  }

  /**
   * Atualiza documento enviado (versão assíncrona)
   */
  async updateSentDocumentAsync(
    id: string,
    accountDocumentUpdateRequestDto: AccountDocumentUpdateRequestDto,
    filename: string
  ): Promise<AccountDocumentGetResponseDto> {
    return this.updateSentDocument(id, accountDocumentUpdateRequestDto, filename);
  }

  /**
   * Remove documento enviado
   *
   * @param id - Identificador único do documento
   * @returns Promise com resposta de confirmação
   * @throws {ApiError} Em caso de erro na API
   */
  async removeSentDocument(id: string): Promise<AccountDocumentDeleteResponseDto> {
    const request = this.buildRemoveSentDocumentRequest(id);
    return this.execute<AccountDocumentDeleteResponseDto>(request);
  }

  /**
   * Remove documento enviado (versão assíncrona)
   */
  async removeSentDocumentAsync(id: string): Promise<AccountDocumentDeleteResponseDto> {
    return this.removeSentDocument(id);
  }

  // Métodos privados para construção de requisições

  private buildCheckPendingDocumentsRequest(): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/myAccount/documents");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.build();
  }

  private buildSendDocumentsRequest(
    id: string,
    accountDocumentSaveRequestDto: AccountDocumentSaveRequestDto,
    filename: string
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";

    const formData = new FormData();
    if (accountDocumentSaveRequestDto.documentFile) {
      let fileBuffer: Buffer;
      if (Buffer.isBuffer(accountDocumentSaveRequestDto.documentFile)) {
        fileBuffer = accountDocumentSaveRequestDto.documentFile;
      } else if (accountDocumentSaveRequestDto.documentFile instanceof ArrayBuffer) {
        fileBuffer = Buffer.from(accountDocumentSaveRequestDto.documentFile);
      } else if (accountDocumentSaveRequestDto.documentFile instanceof Uint8Array) {
        fileBuffer = Buffer.from(accountDocumentSaveRequestDto.documentFile);
      } else {
        fileBuffer = Buffer.from(accountDocumentSaveRequestDto.documentFile as any);
      }
      formData.append("documentFile", fileBuffer, {
        filename: filename,
        contentType: "application/octet-stream",
      });
    }
    if (accountDocumentSaveRequestDto.type) {
      formData.append("type", accountDocumentSaveRequestDto.type);
    }

    const url = `${baseUrl.replace(/\/$/, "")}/v3/myAccount/documents/${encodeURIComponent(id)}`;

    const headers: Record<string, string> = {
      ...formData.getHeaders(),
    };

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

  private buildViewDocumentSentRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/myAccount/documents/files/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildUpdateSentDocumentRequest(
    id: string,
    accountDocumentUpdateRequestDto: AccountDocumentUpdateRequestDto,
    filename: string
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";

    const formData = new FormData();
    if (accountDocumentUpdateRequestDto.documentFile) {
      let fileBuffer: Buffer;
      if (Buffer.isBuffer(accountDocumentUpdateRequestDto.documentFile)) {
        fileBuffer = accountDocumentUpdateRequestDto.documentFile;
      } else if (accountDocumentUpdateRequestDto.documentFile instanceof ArrayBuffer) {
        fileBuffer = Buffer.from(accountDocumentUpdateRequestDto.documentFile);
      } else if (accountDocumentUpdateRequestDto.documentFile instanceof Uint8Array) {
        fileBuffer = Buffer.from(accountDocumentUpdateRequestDto.documentFile);
      } else {
        fileBuffer = Buffer.from(accountDocumentUpdateRequestDto.documentFile as any);
      }
      formData.append("documentFile", fileBuffer, {
        filename: filename,
        contentType: "application/octet-stream",
      });
    }

    const url = `${baseUrl.replace(/\/$/, "")}/v3/myAccount/documents/files/${encodeURIComponent(id)}`;

    const headers: Record<string, string> = {
      ...formData.getHeaders(),
    };

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

  private buildRemoveSentDocumentRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.DELETE, baseUrl, "v3/myAccount/documents/files/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }
}

