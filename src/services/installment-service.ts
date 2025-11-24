import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListInstallmentsParameters,
  InstallmentSaveRequestDto,
  InstallmentGetResponseDto,
  InstallmentListResponseDto,
  InstallmentDeleteResponseDto,
} from "../models/installment";
import { PaymentListResponseDto } from "../models/payment";

/**
 * Serviço para gerenciamento de parcelas
 */
export class InstallmentService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista parcelas
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de parcelas
   * @throws {ApiError} Em caso de erro na API
   */
  async listInstallments(params?: ListInstallmentsParameters): Promise<InstallmentListResponseDto> {
    const request = this.buildListInstallmentsRequest(params);
    return this.execute<InstallmentListResponseDto>(request);
  }

  /**
   * Lista parcelas (versão assíncrona)
   */
  async listInstallmentsAsync(params?: ListInstallmentsParameters): Promise<InstallmentListResponseDto> {
    return this.listInstallments(params);
  }

  /**
   * Cria uma parcela
   *
   * @param installmentSaveRequestDto - Dados da parcela
   * @returns Promise com parcela criada
   * @throws {ApiError} Em caso de erro na API
   */
  async createInstallment(installmentSaveRequestDto: InstallmentSaveRequestDto): Promise<InstallmentGetResponseDto> {
    const request = this.buildCreateInstallmentRequest(installmentSaveRequestDto);
    return this.execute<InstallmentGetResponseDto>(request);
  }

  /**
   * Cria uma parcela (versão assíncrona)
   */
  async createInstallmentAsync(installmentSaveRequestDto: InstallmentSaveRequestDto): Promise<InstallmentGetResponseDto> {
    return this.createInstallment(installmentSaveRequestDto);
  }

  /**
   * Obtém uma parcela específica
   *
   * @param id - Identificador único da parcela
   * @returns Promise com parcela
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleInstallment(id: string): Promise<InstallmentGetResponseDto> {
    const request = this.buildRetrieveASingleInstallmentRequest(id);
    return this.execute<InstallmentGetResponseDto>(request);
  }

  /**
   * Obtém uma parcela específica (versão assíncrona)
   */
  async retrieveASingleInstallmentAsync(id: string): Promise<InstallmentGetResponseDto> {
    return this.retrieveASingleInstallment(id);
  }

  /**
   * Remove uma parcela
   *
   * @param id - Identificador único da parcela
   * @returns Promise com resposta de confirmação
   * @throws {ApiError} Em caso de erro na API
   */
  async removeInstallment(id: string): Promise<InstallmentDeleteResponseDto> {
    const request = this.buildRemoveInstallmentRequest(id);
    return this.execute<InstallmentDeleteResponseDto>(request);
  }

  /**
   * Remove uma parcela (versão assíncrona)
   */
  async removeInstallmentAsync(id: string): Promise<InstallmentDeleteResponseDto> {
    return this.removeInstallment(id);
  }

  /**
   * Lista pagamentos de uma parcela
   *
   * @param id - Identificador único da parcela
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de pagamentos
   * @throws {ApiError} Em caso de erro na API
   */
  async listPaymentsOfAInstallment(id: string, params?: { status?: string | null }): Promise<PaymentListResponseDto> {
    const request = this.buildListPaymentsOfAInstallmentRequest(id, params);
    return this.execute<PaymentListResponseDto>(request);
  }

  /**
   * Lista pagamentos de uma parcela (versão assíncrona)
   */
  async listPaymentsOfAInstallmentAsync(
    id: string,
    params?: { status?: string | null }
  ): Promise<PaymentListResponseDto> {
    return this.listPaymentsOfAInstallment(id, params);
  }

  /**
   * Gera carnê de parcelas
   *
   * @param id - Identificador único da parcela
   * @param params - Parâmetros (opcional)
   * @returns Promise com arquivo PDF (Buffer)
   * @throws {ApiError} Em caso de erro na API
   */
  async generateInstallmentBooklet(
    id: string,
    params?: { sort?: string | null; order?: string | null }
  ): Promise<Buffer> {
    const request = this.buildGenerateInstallmentBookletRequest(id, params);
    const response = await this.httpClient.request<ArrayBuffer>({
      ...request,
      responseType: "arraybuffer",
    });
    return Buffer.from(response.data);
  }

  /**
   * Gera carnê de parcelas (versão assíncrona)
   */
  async generateInstallmentBookletAsync(
    id: string,
    params?: { sort?: string | null; order?: string | null }
  ): Promise<Buffer> {
    return this.generateInstallmentBooklet(id, params);
  }

  /**
   * Reembolsa uma parcela
   *
   * @param id - Identificador único da parcela
   * @param input - Dados do reembolso (opcional)
   * @returns Promise com parcela reembolsada
   * @throws {ApiError} Em caso de erro na API
   */
  async refundInstallment(id: string, input?: Record<string, any>): Promise<InstallmentGetResponseDto> {
    const request = this.buildRefundInstallmentRequest(id, input || {});
    return this.execute<InstallmentGetResponseDto>(request);
  }

  /**
   * Reembolsa uma parcela (versão assíncrona)
   */
  async refundInstallmentAsync(id: string, input?: Record<string, any>): Promise<InstallmentGetResponseDto> {
    return this.refundInstallment(id, input);
  }

  // Métodos privados para construção de requisições

  private buildListInstallmentsRequest(params?: ListInstallmentsParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/installments");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder.setOptionalQueryParameter("offset", params.offset).setOptionalQueryParameter("limit", params.limit);
    }

    return builder.build();
  }

  private buildCreateInstallmentRequest(installmentSaveRequestDto: InstallmentSaveRequestDto): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/installments");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(installmentSaveRequestDto).build();
  }

  private buildRetrieveASingleInstallmentRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/installments/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildRemoveInstallmentRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.DELETE, baseUrl, "v3/installments/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildListPaymentsOfAInstallmentRequest(
    id: string,
    params?: { status?: string | null }
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/installments/{id}/payments");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    builder.setPathParameter("id", id);

    if (params?.status) {
      builder.setOptionalQueryParameter("status", params.status);
    }

    return builder.build();
  }

  private buildGenerateInstallmentBookletRequest(
    id: string,
    params?: { sort?: string | null; order?: string | null }
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/installments/{id}/paymentBook");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    builder.setPathParameter("id", id);

    if (params) {
      builder
        .setOptionalQueryParameter("sort", params.sort)
        .setOptionalQueryParameter("order", params.order);
    }

    return builder.build();
  }

  private buildRefundInstallmentRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/installments/{id}/refund");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }
}

