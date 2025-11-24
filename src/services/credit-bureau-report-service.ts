import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListCreditBureauReportsParameters,
  CreditBureauReportSaveRequestDto,
  CreditBureauReportGetResponseDto,
  CreditBureauReportListResponseDto,
} from "../models/credit-bureau-report";

/**
 * Serviço para consultas de relatórios de crédito
 */
export class CreditBureauReportService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista relatórios de crédito
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de relatórios
   * @throws {ApiError} Em caso de erro na API
   */
  async listCreditBureauReports(
    params?: ListCreditBureauReportsParameters
  ): Promise<CreditBureauReportListResponseDto> {
    const request = this.buildListCreditBureauReportsRequest(params);
    return this.execute<CreditBureauReportListResponseDto>(request);
  }

  /**
   * Lista relatórios de crédito (versão assíncrona)
   */
  async listCreditBureauReportsAsync(
    params?: ListCreditBureauReportsParameters
  ): Promise<CreditBureauReportListResponseDto> {
    return this.listCreditBureauReports(params);
  }

  /**
   * Faz uma consulta de relatório de crédito
   *
   * @param creditBureauReportSaveRequestDto - Dados para consulta
   * @returns Promise com relatório criado
   * @throws {ApiError} Em caso de erro na API
   */
  async makeConsultation(
    creditBureauReportSaveRequestDto: CreditBureauReportSaveRequestDto
  ): Promise<CreditBureauReportGetResponseDto> {
    const request = this.buildMakeConsultationRequest(creditBureauReportSaveRequestDto);
    return this.execute<CreditBureauReportGetResponseDto>(request);
  }

  /**
   * Faz uma consulta de relatório de crédito (versão assíncrona)
   */
  async makeConsultationAsync(
    creditBureauReportSaveRequestDto: CreditBureauReportSaveRequestDto
  ): Promise<CreditBureauReportGetResponseDto> {
    return this.makeConsultation(creditBureauReportSaveRequestDto);
  }

  /**
   * Obtém um relatório de crédito específico
   *
   * @param id - Identificador único do relatório
   * @returns Promise com relatório
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveACreditBureauReport(id: string): Promise<CreditBureauReportGetResponseDto> {
    const request = this.buildRetrieveACreditBureauReportRequest(id);
    return this.execute<CreditBureauReportGetResponseDto>(request);
  }

  /**
   * Obtém um relatório de crédito específico (versão assíncrona)
   */
  async retrieveACreditBureauReportAsync(id: string): Promise<CreditBureauReportGetResponseDto> {
    return this.retrieveACreditBureauReport(id);
  }

  // Métodos privados para construção de requisições

  private buildListCreditBureauReportsRequest(
    params?: ListCreditBureauReportsParameters
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/creditBureauReport");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("startDate", params.startDate)
        .setOptionalQueryParameter("endDate", params.endDate);
    }

    return builder.build();
  }

  private buildMakeConsultationRequest(
    creditBureauReportSaveRequestDto: CreditBureauReportSaveRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/creditBureauReport");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(creditBureauReportSaveRequestDto).build();
  }

  private buildRetrieveACreditBureauReportRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/creditBureauReport/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }
}

