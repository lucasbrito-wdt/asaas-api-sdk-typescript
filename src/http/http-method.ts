/**
 * Métodos HTTP suportados
 */
export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS",
  TRACE = "TRACE",
  CONNECT = "CONNECT",
}

/**
 * Verifica se um método HTTP requer corpo na requisição
 */
export function requiresRequestBody(method: HttpMethod): boolean {
  return method === HttpMethod.POST || method === HttpMethod.PUT || method === HttpMethod.PATCH;
}

