import { AxiosInstance, AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListAnticipationsParameters,
  AnticipationSaveRequestDto,
  AnticipationGetResponseDto,
  AnticipationListResponseDto,
  AnticipationSimulateRequestDto,
  AnticipationSimulateResponseDto,
  AnticipationLimitsResponseDto,
  AnticipationConfigurationGetResponseDto,
  AnticipationConfigurationUpdateRequestDto,
} from "../models/anticipation";

/**
 * Serviço para gerenciamento de antecipações
 */
export class AnticipationService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Obtém uma antecipação específica
   *
   * @param id - Identificador único da antecipação
   * @returns Promise com os dados da antecipação
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleAnticipation(id: string): Promise<AnticipationGetResponseDto> {
    const request = this.buildRetrieveASingleAnticipationRequest(id);
    return this.execute<AnticipationGetResponseDto>(request);
  }

  /**
   * Obtém uma antecipação específica (versão assíncrona)
   */
  async retrieveASingleAnticipationAsync(id: string): Promise<AnticipationGetResponseDto> {
    return this.retrieveASingleAnticipation(id);
  }

  /**
   * Lista antecipações
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de antecipações
   * @throws {ApiError} Em caso de erro na API
   */
  async listAnticipations(params?: ListAnticipationsParameters): Promise<AnticipationListResponseDto> {
    const request = this.buildListAnticipationsRequest(params);
    return this.execute<AnticipationListResponseDto>(request);
  }

  /**
   * Lista antecipações (versão assíncrona)
   */
  async listAnticipationsAsync(params?: ListAnticipationsParameters): Promise<AnticipationListResponseDto> {
    return this.listAnticipations(params);
  }

  /**
   * Cria uma antecipação
   *
   * @param anticipationSaveRequestDto - Dados da antecipação
   * @param filename - Nome do arquivo de documentos
   * @returns Promise com a antecipação criada
   * @throws {ApiError} Em caso de erro na API
   */
  async createAnAnticipation(
    anticipationSaveRequestDto: AnticipationSaveRequestDto,
    filename: string
  ): Promise<AnticipationGetResponseDto> {
    const request = this.buildCreateAnAnticipationRequest(anticipationSaveRequestDto, filename);
    return this.execute<AnticipationGetResponseDto>(request);
  }

  /**
   * Cria uma antecipação (versão assíncrona)
   */
  async createAnAnticipationAsync(
    anticipationSaveRequestDto: AnticipationSaveRequestDto,
    filename: string
  ): Promise<AnticipationGetResponseDto> {
    return this.createAnAnticipation(anticipationSaveRequestDto, filename);
  }

  /**
   * Simula uma antecipação
   *
   * @param anticipationSimulateRequestDto - Dados para simulação
   * @returns Promise com resultado da simulação
   * @throws {ApiError} Em caso de erro na API
   */
  async simulateAnticipation(
    anticipationSimulateRequestDto: AnticipationSimulateRequestDto
  ): Promise<AnticipationSimulateResponseDto> {
    const request = this.buildSimulateAnticipationRequest(anticipationSimulateRequestDto);
    return this.execute<AnticipationSimulateResponseDto>(request);
  }

  /**
   * Simula uma antecipação (versão assíncrona)
   */
  async simulateAnticipationAsync(
    anticipationSimulateRequestDto: AnticipationSimulateRequestDto
  ): Promise<AnticipationSimulateResponseDto> {
    return this.simulateAnticipation(anticipationSimulateRequestDto);
  }

  /**
   * Obtém status da antecipação automática
   *
   * @returns Promise com configuração de antecipação
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveStatusOfAutomaticAnticipation(): Promise<AnticipationConfigurationGetResponseDto> {
    const request = this.buildRetrieveStatusOfAutomaticAnticipationRequest();
    return this.execute<AnticipationConfigurationGetResponseDto>(request);
  }

  /**
   * Obtém status da antecipação automática (versão assíncrona)
   */
  async retrieveStatusOfAutomaticAnticipationAsync(): Promise<AnticipationConfigurationGetResponseDto> {
    return this.retrieveStatusOfAutomaticAnticipation();
  }

  /**
   * Atualiza status da antecipação automática
   *
   * @param anticipationConfigurationUpdateRequestDto - Dados de atualização
   * @returns Promise com configuração atualizada
   * @throws {ApiError} Em caso de erro na API
   */
  async updateStatusOfAutomaticAnticipation(
    anticipationConfigurationUpdateRequestDto: AnticipationConfigurationUpdateRequestDto
  ): Promise<AnticipationConfigurationGetResponseDto> {
    const request = this.buildUpdateStatusOfAutomaticAnticipationRequest(anticipationConfigurationUpdateRequestDto);
    return this.execute<AnticipationConfigurationGetResponseDto>(request);
  }

  /**
   * Atualiza status da antecipação automática (versão assíncrona)
   */
  async updateStatusOfAutomaticAnticipationAsync(
    anticipationConfigurationUpdateRequestDto: AnticipationConfigurationUpdateRequestDto
  ): Promise<AnticipationConfigurationGetResponseDto> {
    return this.updateStatusOfAutomaticAnticipation(anticipationConfigurationUpdateRequestDto);
  }

  /**
   * Obtém limites de antecipação
   *
   * @returns Promise com limites de antecipação
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveAnticipationLimits(): Promise<AnticipationLimitsResponseDto> {
    const request = this.buildRetrieveAnticipationLimitsRequest();
    return this.execute<AnticipationLimitsResponseDto>(request);
  }

  /**
   * Obtém limites de antecipação (versão assíncrona)
   */
  async retrieveAnticipationLimitsAsync(): Promise<AnticipationLimitsResponseDto> {
    return this.retrieveAnticipationLimits();
  }

  /**
   * Cancela uma antecipação
   *
   * @param id - Identificador único da antecipação
   * @param input - Dados do cancelamento (opcional)
   * @returns Promise com a antecipação cancelada
   * @throws {ApiError} Em caso de erro na API
   */
  async cancelAnticipation(id: string, input?: Record<string, any>): Promise<AnticipationGetResponseDto> {
    const request = this.buildCancelAnticipationRequest(id, input || {});
    return this.execute<AnticipationGetResponseDto>(request);
  }

  /**
   * Cancela uma antecipação (versão assíncrona)
   */
  async cancelAnticipationAsync(id: string, input?: Record<string, any>): Promise<AnticipationGetResponseDto> {
    return this.cancelAnticipation(id, input);
  }

  // Métodos privados para construção de requisições

  private buildRetrieveASingleAnticipationRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/anticipations/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildListAnticipationsRequest(params?: ListAnticipationsParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/anticipations");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("payment", params.payment)
        .setOptionalQueryParameter("installment", params.installment);

      if (params.status) {
        builder.setOptionalQueryParameter("status", params.status);
      }
    }

    return builder.build();
  }

  private buildCreateAnAnticipationRequest(
    anticipationSaveRequestDto: AnticipationSaveRequestDto,
    filename: string
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";

    // Cria FormData para multipart/form-data
    const formData = new FormData();
    if (anticipationSaveRequestDto.installment) {
      formData.append("installment", anticipationSaveRequestDto.installment);
    }
    if (anticipationSaveRequestDto.payment) {
      formData.append("payment", anticipationSaveRequestDto.payment);
    }
    if (anticipationSaveRequestDto.documents) {
      // Converte o arquivo para Buffer se necessário
      let fileBuffer: Buffer;
      if (Buffer.isBuffer(anticipationSaveRequestDto.documents)) {
        fileBuffer = anticipationSaveRequestDto.documents;
      } else if (anticipationSaveRequestDto.documents instanceof ArrayBuffer) {
        fileBuffer = Buffer.from(anticipationSaveRequestDto.documents);
      } else if (anticipationSaveRequestDto.documents instanceof Uint8Array) {
        fileBuffer = Buffer.from(anticipationSaveRequestDto.documents);
      } else {
        fileBuffer = Buffer.from(anticipationSaveRequestDto.documents as any);
      }
      
      formData.append("documents", fileBuffer, {
        filename: filename,
        contentType: "application/octet-stream",
      });
    }

    // Constrói a URL
    const url = `${baseUrl.replace(/\/$/, "")}/v3/anticipations`;

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

  private buildSimulateAnticipationRequest(
    anticipationSimulateRequestDto: AnticipationSimulateRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/anticipations/simulate");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(anticipationSimulateRequestDto).build();
  }

  private buildRetrieveStatusOfAutomaticAnticipationRequest(): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/anticipations/configurations");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.build();
  }

  private buildUpdateStatusOfAutomaticAnticipationRequest(
    anticipationConfigurationUpdateRequestDto: AnticipationConfigurationUpdateRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.PUT, baseUrl, "v3/anticipations/configurations");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(anticipationConfigurationUpdateRequestDto).build();
  }

  private buildRetrieveAnticipationLimitsRequest(): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/anticipations/limits");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.build();
  }

  private buildCancelAnticipationRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/anticipations/{id}/cancel");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }
}

