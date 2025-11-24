import { AxiosInstance, AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListPaymentsLinksParameters,
  PaymentLinkSaveRequestDto,
  PaymentLinkGetResponseDto,
  PaymentLinkListResponseDto,
  PaymentLinkUpdateRequestDto,
  PaymentLinkDeleteResponseDto,
  PaymentLinkFileSaveRequestDto,
  PaymentLinkFileGetResponseDto,
  PaymentLinkFileListResponseDto,
  PaymentLinkFileDeleteResponseDto,
} from "../models/payment-link";

/**
 * Serviço para gerenciamento de links de pagamento
 */
export class PaymentLinkService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista links de pagamento
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de links
   * @throws {ApiError} Em caso de erro na API
   */
  async listPaymentsLinks(params?: ListPaymentsLinksParameters): Promise<PaymentLinkListResponseDto> {
    const request = this.buildListPaymentsLinksRequest(params);
    return this.execute<PaymentLinkListResponseDto>(request);
  }

  /**
   * Lista links de pagamento (versão assíncrona)
   */
  async listPaymentsLinksAsync(params?: ListPaymentsLinksParameters): Promise<PaymentLinkListResponseDto> {
    return this.listPaymentsLinks(params);
  }

  /**
   * Cria um novo link de pagamento
   *
   * @param paymentLinkSaveRequestDto - Dados do link a ser criado
   * @returns Promise com o link criado
   * @throws {ApiError} Em caso de erro na API
   */
  async createAPaymentsLink(paymentLinkSaveRequestDto: PaymentLinkSaveRequestDto): Promise<PaymentLinkGetResponseDto> {
    const request = this.buildCreateAPaymentsLinkRequest(paymentLinkSaveRequestDto);
    return this.execute<PaymentLinkGetResponseDto>(request);
  }

  /**
   * Cria um novo link de pagamento (versão assíncrona)
   */
  async createAPaymentsLinkAsync(paymentLinkSaveRequestDto: PaymentLinkSaveRequestDto): Promise<PaymentLinkGetResponseDto> {
    return this.createAPaymentsLink(paymentLinkSaveRequestDto);
  }

  /**
   * Obtém um link específico
   *
   * @param id - Identificador único do link
   * @returns Promise com os dados do link
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASinglePaymentsLink(id: string): Promise<PaymentLinkGetResponseDto> {
    const request = this.buildRetrieveASinglePaymentsLinkRequest(id);
    return this.execute<PaymentLinkGetResponseDto>(request);
  }

  /**
   * Obtém um link específico (versão assíncrona)
   */
  async retrieveASinglePaymentsLinkAsync(id: string): Promise<PaymentLinkGetResponseDto> {
    return this.retrieveASinglePaymentsLink(id);
  }

  /**
   * Atualiza um link de pagamento
   *
   * @param id - Identificador único do link
   * @param paymentLinkUpdateRequestDto - Dados de atualização
   * @returns Promise com o link atualizado
   * @throws {ApiError} Em caso de erro na API
   */
  async updateAPaymentsLink(
    id: string,
    paymentLinkUpdateRequestDto: PaymentLinkUpdateRequestDto
  ): Promise<PaymentLinkGetResponseDto> {
    const request = this.buildUpdateAPaymentsLinkRequest(id, paymentLinkUpdateRequestDto);
    return this.execute<PaymentLinkGetResponseDto>(request);
  }

  /**
   * Atualiza um link de pagamento (versão assíncrona)
   */
  async updateAPaymentsLinkAsync(
    id: string,
    paymentLinkUpdateRequestDto: PaymentLinkUpdateRequestDto
  ): Promise<PaymentLinkGetResponseDto> {
    return this.updateAPaymentsLink(id, paymentLinkUpdateRequestDto);
  }

  /**
   * Remove um link de pagamento
   *
   * @param id - Identificador único do link
   * @returns Promise com resposta de confirmação
   * @throws {ApiError} Em caso de erro na API
   */
  async removeAPaymentsLink(id: string): Promise<PaymentLinkDeleteResponseDto> {
    const request = this.buildRemoveAPaymentsLinkRequest(id);
    return this.execute<PaymentLinkDeleteResponseDto>(request);
  }

  /**
   * Remove um link de pagamento (versão assíncrona)
   */
  async removeAPaymentsLinkAsync(id: string): Promise<PaymentLinkDeleteResponseDto> {
    return this.removeAPaymentsLink(id);
  }

  /**
   * Restaura um link de pagamento removido
   *
   * @param id - Identificador único do link
   * @param input - Dados de restauração (opcional)
   * @returns Promise com o link restaurado
   * @throws {ApiError} Em caso de erro na API
   */
  async restoreAPaymentsLink(id: string, input?: Record<string, any>): Promise<PaymentLinkGetResponseDto> {
    const request = this.buildRestoreAPaymentsLinkRequest(id, input || {});
    return this.execute<PaymentLinkGetResponseDto>(request);
  }

  /**
   * Restaura um link de pagamento removido (versão assíncrona)
   */
  async restoreAPaymentsLinkAsync(id: string, input?: Record<string, any>): Promise<PaymentLinkGetResponseDto> {
    return this.restoreAPaymentsLink(id, input);
  }

  /**
   * Lista imagens de um link de pagamento
   *
   * @param id - Identificador único do link
   * @returns Promise com lista de imagens
   * @throws {ApiError} Em caso de erro na API
   */
  async listImagesFromAPaymentsLink(id: string): Promise<PaymentLinkFileListResponseDto> {
    const request = this.buildListImagesFromAPaymentsLinkRequest(id);
    return this.execute<PaymentLinkFileListResponseDto>(request);
  }

  /**
   * Lista imagens de um link de pagamento (versão assíncrona)
   */
  async listImagesFromAPaymentsLinkAsync(id: string): Promise<PaymentLinkFileListResponseDto> {
    return this.listImagesFromAPaymentsLink(id);
  }

  /**
   * Adiciona uma imagem a um link de pagamento
   *
   * @param id - Identificador único do link
   * @param paymentLinkFileSaveRequestDto - Dados da imagem
   * @param filename - Nome do arquivo
   * @returns Promise com a imagem criada
   * @throws {ApiError} Em caso de erro na API
   */
  async addAnImageToAPaymentsLink(
    id: string,
    paymentLinkFileSaveRequestDto: PaymentLinkFileSaveRequestDto,
    filename: string
  ): Promise<PaymentLinkFileGetResponseDto> {
    const request = this.buildAddAnImageToAPaymentsLinkRequest(id, paymentLinkFileSaveRequestDto, filename);
    return this.execute<PaymentLinkFileGetResponseDto>(request);
  }

  /**
   * Adiciona uma imagem a um link de pagamento (versão assíncrona)
   */
  async addAnImageToAPaymentsLinkAsync(
    id: string,
    paymentLinkFileSaveRequestDto: PaymentLinkFileSaveRequestDto,
    filename: string
  ): Promise<PaymentLinkFileGetResponseDto> {
    return this.addAnImageToAPaymentsLink(id, paymentLinkFileSaveRequestDto, filename);
  }

  /**
   * Obtém uma imagem específica de um link
   *
   * @param paymentLinkId - Identificador único do link
   * @param imageId - Identificador único da imagem
   * @returns Promise com os dados da imagem
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASinglePaymentsLinkImage(paymentLinkId: string, imageId: string): Promise<PaymentLinkFileGetResponseDto> {
    const request = this.buildRetrieveASinglePaymentsLinkImageRequest(paymentLinkId, imageId);
    return this.execute<PaymentLinkFileGetResponseDto>(request);
  }

  /**
   * Obtém uma imagem específica de um link (versão assíncrona)
   */
  async retrieveASinglePaymentsLinkImageAsync(
    paymentLinkId: string,
    imageId: string
  ): Promise<PaymentLinkFileGetResponseDto> {
    return this.retrieveASinglePaymentsLinkImage(paymentLinkId, imageId);
  }

  /**
   * Remove uma imagem de um link de pagamento
   *
   * @param paymentLinkId - Identificador único do link
   * @param imageId - Identificador único da imagem
   * @returns Promise com resposta de confirmação
   * @throws {ApiError} Em caso de erro na API
   */
  async removeAnImageFromPaymentsLink(
    paymentLinkId: string,
    imageId: string
  ): Promise<PaymentLinkFileDeleteResponseDto> {
    const request = this.buildRemoveAnImageFromPaymentsLinkRequest(paymentLinkId, imageId);
    return this.execute<PaymentLinkFileDeleteResponseDto>(request);
  }

  /**
   * Remove uma imagem de um link de pagamento (versão assíncrona)
   */
  async removeAnImageFromPaymentsLinkAsync(
    paymentLinkId: string,
    imageId: string
  ): Promise<PaymentLinkFileDeleteResponseDto> {
    return this.removeAnImageFromPaymentsLink(paymentLinkId, imageId);
  }

  /**
   * Define a imagem principal de um link de pagamento
   *
   * @param paymentLinkId - Identificador único do link
   * @param imageId - Identificador único da imagem
   * @param input - Dados de atualização (opcional)
   * @returns Promise com a imagem atualizada
   * @throws {ApiError} Em caso de erro na API
   */
  async setPaymentsLinkMainImage(
    paymentLinkId: string,
    imageId: string,
    input?: Record<string, any>
  ): Promise<PaymentLinkFileGetResponseDto> {
    const request = this.buildSetPaymentsLinkMainImageRequest(paymentLinkId, imageId, input || {});
    return this.execute<PaymentLinkFileGetResponseDto>(request);
  }

  /**
   * Define a imagem principal de um link de pagamento (versão assíncrona)
   */
  async setPaymentsLinkMainImageAsync(
    paymentLinkId: string,
    imageId: string,
    input?: Record<string, any>
  ): Promise<PaymentLinkFileGetResponseDto> {
    return this.setPaymentsLinkMainImage(paymentLinkId, imageId, input);
  }

  // Métodos privados para construção de requisições

  private buildListPaymentsLinksRequest(params?: ListPaymentsLinksParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/paymentLinks");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("active", params.active)
        .setOptionalQueryParameter("includeDeleted", params.includeDeleted)
        .setOptionalQueryParameter("name", params.name)
        .setOptionalQueryParameter("externalReference", params.externalReference);
    }

    return builder.build();
  }

  private buildCreateAPaymentsLinkRequest(paymentLinkSaveRequestDto: PaymentLinkSaveRequestDto): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/paymentLinks");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(paymentLinkSaveRequestDto).build();
  }

  private buildRetrieveASinglePaymentsLinkRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/paymentLinks/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildUpdateAPaymentsLinkRequest(
    id: string,
    paymentLinkUpdateRequestDto: PaymentLinkUpdateRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.PUT, baseUrl, "v3/paymentLinks/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(paymentLinkUpdateRequestDto).build();
  }

  private buildRemoveAPaymentsLinkRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.DELETE, baseUrl, "v3/paymentLinks/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildRestoreAPaymentsLinkRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/paymentLinks/{id}/restore");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }

  private buildListImagesFromAPaymentsLinkRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/paymentLinks/{id}/images");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildAddAnImageToAPaymentsLinkRequest(
    id: string,
    paymentLinkFileSaveRequestDto: PaymentLinkFileSaveRequestDto,
    filename: string
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";

    // Cria FormData para multipart/form-data
    const formData = new FormData();
    if (paymentLinkFileSaveRequestDto.main !== undefined) {
      formData.append("main", String(paymentLinkFileSaveRequestDto.main));
    }

    let fileBuffer: Buffer;
    if (Buffer.isBuffer(paymentLinkFileSaveRequestDto.image)) {
      fileBuffer = paymentLinkFileSaveRequestDto.image;
    } else if (paymentLinkFileSaveRequestDto.image instanceof ArrayBuffer) {
      fileBuffer = Buffer.from(paymentLinkFileSaveRequestDto.image);
    } else if (paymentLinkFileSaveRequestDto.image instanceof Uint8Array) {
      fileBuffer = Buffer.from(paymentLinkFileSaveRequestDto.image);
    } else {
      fileBuffer = Buffer.from(paymentLinkFileSaveRequestDto.image as any);
    }

    formData.append("image", fileBuffer, {
      filename: filename,
      contentType: "application/octet-stream",
    });

    // Constrói a URL
    const url = `${baseUrl.replace(/\/$/, "")}/v3/paymentLinks/${encodeURIComponent(id)}/images`;

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

  private buildRetrieveASinglePaymentsLinkImageRequest(paymentLinkId: string, imageId: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(
      HttpMethod.GET,
      baseUrl,
      "v3/paymentLinks/{paymentLinkId}/images/{imageId}"
    );
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("paymentLinkId", paymentLinkId).setPathParameter("imageId", imageId).build();
  }

  private buildRemoveAnImageFromPaymentsLinkRequest(paymentLinkId: string, imageId: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(
      HttpMethod.DELETE,
      baseUrl,
      "v3/paymentLinks/{paymentLinkId}/images/{imageId}"
    );
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("paymentLinkId", paymentLinkId).setPathParameter("imageId", imageId).build();
  }

  private buildSetPaymentsLinkMainImageRequest(
    paymentLinkId: string,
    imageId: string,
    input: Record<string, any>
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(
      HttpMethod.PUT,
      baseUrl,
      "v3/paymentLinks/{paymentLinkId}/images/{imageId}/setAsMain"
    );
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder
      .setPathParameter("paymentLinkId", paymentLinkId)
      .setPathParameter("imageId", imageId)
      .setJsonContent(input)
      .build();
  }
}

