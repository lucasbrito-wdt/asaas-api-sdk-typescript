import { AxiosInstance, AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListPaymentDunningsParameters,
  PaymentDunningSaveRequestDto,
  PaymentDunningShowResponseDto,
  PaymentDunningListResponseDto,
  PaymentDunningCancelResponseDto,
  SimulateAPaymentDunningParameters,
  PaymentDunningSimulateResponseDto,
  EventHistoryListsParameters,
  ListPaymentsReceivedParameters,
  ListPaymentsAvailableForPaymentDunningParameters,
  PaymentDunningListHistoryResponseDto,
  PaymentDunningListPartialPaymentsResponseDto,
  PaymentDunningPaymentsAvailableForDunningResponseDto,
  PaymentDunningSaveDocumentsRequestDto,
  PaymentDunningSaveDocumentsResponseDto,
} from "../models/payment-dunning";

/**
 * Serviço para gerenciamento de cobranças de inadimplência
 */
export class PaymentDunningService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista cobranças de inadimplência
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de cobranças
   * @throws {ApiError} Em caso de erro na API
   */
  async listPaymentDunnings(params?: ListPaymentDunningsParameters): Promise<PaymentDunningListResponseDto> {
    const request = this.buildListPaymentDunningsRequest(params);
    return this.execute<PaymentDunningListResponseDto>(request);
  }

  /**
   * Lista cobranças de inadimplência (versão assíncrona)
   */
  async listPaymentDunningsAsync(params?: ListPaymentDunningsParameters): Promise<PaymentDunningListResponseDto> {
    return this.listPaymentDunnings(params);
  }

  /**
   * Cria uma nova cobrança de inadimplência
   *
   * @param paymentDunningSaveRequestDto - Dados da cobrança a ser criada
   * @param filename - Nome do arquivo de documentos
   * @returns Promise com a cobrança criada
   * @throws {ApiError} Em caso de erro na API
   */
  async createAPaymentDunning(
    paymentDunningSaveRequestDto: PaymentDunningSaveRequestDto,
    filename: string
  ): Promise<PaymentDunningShowResponseDto> {
    const request = this.buildCreateAPaymentDunningRequest(paymentDunningSaveRequestDto, filename);
    return this.execute<PaymentDunningShowResponseDto>(request);
  }

  /**
   * Cria uma nova cobrança de inadimplência (versão assíncrona)
   */
  async createAPaymentDunningAsync(
    paymentDunningSaveRequestDto: PaymentDunningSaveRequestDto,
    filename: string
  ): Promise<PaymentDunningShowResponseDto> {
    return this.createAPaymentDunning(paymentDunningSaveRequestDto, filename);
  }

  /**
   * Simula uma cobrança de inadimplência
   *
   * @param params - Parâmetros de simulação (opcional)
   * @returns Promise com resultado da simulação
   * @throws {ApiError} Em caso de erro na API
   */
  async simulateAPaymentDunning(params?: SimulateAPaymentDunningParameters): Promise<PaymentDunningSimulateResponseDto> {
    const request = this.buildSimulateAPaymentDunningRequest(params);
    return this.execute<PaymentDunningSimulateResponseDto>(request);
  }

  /**
   * Simula uma cobrança de inadimplência (versão assíncrona)
   */
  async simulateAPaymentDunningAsync(params?: SimulateAPaymentDunningParameters): Promise<PaymentDunningSimulateResponseDto> {
    return this.simulateAPaymentDunning(params);
  }

  /**
   * Obtém uma cobrança específica
   *
   * @param id - Identificador único da cobrança
   * @returns Promise com os dados da cobrança
   * @throws {ApiError} Em caso de erro na API
   */
  async recoverASinglePaymentDunning(id: string): Promise<PaymentDunningShowResponseDto> {
    const request = this.buildRecoverASinglePaymentDunningRequest(id);
    return this.execute<PaymentDunningShowResponseDto>(request);
  }

  /**
   * Obtém uma cobrança específica (versão assíncrona)
   */
  async recoverASinglePaymentDunningAsync(id: string): Promise<PaymentDunningShowResponseDto> {
    return this.recoverASinglePaymentDunning(id);
  }

  /**
   * Lista histórico de eventos de uma cobrança
   *
   * @param id - Identificador único da cobrança
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com histórico de eventos
   * @throws {ApiError} Em caso de erro na API
   */
  async eventHistoryLists(
    id: string,
    params?: EventHistoryListsParameters
  ): Promise<PaymentDunningListHistoryResponseDto> {
    const request = this.buildEventHistoryListsRequest(id, params);
    return this.execute<PaymentDunningListHistoryResponseDto>(request);
  }

  /**
   * Lista histórico de eventos de uma cobrança (versão assíncrona)
   */
  async eventHistoryListsAsync(
    id: string,
    params?: EventHistoryListsParameters
  ): Promise<PaymentDunningListHistoryResponseDto> {
    return this.eventHistoryLists(id, params);
  }

  /**
   * Lista pagamentos recebidos de uma cobrança
   *
   * @param id - Identificador único da cobrança
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de pagamentos recebidos
   * @throws {ApiError} Em caso de erro na API
   */
  async listPaymentsReceived(
    id: string,
    params?: ListPaymentsReceivedParameters
  ): Promise<PaymentDunningListPartialPaymentsResponseDto> {
    const request = this.buildListPaymentsReceivedRequest(id, params);
    return this.execute<PaymentDunningListPartialPaymentsResponseDto>(request);
  }

  /**
   * Lista pagamentos recebidos de uma cobrança (versão assíncrona)
   */
  async listPaymentsReceivedAsync(
    id: string,
    params?: ListPaymentsReceivedParameters
  ): Promise<PaymentDunningListPartialPaymentsResponseDto> {
    return this.listPaymentsReceived(id, params);
  }

  /**
   * Lista pagamentos disponíveis para cobrança
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de pagamentos disponíveis
   * @throws {ApiError} Em caso de erro na API
   */
  async listPaymentsAvailableForPaymentDunning(
    params?: ListPaymentsAvailableForPaymentDunningParameters
  ): Promise<PaymentDunningPaymentsAvailableForDunningResponseDto> {
    const request = this.buildListPaymentsAvailableForPaymentDunningRequest(params);
    return this.execute<PaymentDunningPaymentsAvailableForDunningResponseDto>(request);
  }

  /**
   * Lista pagamentos disponíveis para cobrança (versão assíncrona)
   */
  async listPaymentsAvailableForPaymentDunningAsync(
    params?: ListPaymentsAvailableForPaymentDunningParameters
  ): Promise<PaymentDunningPaymentsAvailableForDunningResponseDto> {
    return this.listPaymentsAvailableForPaymentDunning(params);
  }

  /**
   * Reenvia documentos de uma cobrança
   *
   * @param id - Identificador único da cobrança
   * @param paymentDunningSaveDocumentsRequestDto - Dados dos documentos
   * @param filename - Nome do arquivo
   * @returns Promise com resposta de confirmação
   * @throws {ApiError} Em caso de erro na API
   */
  async resendDocuments(
    id: string,
    paymentDunningSaveDocumentsRequestDto: PaymentDunningSaveDocumentsRequestDto,
    filename: string
  ): Promise<PaymentDunningSaveDocumentsResponseDto> {
    const request = this.buildResendDocumentsRequest(id, paymentDunningSaveDocumentsRequestDto, filename);
    return this.execute<PaymentDunningSaveDocumentsResponseDto>(request);
  }

  /**
   * Reenvia documentos de uma cobrança (versão assíncrona)
   */
  async resendDocumentsAsync(
    id: string,
    paymentDunningSaveDocumentsRequestDto: PaymentDunningSaveDocumentsRequestDto,
    filename: string
  ): Promise<PaymentDunningSaveDocumentsResponseDto> {
    return this.resendDocuments(id, paymentDunningSaveDocumentsRequestDto, filename);
  }

  /**
   * Cancela uma cobrança de inadimplência
   *
   * @param id - Identificador único da cobrança
   * @param input - Dados do cancelamento (opcional)
   * @returns Promise com resposta de cancelamento
   * @throws {ApiError} Em caso de erro na API
   */
  async cancelPaymentDunning(id: string, input?: Record<string, any>): Promise<PaymentDunningCancelResponseDto> {
    const request = this.buildCancelPaymentDunningRequest(id, input || {});
    return this.execute<PaymentDunningCancelResponseDto>(request);
  }

  /**
   * Cancela uma cobrança de inadimplência (versão assíncrona)
   */
  async cancelPaymentDunningAsync(id: string, input?: Record<string, any>): Promise<PaymentDunningCancelResponseDto> {
    return this.cancelPaymentDunning(id, input);
  }

  // Métodos privados para construção de requisições

  private buildListPaymentDunningsRequest(params?: ListPaymentDunningsParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/paymentDunnings");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("payment", params.payment)
        .setOptionalQueryParameter("requestStartDate", params.requestStartDate)
        .setOptionalQueryParameter("requestEndDate", params.requestEndDate);

      if (params.status) {
        builder.setOptionalQueryParameter("status", params.status);
      }
      if (params.type) {
        builder.setOptionalQueryParameter("type", params.type);
      }
    }

    return builder.build();
  }

  private buildCreateAPaymentDunningRequest(
    paymentDunningSaveRequestDto: PaymentDunningSaveRequestDto,
    filename: string
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";

    // Cria FormData para multipart/form-data
    const formData = new FormData();
    formData.append("payment", paymentDunningSaveRequestDto.payment);
    formData.append("type", paymentDunningSaveRequestDto.type);
    formData.append("description", paymentDunningSaveRequestDto.description || "");
    formData.append("customerName", paymentDunningSaveRequestDto.customerName);
    formData.append("customerCpfCnpj", paymentDunningSaveRequestDto.customerCpfCnpj);
    formData.append("customerPrimaryPhone", paymentDunningSaveRequestDto.customerPrimaryPhone);
    formData.append("customerPostalCode", paymentDunningSaveRequestDto.customerPostalCode);
    formData.append("customerAddress", paymentDunningSaveRequestDto.customerAddress);
    formData.append("customerAddressNumber", paymentDunningSaveRequestDto.customerAddressNumber);
    formData.append("customerProvince", paymentDunningSaveRequestDto.customerProvince);

    if (paymentDunningSaveRequestDto.customerSecondaryPhone) {
      formData.append("customerSecondaryPhone", paymentDunningSaveRequestDto.customerSecondaryPhone);
    }
    if (paymentDunningSaveRequestDto.customerComplement) {
      formData.append("customerComplement", paymentDunningSaveRequestDto.customerComplement);
    }
    if (paymentDunningSaveRequestDto.documents) {
      let fileBuffer: Buffer;
      if (Buffer.isBuffer(paymentDunningSaveRequestDto.documents)) {
        fileBuffer = paymentDunningSaveRequestDto.documents;
      } else if (paymentDunningSaveRequestDto.documents instanceof ArrayBuffer) {
        fileBuffer = Buffer.from(paymentDunningSaveRequestDto.documents);
      } else if (paymentDunningSaveRequestDto.documents instanceof Uint8Array) {
        fileBuffer = Buffer.from(paymentDunningSaveRequestDto.documents);
      } else {
        fileBuffer = Buffer.from(paymentDunningSaveRequestDto.documents as any);
      }
      formData.append("documents", fileBuffer, {
        filename: filename,
        contentType: "application/octet-stream",
      });
    }

    // Constrói a URL
    const url = `${baseUrl.replace(/\/$/, "")}/v3/paymentDunnings`;

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

  private buildSimulateAPaymentDunningRequest(params?: SimulateAPaymentDunningParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/paymentDunnings/simulate");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder.setOptionalQueryParameter("payment", params.payment);
      if (params.requestBody) {
        builder.setJsonContent(params.requestBody);
      }
    }

    return builder.build();
  }

  private buildRecoverASinglePaymentDunningRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/paymentDunnings/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildEventHistoryListsRequest(
    id: string,
    params?: EventHistoryListsParameters
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/paymentDunnings/{id}/history");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    builder.setPathParameter("id", id);

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit);
    }

    return builder.build();
  }

  private buildListPaymentsReceivedRequest(
    id: string,
    params?: ListPaymentsReceivedParameters
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/paymentDunnings/{id}/partialPayments");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    builder.setPathParameter("id", id);

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit);
    }

    return builder.build();
  }

  private buildListPaymentsAvailableForPaymentDunningRequest(
    params?: ListPaymentsAvailableForPaymentDunningParameters
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/paymentDunnings/paymentsAvailableForDunning");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit);
    }

    return builder.build();
  }

  private buildResendDocumentsRequest(
    id: string,
    paymentDunningSaveDocumentsRequestDto: PaymentDunningSaveDocumentsRequestDto,
    filename: string
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";

    // Cria FormData para multipart/form-data
    const formData = new FormData();
    let fileBuffer: Buffer;
    if (Buffer.isBuffer(paymentDunningSaveDocumentsRequestDto.documents)) {
      fileBuffer = paymentDunningSaveDocumentsRequestDto.documents;
    } else if (paymentDunningSaveDocumentsRequestDto.documents instanceof ArrayBuffer) {
      fileBuffer = Buffer.from(paymentDunningSaveDocumentsRequestDto.documents);
    } else if (paymentDunningSaveDocumentsRequestDto.documents instanceof Uint8Array) {
      fileBuffer = Buffer.from(paymentDunningSaveDocumentsRequestDto.documents);
    } else {
      fileBuffer = Buffer.from(paymentDunningSaveDocumentsRequestDto.documents as any);
    }
    formData.append("documents", fileBuffer, {
      filename: filename,
      contentType: "application/octet-stream",
    });

    // Constrói a URL
    const url = `${baseUrl.replace(/\/$/, "")}/v3/paymentDunnings/${encodeURIComponent(id)}/documents`;

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

  private buildCancelPaymentDunningRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/paymentDunnings/{id}/cancel");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }
}

