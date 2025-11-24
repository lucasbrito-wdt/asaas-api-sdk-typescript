import { AxiosInstance, AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  FiscalInfoGetResponseDto,
  FiscalInfoSaveRequestDto,
  FiscalInfoMunicipalOptionsGetResponseDto,
  FiscalInfoListInvoiceNbsCodesResponseDto,
  FiscalInfoListMunicipalServicesResponseDto,
  ListMunicipalServicesParameters,
  ListNbsCodesParameters,
  FiscalInfoUpdateUseNationalPortalRequestDto,
  FiscalInfoUpdateUseNationalPortalResponseDto,
} from "../models/fiscal-info";

/**
 * Serviço para gerenciamento de informações fiscais
 */
export class FiscalInfoService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista configurações municipais
   *
   * @returns Promise com opções municipais
   * @throws {ApiError} Em caso de erro na API
   */
  async listMunicipalConfigurations(): Promise<FiscalInfoMunicipalOptionsGetResponseDto> {
    const request = this.buildListMunicipalConfigurationsRequest();
    return this.execute<FiscalInfoMunicipalOptionsGetResponseDto>(request);
  }

  /**
   * Lista configurações municipais (versão assíncrona)
   */
  async listMunicipalConfigurationsAsync(): Promise<FiscalInfoMunicipalOptionsGetResponseDto> {
    return this.listMunicipalConfigurations();
  }

  /**
   * Obtém informações fiscais
   *
   * @returns Promise com informações fiscais
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveTaxInformation(): Promise<FiscalInfoGetResponseDto> {
    const request = this.buildRetrieveTaxInformationRequest();
    return this.execute<FiscalInfoGetResponseDto>(request);
  }

  /**
   * Obtém informações fiscais (versão assíncrona)
   */
  async retrieveTaxInformationAsync(): Promise<FiscalInfoGetResponseDto> {
    return this.retrieveTaxInformation();
  }

  /**
   * Cria ou atualiza informações fiscais
   *
   * @param fiscalInfoSaveRequestDto - Dados das informações fiscais
   * @param filename - Nome do arquivo
   * @returns Promise com informações fiscais criadas/atualizadas
   * @throws {ApiError} Em caso de erro na API
   */
  async createAndUpdateTaxInformation(
    fiscalInfoSaveRequestDto: FiscalInfoSaveRequestDto,
    filename: string
  ): Promise<FiscalInfoGetResponseDto> {
    const request = this.buildCreateAndUpdateTaxInformationRequest(fiscalInfoSaveRequestDto, filename);
    return this.execute<FiscalInfoGetResponseDto>(request);
  }

  /**
   * Cria ou atualiza informações fiscais (versão assíncrona)
   */
  async createAndUpdateTaxInformationAsync(
    fiscalInfoSaveRequestDto: FiscalInfoSaveRequestDto,
    filename: string
  ): Promise<FiscalInfoGetResponseDto> {
    return this.createAndUpdateTaxInformation(fiscalInfoSaveRequestDto, filename);
  }

  /**
   * Lista serviços municipais
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de serviços municipais
   * @throws {ApiError} Em caso de erro na API
   */
  async listMunicipalServices(
    params?: ListMunicipalServicesParameters
  ): Promise<FiscalInfoListMunicipalServicesResponseDto> {
    const request = this.buildListMunicipalServicesRequest(params);
    return this.execute<FiscalInfoListMunicipalServicesResponseDto>(request);
  }

  /**
   * Lista serviços municipais (versão assíncrona)
   */
  async listMunicipalServicesAsync(
    params?: ListMunicipalServicesParameters
  ): Promise<FiscalInfoListMunicipalServicesResponseDto> {
    return this.listMunicipalServices(params);
  }

  /**
   * Lista códigos NBS
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de códigos NBS
   * @throws {ApiError} Em caso de erro na API
   */
  async listInvoiceNbsCodes(params?: ListNbsCodesParameters): Promise<FiscalInfoListInvoiceNbsCodesResponseDto> {
    const request = this.buildListInvoiceNbsCodesRequest(params);
    return this.execute<FiscalInfoListInvoiceNbsCodesResponseDto>(request);
  }

  /**
   * Lista códigos NBS (versão assíncrona)
   */
  async listInvoiceNbsCodesAsync(params?: ListNbsCodesParameters): Promise<FiscalInfoListInvoiceNbsCodesResponseDto> {
    return this.listInvoiceNbsCodes(params);
  }

  /**
   * Atualiza uso do portal nacional
   *
   * @param fiscalInfoUpdateUseNationalPortalRequestDto - Dados para atualização
   * @returns Promise com resposta de atualização
   * @throws {ApiError} Em caso de erro na API
   */
  async updateUseNationalPortal(
    fiscalInfoUpdateUseNationalPortalRequestDto: FiscalInfoUpdateUseNationalPortalRequestDto
  ): Promise<FiscalInfoUpdateUseNationalPortalResponseDto> {
    const request = this.buildUpdateUseNationalPortalRequest(fiscalInfoUpdateUseNationalPortalRequestDto);
    return this.execute<FiscalInfoUpdateUseNationalPortalResponseDto>(request);
  }

  /**
   * Atualiza uso do portal nacional (versão assíncrona)
   */
  async updateUseNationalPortalAsync(
    fiscalInfoUpdateUseNationalPortalRequestDto: FiscalInfoUpdateUseNationalPortalRequestDto
  ): Promise<FiscalInfoUpdateUseNationalPortalResponseDto> {
    return this.updateUseNationalPortal(fiscalInfoUpdateUseNationalPortalRequestDto);
  }

  // Métodos privados para construção de requisições

  private buildListMunicipalConfigurationsRequest(): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/fiscalInfo/municipalOptions");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.build();
  }

  private buildRetrieveTaxInformationRequest(): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/fiscalInfo/");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.build();
  }

  private buildCreateAndUpdateTaxInformationRequest(
    fiscalInfoSaveRequestDto: FiscalInfoSaveRequestDto,
    filename: string
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";

    const formData = new FormData();
    if (fiscalInfoSaveRequestDto.file) {
      let fileBuffer: Buffer;
      if (Buffer.isBuffer(fiscalInfoSaveRequestDto.file)) {
        fileBuffer = fiscalInfoSaveRequestDto.file;
      } else if (fiscalInfoSaveRequestDto.file instanceof ArrayBuffer) {
        fileBuffer = Buffer.from(fiscalInfoSaveRequestDto.file);
      } else if (fiscalInfoSaveRequestDto.file instanceof Uint8Array) {
        fileBuffer = Buffer.from(fiscalInfoSaveRequestDto.file);
      } else {
        fileBuffer = Buffer.from(fiscalInfoSaveRequestDto.file as any);
      }
      formData.append("file", fileBuffer, {
        filename: filename,
        contentType: "application/octet-stream",
      });
    }

    const url = `${baseUrl.replace(/\/$/, "")}/v3/fiscalInfo/`;

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

  private buildListMunicipalServicesRequest(params?: ListMunicipalServicesParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/fiscalInfo/services");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder.setOptionalQueryParameter("offset", params.offset).setOptionalQueryParameter("limit", params.limit);
    }

    return builder.build();
  }

  private buildListInvoiceNbsCodesRequest(params?: ListNbsCodesParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/fiscalInfo/nbsCodes");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder.setOptionalQueryParameter("offset", params.offset).setOptionalQueryParameter("limit", params.limit);
    }

    return builder.build();
  }

  /**
   * Configura portal de emissão de notas fiscais (alias para compatibilidade)
   */
  async configureInvoiceIssuingPortal(
    fiscalInfoUpdateUseNationalPortalRequestDto: FiscalInfoUpdateUseNationalPortalRequestDto
  ): Promise<FiscalInfoUpdateUseNationalPortalResponseDto> {
    return this.updateUseNationalPortal(fiscalInfoUpdateUseNationalPortalRequestDto);
  }

  /**
   * Configura portal de emissão de notas fiscais (versão assíncrona)
   */
  async configureInvoiceIssuingPortalAsync(
    fiscalInfoUpdateUseNationalPortalRequestDto: FiscalInfoUpdateUseNationalPortalRequestDto
  ): Promise<FiscalInfoUpdateUseNationalPortalResponseDto> {
    return this.updateUseNationalPortal(fiscalInfoUpdateUseNationalPortalRequestDto);
  }

  private buildUpdateUseNationalPortalRequest(
    fiscalInfoUpdateUseNationalPortalRequestDto: FiscalInfoUpdateUseNationalPortalRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/fiscalInfo/nationalPortal");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(fiscalInfoUpdateUseNationalPortalRequestDto).build();
  }
}

