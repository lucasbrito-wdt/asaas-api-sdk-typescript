import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListPaymentsParameters,
  PaymentSaveRequestDto,
  PaymentGetResponseDto,
  PaymentListResponseDto,
  PaymentUpdateRequestDto,
  PaymentDeleteResponseDto,
} from "../models/payment";

/**
 * Serviço para gerenciamento de pagamentos
 */
export class PaymentService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista pagamentos
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de pagamentos
   * @throws {ApiError} Em caso de erro na API
   */
  async listPayments(params?: ListPaymentsParameters): Promise<PaymentListResponseDto> {
    const request = this.buildListPaymentsRequest(params);
    return this.execute<PaymentListResponseDto>(request);
  }

  /**
   * Lista pagamentos (versão assíncrona)
   */
  async listPaymentsAsync(params?: ListPaymentsParameters): Promise<PaymentListResponseDto> {
    return this.listPayments(params);
  }

  /**
   * Cria um novo pagamento
   *
   * @param paymentSaveRequestDto - Dados do pagamento a ser criado
   * @returns Promise com o pagamento criado
   * @throws {ApiError} Em caso de erro na API
   */
  async createNewPayment(paymentSaveRequestDto: PaymentSaveRequestDto): Promise<PaymentGetResponseDto> {
    const request = this.buildCreateNewPaymentRequest(paymentSaveRequestDto);
    return this.execute<PaymentGetResponseDto>(request);
  }

  /**
   * Cria um novo pagamento (versão assíncrona)
   */
  async createNewPaymentAsync(paymentSaveRequestDto: PaymentSaveRequestDto): Promise<PaymentGetResponseDto> {
    return this.createNewPayment(paymentSaveRequestDto);
  }

  /**
   * Obtém um pagamento específico
   *
   * @param id - Identificador único do pagamento
   * @returns Promise com os dados do pagamento
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASinglePayment(id: string): Promise<PaymentGetResponseDto> {
    const request = this.buildRetrieveASinglePaymentRequest(id);
    return this.execute<PaymentGetResponseDto>(request);
  }

  /**
   * Obtém um pagamento específico (versão assíncrona)
   */
  async retrieveASinglePaymentAsync(id: string): Promise<PaymentGetResponseDto> {
    return this.retrieveASinglePayment(id);
  }

  /**
   * Atualiza um pagamento existente
   *
   * @param id - Identificador único do pagamento
   * @param paymentUpdateRequestDto - Dados de atualização
   * @returns Promise com o pagamento atualizado
   * @throws {ApiError} Em caso de erro na API
   */
  async updateExistingPayment(
    id: string,
    paymentUpdateRequestDto: PaymentUpdateRequestDto
  ): Promise<PaymentGetResponseDto> {
    const request = this.buildUpdateExistingPaymentRequest(id, paymentUpdateRequestDto);
    return this.execute<PaymentGetResponseDto>(request);
  }

  /**
   * Atualiza um pagamento existente (versão assíncrona)
   */
  async updateExistingPaymentAsync(
    id: string,
    paymentUpdateRequestDto: PaymentUpdateRequestDto
  ): Promise<PaymentGetResponseDto> {
    return this.updateExistingPayment(id, paymentUpdateRequestDto);
  }

  /**
   * Remove um pagamento
   *
   * @param id - Identificador único do pagamento
   * @returns Promise com resposta de confirmação
   * @throws {ApiError} Em caso de erro na API
   */
  async removePayment(id: string): Promise<PaymentDeleteResponseDto> {
    const request = this.buildRemovePaymentRequest(id);
    return this.execute<PaymentDeleteResponseDto>(request);
  }

  /**
   * Remove um pagamento (versão assíncrona)
   */
  async removePaymentAsync(id: string): Promise<PaymentDeleteResponseDto> {
    return this.removePayment(id);
  }

  // Métodos privados para construção de requisições

  private buildListPaymentsRequest(params?: ListPaymentsParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/payments");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("installment", params.installment)
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("customer", params.customer)
        .setOptionalQueryParameter("customerGroupName", params.customerGroupName)
        .setOptionalQueryParameter("subscription", params.subscription)
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

  private buildCreateNewPaymentRequest(paymentSaveRequestDto: PaymentSaveRequestDto): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/payments");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(paymentSaveRequestDto).build();
  }

  private buildRetrieveASinglePaymentRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/payments/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildUpdateExistingPaymentRequest(
    id: string,
    paymentUpdateRequestDto: PaymentUpdateRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.PUT, baseUrl, "v3/payments/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(paymentUpdateRequestDto).build();
  }

  private buildRemovePaymentRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.DELETE, baseUrl, "v3/payments/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }
}

