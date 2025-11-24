import { AxiosInstance, AxiosRequestConfig } from "axios";
import FormData from "form-data";
import { AsaasSdkConfig } from "../config/asaas-sdk-config";
import { ErrorResponseDtoClass } from "../models/error-response.dto";
import { ErrorResponseDtoException } from "../exceptions/error-response-dto-exception";
import { HttpMethod } from "../http/http-method";
import { RequestBuilder } from "../http/util/request-builder";
import { BaseService } from "./base-service";
import {
  ListChargebacksParameters,
  ChargebackSaveDisputeRequestDto,
  ChargebackSaveDisputeResponseDto,
  ChargebackListResponseDto,
} from "../models/chargeback";
import { PaymentChargebackResponseDto } from "../models/payment/payment-chargeback-response.dto";

/**
 * Serviço para gerenciamento de estornos (chargebacks)
 */
export class ChargebackService extends BaseService {
  constructor(httpClient: AxiosInstance, config: AsaasSdkConfig) {
    super(httpClient, config);
    this.addErrorMapping(400, ErrorResponseDtoClass, ErrorResponseDtoException);
  }

  /**
   * Cria uma disputa de estorno
   *
   * @param id - Identificador único do estorno
   * @param chargebackSaveDisputeRequestDto - Dados da disputa
   * @param filename - Nome do arquivo
   * @returns Promise com disputa criada
   * @throws {ApiError} Em caso de erro na API
   */
  async createAChargebackDispute(
    id: string,
    chargebackSaveDisputeRequestDto: ChargebackSaveDisputeRequestDto,
    filename: string
  ): Promise<ChargebackSaveDisputeResponseDto> {
    const request = this.buildCreateAChargebackDisputeRequest(id, chargebackSaveDisputeRequestDto, filename);
    return this.execute<ChargebackSaveDisputeResponseDto>(request);
  }

  /**
   * Cria uma disputa de estorno (versão assíncrona)
   */
  async createAChargebackDisputeAsync(
    id: string,
    chargebackSaveDisputeRequestDto: ChargebackSaveDisputeRequestDto,
    filename: string
  ): Promise<ChargebackSaveDisputeResponseDto> {
    return this.createAChargebackDispute(id, chargebackSaveDisputeRequestDto, filename);
  }

  /**
   * Lista estornos
   *
   * @param params - Parâmetros de filtro (opcional)
   * @returns Promise com lista de estornos
   * @throws {ApiError} Em caso de erro na API
   */
  async listChargebacks(params?: ListChargebacksParameters): Promise<ChargebackListResponseDto> {
    const request = this.buildListChargebacksRequest(params);
    return this.execute<ChargebackListResponseDto>(request);
  }

  /**
   * Lista estornos (versão assíncrona)
   */
  async listChargebacksAsync(params?: ListChargebacksParameters): Promise<ChargebackListResponseDto> {
    return this.listChargebacks(params);
  }

  /**
   * Obtém um estorno específico
   *
   * @param id - Identificador único do pagamento ou parcela
   * @returns Promise com estorno
   * @throws {ApiError} Em caso de erro na API
   */
  async retrieveASingleChargeback(id: string): Promise<PaymentChargebackResponseDto> {
    const request = this.buildRetrieveASingleChargebackRequest(id);
    return this.execute<PaymentChargebackResponseDto>(request);
  }

  /**
   * Obtém um estorno específico (versão assíncrona)
   */
  async retrieveASingleChargebackAsync(id: string): Promise<PaymentChargebackResponseDto> {
    return this.retrieveASingleChargeback(id);
  }

  // Métodos privados para construção de requisições

  private buildCreateAChargebackDisputeRequest(
    id: string,
    chargebackSaveDisputeRequestDto: ChargebackSaveDisputeRequestDto,
    filename: string
  ): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";

    const formData = new FormData();
    if (chargebackSaveDisputeRequestDto.files) {
      let fileBuffer: Buffer;
      if (Buffer.isBuffer(chargebackSaveDisputeRequestDto.files)) {
        fileBuffer = chargebackSaveDisputeRequestDto.files;
      } else if (chargebackSaveDisputeRequestDto.files instanceof ArrayBuffer) {
        fileBuffer = Buffer.from(chargebackSaveDisputeRequestDto.files);
      } else if (chargebackSaveDisputeRequestDto.files instanceof Uint8Array) {
        fileBuffer = Buffer.from(chargebackSaveDisputeRequestDto.files);
      } else {
        fileBuffer = Buffer.from(chargebackSaveDisputeRequestDto.files as any);
      }
      formData.append("files", fileBuffer, {
        filename: filename,
        contentType: "application/octet-stream",
      });
    }

    const url = `${baseUrl.replace(/\/$/, "")}/v3/chargebacks/${encodeURIComponent(id)}/dispute`;

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

  private buildListChargebacksRequest(params?: ListChargebacksParameters): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/chargebacks/");
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

  private buildRetrieveASingleChargebackRequest(id: string): AxiosRequestConfig {
    const baseUrl = this.config.baseUrl || "https://api.asaas.com/";
    const builder = new RequestBuilder(HttpMethod.GET, baseUrl, "v3/payments/{id}/chargeback");
    if (this.config.apiKeyAuthConfig) {
      builder.setApiKeyAuth(this.config.apiKeyAuthConfig);
    }
    return builder.setPathParameter("id", id).build();
  }
}

