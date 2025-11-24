import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListBillPaymentsParameters,
  BillSaveRequestDto,
  BillGetResponseDto,
  BillListResponseDto,
  BillSimulateRequestDto,
  BillSimulateResponseDto,
} from "../models/bill";

/**
 * Serviço para gerenciamento de contas a pagar
 */
export class BillService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista contas a pagar
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de contas
   * @throws {ApiError} Em caso de erro na API
   */
  async listBillPayments(params?: ListBillPaymentsParameters): Promise<BillListResponseDto> {
    const request = this.buildListBillPaymentsRequest(params);
    return this.execute<BillListResponseDto>(request);
  }

  /**
   * Lista contas a pagar (versão assíncrona)
   */
  async listBillPaymentsAsync(params?: ListBillPaymentsParameters): Promise<BillListResponseDto> {
    return this.listBillPayments(params);
  }

  /**
   * Cria uma conta a pagar
   *
   * @param billSaveRequestDto - Dados da conta
   * @returns Promise com conta criada
   * @throws {ApiError} Em caso de erro na API
   */
  async createABillPayment(billSaveRequestDto: BillSaveRequestDto): Promise<BillGetResponseDto> {
    const request = this.buildCreateABillPaymentRequest(billSaveRequestDto);
    return this.execute<BillGetResponseDto>(request);
  }

  /**
   * Cria uma conta a pagar (versão assíncrona)
   */
  async createABillPaymentAsync(billSaveRequestDto: BillSaveRequestDto): Promise<BillGetResponseDto> {
    return this.createABillPayment(billSaveRequestDto);
  }

  /**
   * Simula uma conta a pagar
   *
   * @param billSimulateRequestDto - Dados para simulação
   * @returns Promise com resultado da simulação
   * @throws {ApiError} Em caso de erro na API
   */
  async simulateABillPayment(billSimulateRequestDto: BillSimulateRequestDto): Promise<BillSimulateResponseDto> {
    const request = this.buildSimulateABillPaymentRequest(billSimulateRequestDto);
    return this.execute<BillSimulateResponseDto>(request);
  }

  /**
   * Simula uma conta a pagar (versão assíncrona)
   */
  async simulateABillPaymentAsync(billSimulateRequestDto: BillSimulateRequestDto): Promise<BillSimulateResponseDto> {
    return this.simulateABillPayment(billSimulateRequestDto);
  }

  /**
   * Obtém uma conta a pagar específica
   *
   * @param id - Identificador único da conta
   * @returns Promise com conta
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleBillPayment(id: string): Promise<BillGetResponseDto> {
    const request = this.buildRetrieveASingleBillPaymentRequest(id);
    return this.execute<BillGetResponseDto>(request);
  }

  /**
   * Obtém uma conta a pagar específica (versão assíncrona)
   */
  async retrieveASingleBillPaymentAsync(id: string): Promise<BillGetResponseDto> {
    return this.retrieveASingleBillPayment(id);
  }

  /**
   * Cancela uma conta a pagar
   *
   * @param id - Identificador único da conta
   * @param input - Dados do cancelamento (opcional)
   * @returns Promise com conta cancelada
   * @throws {ApiError} Em caso de erro na API
   */
  async cancelBillPayment(id: string, input?: Record<string, any>): Promise<BillGetResponseDto> {
    const request = this.buildCancelBillPaymentRequest(id, input || {});
    return this.execute<BillGetResponseDto>(request);
  }

  /**
   * Cancela uma conta a pagar (versão assíncrona)
   */
  async cancelBillPaymentAsync(id: string, input?: Record<string, any>): Promise<BillGetResponseDto> {
    return this.cancelBillPayment(id, input);
  }

  // Métodos privados para construção de requisições

  private buildListBillPaymentsRequest(params?: ListBillPaymentsParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/bill");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder.setOptionalQueryParameter("offset", params.offset).setOptionalQueryParameter("limit", params.limit);
    }

    return builder.build();
  }

  private buildCreateABillPaymentRequest(billSaveRequestDto: BillSaveRequestDto): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/bill");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(billSaveRequestDto).build();
  }

  private buildSimulateABillPaymentRequest(billSimulateRequestDto: BillSimulateRequestDto): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/bill/simulate");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(billSimulateRequestDto).build();
  }

  private buildRetrieveASingleBillPaymentRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/bill/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildCancelBillPaymentRequest(id: string, input: Record<string, any>): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/bill/{id}/cancel");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }
}

