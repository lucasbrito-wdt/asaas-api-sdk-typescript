import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListPaymentsWithSummaryDataParameters,
  PaymentLeanGetResponseDto,
  PaymentLeanListResponseDto,
} from "../models/payment-lean";
import { PaymentSaveRequestDto } from "../models/payment";
import { PaymentDeleteResponseDto } from "../models/payment";

/**
 * Serviço para gerenciamento de pagamentos com dados resumidos
 */
export class PaymentWithSummaryDataService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista pagamentos com dados resumidos
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de pagamentos
   * @throws {ApiError} Em caso de erro na API
   */
  async listPaymentsWithSummaryData(params?: ListPaymentsWithSummaryDataParameters): Promise<PaymentLeanListResponseDto> {
    const request = this.buildListPaymentsWithSummaryDataRequest(params);
    return this.execute<PaymentLeanListResponseDto>(request);
  }

  /**
   * Lista pagamentos com dados resumidos (versão assíncrona)
   */
  async listPaymentsWithSummaryDataAsync(
    params?: ListPaymentsWithSummaryDataParameters
  ): Promise<PaymentLeanListResponseDto> {
    return this.listPaymentsWithSummaryData(params);
  }

  /**
   * Cria um novo pagamento com dados resumidos na resposta
   *
   * @param paymentSaveRequestDto - Dados do pagamento a ser criado
   * @returns Promise com o pagamento criado
   * @throws {ApiError} Em caso de erro na API
   */
  async createNewPaymentWithSummaryDataInResponse(
    paymentSaveRequestDto: PaymentSaveRequestDto
  ): Promise<PaymentLeanGetResponseDto> {
    const request = this.buildCreateNewPaymentWithSummaryDataInResponseRequest(paymentSaveRequestDto);
    return this.execute<PaymentLeanGetResponseDto>(request);
  }

  /**
   * Cria um novo pagamento com dados resumidos (versão assíncrona)
   */
  async createNewPaymentWithSummaryDataInResponseAsync(
    paymentSaveRequestDto: PaymentSaveRequestDto
  ): Promise<PaymentLeanGetResponseDto> {
    return this.createNewPaymentWithSummaryDataInResponse(paymentSaveRequestDto);
  }

  /**
   * Obtém um pagamento específico com dados resumidos
   *
   * @param id - Identificador único do pagamento
   * @returns Promise com os dados do pagamento
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASinglePaymentWithSummaryData(id: string): Promise<PaymentLeanGetResponseDto> {
    const request = this.buildRetrieveASinglePaymentWithSummaryDataRequest(id);
    return this.execute<PaymentLeanGetResponseDto>(request);
  }

  /**
   * Obtém um pagamento específico com dados resumidos (versão assíncrona)
   */
  async retrieveASinglePaymentWithSummaryDataAsync(id: string): Promise<PaymentLeanGetResponseDto> {
    return this.retrieveASinglePaymentWithSummaryData(id);
  }

  /**
   * Atualiza um pagamento existente com dados resumidos na resposta
   *
   * @param id - Identificador único do pagamento
   * @param input - Dados de atualização
   * @returns Promise com o pagamento atualizado
   * @throws {ApiError} Em caso de erro na API
   */
  async updateExistingPaymentWithSummaryDataInResponse(
    id: string,
    input: Record<string, any>
  ): Promise<PaymentLeanGetResponseDto> {
    const request = this.buildUpdateExistingPaymentWithSummaryDataInResponseRequest(id, input);
    return this.execute<PaymentLeanGetResponseDto>(request);
  }

  /**
   * Atualiza um pagamento existente com dados resumidos (versão assíncrona)
   */
  async updateExistingPaymentWithSummaryDataInResponseAsync(
    id: string,
    input: Record<string, any>
  ): Promise<PaymentLeanGetResponseDto> {
    return this.updateExistingPaymentWithSummaryDataInResponse(id, input);
  }

  /**
   * Remove um pagamento com dados resumidos
   *
   * @param id - Identificador único do pagamento
   * @returns Promise com resposta de confirmação
   * @throws {ApiError} Em caso de erro na API
   */
  async deletePaymentWithSummaryData(id: string): Promise<PaymentDeleteResponseDto> {
    const request = this.buildDeletePaymentWithSummaryDataRequest(id);
    return this.execute<PaymentDeleteResponseDto>(request);
  }

  /**
   * Remove um pagamento com dados resumidos (versão assíncrona)
   */
  async deletePaymentWithSummaryDataAsync(id: string): Promise<PaymentDeleteResponseDto> {
    return this.deletePaymentWithSummaryData(id);
  }

  // Métodos privados para construção de requisições

  private buildListPaymentsWithSummaryDataRequest(
    params?: ListPaymentsWithSummaryDataParameters
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/lean/payments");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("customer", params.customer)
        .setOptionalQueryParameter("customerGroupName", params.customerGroupName)
        .setOptionalQueryParameter("subscription", params.subscription)
        .setOptionalQueryParameter("installment", params.installment)
        .setOptionalQueryParameter("externalReference", params.externalReference)
        .setOptionalQueryParameter("paymentDate", params.paymentDate)
        .setOptionalQueryParameter("estimatedCreditDate", params.estimatedCreditDate)
        .setOptionalQueryParameter("pixQrCodeId", params.pixQrCodeId)
        .setOptionalQueryParameter("anticipated", params.anticipated)
        .setOptionalQueryParameter("anticipable", params.anticipable)
        .setOptionalQueryParameter("dateCreated[ge]", params.dateCreatedGe)
        .setOptionalQueryParameter("dateCreated[le]", params.dateCreatedLe)
        .setOptionalQueryParameter("paymentDate[ge]", params.paymentDateGe)
        .setOptionalQueryParameter("paymentDate[le]", params.paymentDateLe)
        .setOptionalQueryParameter("estimatedCreditDate[ge]", params.estimatedCreditDateGe)
        .setOptionalQueryParameter("estimatedCreditDate[le]", params.estimatedCreditDateLe)
        .setOptionalQueryParameter("dueDate[ge]", params.dueDateGe)
        .setOptionalQueryParameter("dueDate[le]", params.dueDateLe)
        .setOptionalQueryParameter("user", params.user);

      if (params.billingType) {
        builder.setOptionalQueryParameter("billingType", params.billingType);
      }
      if (params.status) {
        builder.setOptionalQueryParameter("status", params.status);
      }
      if (params.invoiceStatus) {
        builder.setOptionalQueryParameter("invoiceStatus", params.invoiceStatus);
      }
    }

    return builder.build();
  }

  private buildCreateNewPaymentWithSummaryDataInResponseRequest(
    paymentSaveRequestDto: PaymentSaveRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/lean/payments");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(paymentSaveRequestDto).build();
  }

  private buildRetrieveASinglePaymentWithSummaryDataRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/lean/payments/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildUpdateExistingPaymentWithSummaryDataInResponseRequest(
    id: string,
    input: Record<string, any>
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.PUT, baseUrl, "v3/lean/payments/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(input).build();
  }

  private buildDeletePaymentWithSummaryDataRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.DELETE, baseUrl, "v3/lean/payments/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }
}

