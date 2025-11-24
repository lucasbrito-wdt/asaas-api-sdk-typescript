import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListTransfersParameters,
  TransferSaveRequestDto,
  TransferGetResponseDto,
  TransferListResponseDto,
  TransferSaveInternalTransferRequestDto,
  TransferSaveInternalTransferResponseDto,
} from "../models/transfer";

/**
 * Serviço para gerenciamento de transferências
 */
export class TransferService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    // Mapeia erros 400 para ErrorResponseDtoException
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Lista transferências
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de transferências
   * @throws {ApiError} Em caso de erro na API
   */
  async listTransfers(params?: ListTransfersParameters): Promise<TransferListResponseDto> {
    const request = this.buildListTransfersRequest(params);
    return this.execute<TransferListResponseDto>(request);
  }

  /**
   * Lista transferências (versão assíncrona)
   */
  async listTransfersAsync(params?: ListTransfersParameters): Promise<TransferListResponseDto> {
    return this.listTransfers(params);
  }

  /**
   * Transfere para conta de outra instituição ou chave PIX
   *
   * @param transferSaveRequestDto - Dados da transferência
   * @returns Promise com a transferência criada
   * @throws {ApiError} Em caso de erro na API
   */
  async transferToAnotherInstitutionAccountOrPixKey(
    transferSaveRequestDto: TransferSaveRequestDto
  ): Promise<TransferGetResponseDto> {
    const request = this.buildTransferToAnotherInstitutionAccountOrPixKeyRequest(transferSaveRequestDto);
    return this.execute<TransferGetResponseDto>(request);
  }

  /**
   * Transfere para conta de outra instituição ou chave PIX (versão assíncrona)
   */
  async transferToAnotherInstitutionAccountOrPixKeyAsync(
    transferSaveRequestDto: TransferSaveRequestDto
  ): Promise<TransferGetResponseDto> {
    return this.transferToAnotherInstitutionAccountOrPixKey(transferSaveRequestDto);
  }

  /**
   * Transfere entre contas Asaas
   *
   * @param transferSaveInternalTransferRequestDto - Dados da transferência interna
   * @returns Promise com a transferência criada
   * @throws {ApiError} Em caso de erro na API
   */
  async transferBetweenAsaasAccounts(
    transferSaveInternalTransferRequestDto: TransferSaveInternalTransferRequestDto
  ): Promise<TransferSaveInternalTransferResponseDto> {
    const request = this.buildTransferBetweenAsaasAccountsRequest(transferSaveInternalTransferRequestDto);
    return this.execute<TransferSaveInternalTransferResponseDto>(request);
  }

  /**
   * Transfere entre contas Asaas (versão assíncrona)
   */
  async transferBetweenAsaasAccountsAsync(
    transferSaveInternalTransferRequestDto: TransferSaveInternalTransferRequestDto
  ): Promise<TransferSaveInternalTransferResponseDto> {
    return this.transferBetweenAsaasAccounts(transferSaveInternalTransferRequestDto);
  }

  /**
   * Obtém uma transferência específica
   *
   * @param id - Identificador único da transferência
   * @returns Promise com os dados da transferência
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleTransfer(id: string): Promise<TransferGetResponseDto> {
    const request = this.buildRetrieveASingleTransferRequest(id);
    return this.execute<TransferGetResponseDto>(request);
  }

  /**
   * Obtém uma transferência específica (versão assíncrona)
   */
  async retrieveASingleTransferAsync(id: string): Promise<TransferGetResponseDto> {
    return this.retrieveASingleTransfer(id);
  }

  /**
   * Cancela uma transferência
   *
   * @param id - Identificador único da transferência
   * @returns Promise com a transferência cancelada
   * @throws {ApiError} Em caso de erro na API
   */
  async cancelATransfer(id: string): Promise<TransferGetResponseDto> {
    const request = this.buildCancelATransferRequest(id);
    return this.execute<TransferGetResponseDto>(request);
  }

  /**
   * Cancela uma transferência (versão assíncrona)
   */
  async cancelATransferAsync(id: string): Promise<TransferGetResponseDto> {
    return this.cancelATransfer(id);
  }

  // Métodos privados para construção de requisições

  private buildListTransfersRequest(params?: ListTransfersParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/transfers");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }

    if (params) {
      builder
        .setOptionalQueryParameter("dateCreatedLe[ge]", params.dateCreatedLeGe)
        .setOptionalQueryParameter("dateCreatedLe[le]", params.dateCreatedLeLe)
        .setOptionalQueryParameter("transferDate[ge]", params.transferDateGe)
        .setOptionalQueryParameter("transferDate[le]", params.transferDateLe)
        .setOptionalQueryParameter("type", params.type);
    }

    return builder.build();
  }

  private buildTransferToAnotherInstitutionAccountOrPixKeyRequest(
    transferSaveRequestDto: TransferSaveRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/transfers");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(transferSaveRequestDto).build();
  }

  private buildTransferBetweenAsaasAccountsRequest(
    transferSaveInternalTransferRequestDto: TransferSaveInternalTransferRequestDto
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.POST, baseUrl, "v3/transfers/internal");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setJsonContent(transferSaveInternalTransferRequestDto).build();
  }

  private buildRetrieveASingleTransferRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/transfers/{id}");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }

  private buildCancelATransferRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.DELETE, baseUrl, "v3/transfers/{id}/cancel");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }
}

