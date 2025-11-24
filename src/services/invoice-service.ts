import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListInvoicesParameters,
  InvoiceSaveRequestDto,
  InvoiceGetResponseDto,
  InvoiceListResponseDto,
  InvoiceUpdateRequestDto,
  InvoiceCancelRequestDto,
} from "../models/invoice";

/**
 * Serviço para gerenciamento de faturas
 */
export class InvoiceService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista faturas
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de faturas
   * @throws {ApiError} Em caso de erro na API
   */
  async listInvoices(params?: ListInvoicesParameters): Promise<InvoiceListResponseDto> {
    const request = this.buildListInvoicesRequest(params);
    return this.execute<InvoiceListResponseDto>(request);
  }

  /**
   * Lista faturas (versão assíncrona)
   */
  async listInvoicesAsync(params?: ListInvoicesParameters): Promise<InvoiceListResponseDto> {
    return this.listInvoices(params);
  }

  /**
   * Agenda uma fatura
   *
   * @param invoiceSaveRequestDto - Dados da fatura
   * @returns Promise com fatura criada
   * @throws {ApiError} Em caso de erro na API
   */
  async scheduleInvoice(invoiceSaveRequestDto: InvoiceSaveRequestDto): Promise<InvoiceGetResponseDto> {
    const request = this.buildScheduleInvoiceRequest(invoiceSaveRequestDto);
    return this.execute<InvoiceGetResponseDto>(request);
  }

  /**
   * Agenda uma fatura (versão assíncrona)
   */
  async scheduleInvoiceAsync(invoiceSaveRequestDto: InvoiceSaveRequestDto): Promise<InvoiceGetResponseDto> {
    return this.scheduleInvoice(invoiceSaveRequestDto);
  }

  /**
   * Obtém uma fatura específica
   *
   * @param id - Identificador único da fatura
   * @returns Promise com fatura
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleInvoice(id: string): Promise<InvoiceGetResponseDto> {
    const request = this.buildRetrieveASingleInvoiceRequest(id);
    return this.execute<InvoiceGetResponseDto>(request);
  }

  /**
   * Obtém uma fatura específica (versão assíncrona)
   */
  async retrieveASingleInvoiceAsync(id: string): Promise<InvoiceGetResponseDto> {
    return this.retrieveASingleInvoice(id);
  }

  /**
   * Atualiza uma fatura
   *
   * @param id - Identificador único da fatura
   * @param invoiceUpdateRequestDto - Dados de atualização
   * @returns Promise com fatura atualizada
   * @throws {ApiError} Em caso de erro na API
   */
  async updateInvoice(id: string, invoiceUpdateRequestDto: InvoiceUpdateRequestDto): Promise<InvoiceGetResponseDto> {
    const request = this.buildUpdateInvoiceRequest(id, invoiceUpdateRequestDto);
    return this.execute<InvoiceGetResponseDto>(request);
  }

  /**
   * Atualiza uma fatura (versão assíncrona)
   */
  async updateInvoiceAsync(
    id: string,
    invoiceUpdateRequestDto: InvoiceUpdateRequestDto
  ): Promise<InvoiceGetResponseDto> {
    return this.updateInvoice(id, invoiceUpdateRequestDto);
  }

  /**
   * Emite uma fatura
   *
   * @param id - Identificador único da fatura
   * @param input - Dados da emissão (opcional)
   * @returns Promise com fatura emitida
   * @throws {ApiError} Em caso de erro na API
   */
  async issueAnInvoice(id: string, input?: Record<string, any>): Promise<InvoiceGetResponseDto> {
    const request = this.buildIssueAnInvoiceRequest(id, input || {});
    return this.execute<InvoiceGetResponseDto>(request);
  }

  /**
   * Emite uma fatura (versão assíncrona)
   */
  async issueAnInvoiceAsync(id: string, input?: Record<string, any>): Promise<InvoiceGetResponseDto> {
    return this.issueAnInvoice(id, input);
  }

  /**
   * Cancela uma fatura
   *
   * @param id - Identificador único da fatura
   * @param invoiceCancelRequestDto - Dados do cancelamento
   * @returns Promise com fatura cancelada
   * @throws {ApiError} Em caso de erro na API
   */
  async cancelAnInvoice(id: string, invoiceCancelRequestDto: InvoiceCancelRequestDto): Promise<InvoiceGetResponseDto> {
    const request = this.buildCancelAnInvoiceRequest(id, invoiceCancelRequestDto);
    return this.execute<InvoiceGetResponseDto>(request);
  }

  /**
   * Cancela uma fatura (versão assíncrona)
   */
  async cancelAnInvoiceAsync(
    id: string,
    invoiceCancelRequestDto: InvoiceCancelRequestDto
  ): Promise<InvoiceGetResponseDto> {
    return this.cancelAnInvoice(id, invoiceCancelRequestDto);
  }

  // Métodos privados para construção de requisições

  private buildListInvoicesRequest(params?: ListInvoicesParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/invoices");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("effectiveDate[Ge]", params.effectiveDateGe)
        .setOptionalQueryParameter("effectiveDate[Le]", params.effectiveDateLe)
        .setOptionalQueryParameter("payment", params.payment)
        .setOptionalQueryParameter("installment", params.installment)
        .setOptionalQueryParameter("externalReference", params.externalReference)
        .setOptionalQueryParameter("customer", params.customer);

      if (params.status) {
        builder.setOptionalQueryParameter("status", params.status);
      }
    }

    return builder.build();
  }

  private buildScheduleInvoiceRequest(invoiceSaveRequestDto: InvoiceSaveRequestDto): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/invoices");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(invoiceSaveRequestDto).build();
  }

  private buildRetrieveASingleInvoiceRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/invoices/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildUpdateInvoiceRequest(id: string, invoiceUpdateRequestDto: InvoiceUpdateRequestDto): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.PUT, baseUrl, "v3/invoices/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(invoiceUpdateRequestDto).build();
  }

  private buildIssueAnInvoiceRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/invoices/{id}/authorize");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }

  private buildCancelAnInvoiceRequest(id: string, invoiceCancelRequestDto: InvoiceCancelRequestDto): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/invoices/{id}/cancel");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(invoiceCancelRequestDto).build();
  }
}

