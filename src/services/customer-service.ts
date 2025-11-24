import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListCustomersParameters,
  CustomerSaveRequestDto,
  CustomerGetResponseDto,
  CustomerListResponseDto,
  CustomerUpdateRequestDto,
  CustomerDeleteResponseDto,
} from "../models/customer";

/**
 * Serviço para gerenciamento de clientes
 */
export class CustomerService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista clientes
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de clientes
   * @throws {ApiError} Em caso de erro na API
   */
  async listCustomers(params?: ListCustomersParameters): Promise<CustomerListResponseDto> {
    const request = this.buildListCustomersRequest(params);
    return this.execute<CustomerListResponseDto>(request);
  }

  /**
   * Lista clientes (versão assíncrona)
   */
  async listCustomersAsync(params?: ListCustomersParameters): Promise<CustomerListResponseDto> {
    return this.listCustomers(params);
  }

  /**
   * Cria um novo cliente
   *
   * @param customerSaveRequestDto - Dados do cliente a ser criado
   * @returns Promise com o cliente criado
   * @throws {ApiError} Em caso de erro na API
   */
  async createNewCustomer(customerSaveRequestDto: CustomerSaveRequestDto): Promise<CustomerGetResponseDto> {
    const request = this.buildCreateNewCustomerRequest(customerSaveRequestDto);
    return this.execute<CustomerGetResponseDto>(request);
  }

  /**
   * Cria um novo cliente (versão assíncrona)
   */
  async createNewCustomerAsync(customerSaveRequestDto: CustomerSaveRequestDto): Promise<CustomerGetResponseDto> {
    return this.createNewCustomer(customerSaveRequestDto);
  }

  /**
   * Obtém um cliente específico
   *
   * @param id - Identificador único do cliente
   * @returns Promise com os dados do cliente
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleCustomer(id: string): Promise<CustomerGetResponseDto> {
    const request = this.buildRetrieveASingleCustomerRequest(id);
    return this.execute<CustomerGetResponseDto>(request);
  }

  /**
   * Obtém um cliente específico (versão assíncrona)
   */
  async retrieveASingleCustomerAsync(id: string): Promise<CustomerGetResponseDto> {
    return this.retrieveASingleCustomer(id);
  }

  /**
   * Atualiza um cliente existente
   *
   * @param id - Identificador único do cliente
   * @param customerUpdateRequestDto - Dados de atualização
   * @returns Promise com o cliente atualizado
   * @throws {ApiError} Em caso de erro na API
   */
  async updateExistingCustomer(
    id: string,
    customerUpdateRequestDto: CustomerUpdateRequestDto
  ): Promise<CustomerGetResponseDto> {
    const request = this.buildUpdateExistingCustomerRequest(id, customerUpdateRequestDto);
    return this.execute<CustomerGetResponseDto>(request);
  }

  /**
   * Atualiza um cliente existente (versão assíncrona)
   */
  async updateExistingCustomerAsync(
    id: string,
    customerUpdateRequestDto: CustomerUpdateRequestDto
  ): Promise<CustomerGetResponseDto> {
    return this.updateExistingCustomer(id, customerUpdateRequestDto);
  }

  /**
   * Remove um cliente
   *
   * @param id - Identificador único do cliente
   * @returns Promise com resposta de confirmação
   * @throws {ApiError} Em caso de erro na API
   */
  async removeCustomer(id: string): Promise<CustomerDeleteResponseDto> {
    const request = this.buildRemoveCustomerRequest(id);
    return this.execute<CustomerDeleteResponseDto>(request);
  }

  /**
   * Remove um cliente (versão assíncrona)
   */
  async removeCustomerAsync(id: string): Promise<CustomerDeleteResponseDto> {
    return this.removeCustomer(id);
  }

  /**
   * Restaura um cliente removido
   *
   * @param id - Identificador único do cliente
   * @returns Promise com o cliente restaurado
   * @throws {ApiError} Em caso de erro na API
   */
  async restoreCustomer(id: string): Promise<CustomerGetResponseDto> {
    const request = this.buildRestoreCustomerRequest(id);
    return this.execute<CustomerGetResponseDto>(request);
  }

  /**
   * Restaura um cliente removido (versão assíncrona)
   */
  async restoreCustomerAsync(id: string): Promise<CustomerGetResponseDto> {
    return this.restoreCustomer(id);
  }

  // Métodos privados para construção de requisições

  private buildListCustomersRequest(params?: ListCustomersParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/customers");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("offset", params.offset)
        .setOptionalQueryParameter("limit", params.limit)
        .setOptionalQueryParameter("name", params.name)
        .setOptionalQueryParameter("email", params.email)
        .setOptionalQueryParameter("cpfCnpj", params.cpfCnpj)
        .setOptionalQueryParameter("groupName", params.groupName)
        .setOptionalQueryParameter("externalReference", params.externalReference);
    }

    return builder.build();
  }

  private buildCreateNewCustomerRequest(customerSaveRequestDto: CustomerSaveRequestDto): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/customers");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(customerSaveRequestDto).build();
  }

  private buildRetrieveASingleCustomerRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/customers/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildUpdateExistingCustomerRequest(
    id: string,
    customerUpdateRequestDto: CustomerUpdateRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.PUT, baseUrl, "v3/customers/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).setJsonContent(customerUpdateRequestDto).build();
  }

  private buildRemoveCustomerRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.DELETE, baseUrl, "v3/customers/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildRestoreCustomerRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/customers/{id}/restore");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }
}

