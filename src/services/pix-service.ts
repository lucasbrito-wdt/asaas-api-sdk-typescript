import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListKeysParameters,
  PixAddressKeyGetResponseDto,
  PixAddressKeyListResponseDto,
  PixAddressKeySaveRequestDto,
  PixQrCodeSaveRequestDto,
  PixQrCodeSaveResponseDto,
  PixQrCodeDeleteResponseDto,
  PixTokenBucketGetAddressKeyResponseDto,
} from "../models/pix";

/**
 * Serviço para gerenciamento de PIX
 */
export class PixService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista chaves PIX
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de chaves PIX
   * @throws {ApiError} Em caso de erro na API
   */
  async listKeys(params?: ListKeysParameters): Promise<PixAddressKeyListResponseDto> {
    const request = this.buildListKeysRequest(params);
    return this.execute<PixAddressKeyListResponseDto>(request);
  }

  /**
   * Lista chaves PIX (versão assíncrona)
   */
  async listKeysAsync(params?: ListKeysParameters): Promise<PixAddressKeyListResponseDto> {
    return this.listKeys(params);
  }

  /**
   * Cria uma nova chave PIX
   *
   * @param pixAddressKeySaveRequestDto - Dados da chave PIX a ser criada
   * @returns Promise com a chave PIX criada
   * @throws {ApiError} Em caso de erro na API
   */
  async createAKey(pixAddressKeySaveRequestDto: PixAddressKeySaveRequestDto): Promise<PixAddressKeyGetResponseDto> {
    const request = this.buildCreateAKeyRequest(pixAddressKeySaveRequestDto);
    return this.execute<PixAddressKeyGetResponseDto>(request);
  }

  /**
   * Cria uma nova chave PIX (versão assíncrona)
   */
  async createAKeyAsync(pixAddressKeySaveRequestDto: PixAddressKeySaveRequestDto): Promise<PixAddressKeyGetResponseDto> {
    return this.createAKey(pixAddressKeySaveRequestDto);
  }

  /**
   * Obtém uma chave PIX específica
   *
   * @param id - Identificador único da chave PIX
   * @returns Promise com os dados da chave PIX
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleKey(id: string): Promise<PixAddressKeyGetResponseDto> {
    const request = this.buildRetrieveASingleKeyRequest(id);
    return this.execute<PixAddressKeyGetResponseDto>(request);
  }

  /**
   * Obtém uma chave PIX específica (versão assíncrona)
   */
  async retrieveASingleKeyAsync(id: string): Promise<PixAddressKeyGetResponseDto> {
    return this.retrieveASingleKey(id);
  }

  /**
   * Remove uma chave PIX
   *
   * @param id - Identificador único da chave PIX
   * @returns Promise com os dados da chave removida
   * @throws {ApiError} Em caso de erro na API
   */
  async removeKey(id: string): Promise<PixAddressKeyGetResponseDto> {
    const request = this.buildRemoveKeyRequest(id);
    return this.execute<PixAddressKeyGetResponseDto>(request);
  }

  /**
   * Remove uma chave PIX (versão assíncrona)
   */
  async removeKeyAsync(id: string): Promise<PixAddressKeyGetResponseDto> {
    return this.removeKey(id);
  }

  /**
   * Cria um QR Code PIX estático
   *
   * @param pixQrCodeSaveRequestDto - Dados do QR Code a ser criado
   * @returns Promise com o QR Code criado
   * @throws {ApiError} Em caso de erro na API
   */
  async createStaticQrcode(pixQrCodeSaveRequestDto: PixQrCodeSaveRequestDto): Promise<PixQrCodeSaveResponseDto> {
    const request = this.buildCreateStaticQrcodeRequest(pixQrCodeSaveRequestDto);
    return this.execute<PixQrCodeSaveResponseDto>(request);
  }

  /**
   * Cria um QR Code PIX estático (versão assíncrona)
   */
  async createStaticQrcodeAsync(pixQrCodeSaveRequestDto: PixQrCodeSaveRequestDto): Promise<PixQrCodeSaveResponseDto> {
    return this.createStaticQrcode(pixQrCodeSaveRequestDto);
  }

  /**
   * Remove um QR Code PIX estático
   *
   * @param id - Identificador único do QR Code
   * @returns Promise com resposta de confirmação
   * @throws {ApiError} Em caso de erro na API
   */
  async deleteStaticQrcode(id: string): Promise<PixQrCodeDeleteResponseDto> {
    const request = this.buildDeleteStaticQrcodeRequest(id);
    return this.execute<PixQrCodeDeleteResponseDto>(request);
  }

  /**
   * Remove um QR Code PIX estático (versão assíncrona)
   */
  async deleteStaticQrcodeAsync(id: string): Promise<PixQrCodeDeleteResponseDto> {
    return this.deleteStaticQrcode(id);
  }

  /**
   * Verifica disponibilidade de token bucket para chaves PIX
   *
   * @returns Promise com informações de disponibilidade
   * @throws {ApiError} Em caso de erro na API
   */
  async availableTokenBucketCheck(): Promise<PixTokenBucketGetAddressKeyResponseDto> {
    const request = this.buildAvailableTokenBucketCheckRequest();
    return this.execute<PixTokenBucketGetAddressKeyResponseDto>(request);
  }

  /**
   * Verifica disponibilidade de token bucket (versão assíncrona)
   */
  async availableTokenBucketCheckAsync(): Promise<PixTokenBucketGetAddressKeyResponseDto> {
    return this.availableTokenBucketCheck();
  }

  // Métodos privados para construção de requisições

  private buildListKeysRequest(params?: ListKeysParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/pix/addressKeys");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    builder
      .setOptionalQueryParameter("offset", params?.offset)
      .setOptionalQueryParameter("limit", params?.limit)
      .setOptionalQueryParameter("statusList", params?.statusList);

    if (params?.status) {
      builder.setOptionalQueryParameter("status", params.status);
    }

    return builder.build();
  }

  private buildCreateAKeyRequest(pixAddressKeySaveRequestDto: PixAddressKeySaveRequestDto): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/pix/addressKeys");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(pixAddressKeySaveRequestDto).build();
  }

  private buildRetrieveASingleKeyRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/pix/addressKeys/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildRemoveKeyRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.DELETE, baseUrl, "v3/pix/addressKeys/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildCreateStaticQrcodeRequest(pixQrCodeSaveRequestDto: PixQrCodeSaveRequestDto): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/pix/qrCodes/static");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(pixQrCodeSaveRequestDto).build();
  }

  private buildDeleteStaticQrcodeRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.DELETE, baseUrl, "v3/pix/qrCodes/static/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildAvailableTokenBucketCheckRequest(): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/pix/tokenBucket/addressKey");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.build();
  }
}

