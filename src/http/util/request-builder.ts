import { AxiosRequestConfig } from "axios";
import { ApiKeyAuthConfig } from "../../config/api-key-auth-config";
import { HttpMethod, requiresRequestBody } from "../http-method";

/**
 * Builder para construção de requisições HTTP
 */
export class RequestBuilder {
  private pathParameters: Map<string, string> = new Map();
  private queryParameters: string[] = [];
  private headers: Map<string, string> = new Map();
  private body: any = null;

  constructor(
    private readonly httpMethod: HttpMethod,
    private readonly baseUrl: string,
    private readonly path: string
  ) {}

  /**
   * Define um parâmetro de path
   */
  setPathParameter(key: string, value: string | number): this {
    this.pathParameters.set(key, String(value));
    return this;
  }

  /**
   * Define um query parameter obrigatório
   */
  setQueryParameter(key: string, value: any): this {
    const serializedValue = this.serializeQueryValue(key, value);
    this.queryParameters.push(serializedValue);
    return this;
  }

  /**
   * Define um query parameter opcional (só adiciona se o valor não for null/undefined)
   */
  setOptionalQueryParameter(key: string, value: any): this {
    if (value !== null && value !== undefined) {
      this.setQueryParameter(key, value);
    }
    return this;
  }

  /**
   * Define um header
   */
  setHeader(key: string, value: string): this {
    this.headers.set(key, value);
    return this;
  }

  /**
   * Define um header opcional (só adiciona se o valor não for null/undefined)
   */
  setOptionalHeader(key: string, value: string | null | undefined): this {
    if (value !== null && value !== undefined) {
      this.setHeader(key, value);
    }
    return this;
  }

  /**
   * Define o conteúdo JSON do body
   */
  setJsonContent(content: any): this {
    this.body = content;
    return this;
  }

  /**
   * Configura autenticação por API Key
   */
  setApiKeyAuth(config: Partial<ApiKeyAuthConfig> | undefined): this {
    if (config?.apiKey) {
      this.setHeader(config.apiKeyHeader || "access_token", config.apiKey);
    }
    return this;
  }

  /**
   * Constrói a configuração da requisição Axios
   */
  build(): AxiosRequestConfig {
    const url = this.buildUrl();
    const config: AxiosRequestConfig = {
      method: this.httpMethod,
      url,
      headers: {},
    };

    // Adiciona headers
    this.headers.forEach((value, key) => {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers[key] = value;
    });

    // Adiciona body se necessário
    if (requiresRequestBody(this.httpMethod)) {
      if (this.body !== null) {
        config.data = this.body;
        if (!config.headers) {
          config.headers = {};
        }
        if (!config.headers["Content-Type"]) {
          config.headers["Content-Type"] = "application/json; charset=utf-8";
        }
      } else {
        // Body vazio para métodos que requerem body
        config.data = {};
      }
    }

    return config;
  }

  /**
   * Constrói a URL completa com path parameters e query parameters
   */
  private buildUrl(): string {
    let finalPath = this.path;

    // Substitui path parameters
    this.pathParameters.forEach((value, key) => {
      finalPath = finalPath.replace(`{${key}}`, encodeURIComponent(value));
    });

    // Remove barras duplicadas
    const baseUrl = this.baseUrl.endsWith("/") ? this.baseUrl.slice(0, -1) : this.baseUrl;
    const path = finalPath.startsWith("/") ? finalPath : `/${finalPath}`;
    let url = `${baseUrl}${path}`;

    // Adiciona query parameters
    if (this.queryParameters.length > 0) {
      url += `?${this.queryParameters.join("&")}`;
    }

    return url;
  }

  /**
   * Serializa um valor para query parameter
   */
  private serializeQueryValue(key: string, value: any): string {
    if (value === null || value === undefined) {
      return `${key}=null`;
    }

    if (Array.isArray(value)) {
      return value.map((v) => `${key}=${encodeURIComponent(String(v))}`).join("&");
    }

    if (typeof value === "object") {
      // Serializa objetos como JSON
      return `${key}=${encodeURIComponent(JSON.stringify(value))}`;
    }

    return `${key}=${encodeURIComponent(String(value))}`;
  }
}

