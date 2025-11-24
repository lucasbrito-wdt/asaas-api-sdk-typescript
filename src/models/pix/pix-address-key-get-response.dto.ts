/**
 * DTO de resposta para obtenção de chave PIX
 */
export interface PixAddressKeyGetResponseDto {
  /** Identificador único da chave PIX */
  id?: string;

  /** Tipo de chave PIX */
  type?: string;

  /** Valor da chave PIX */
  key?: string;

  /** Status da chave */
  status?: string;

  /** Data de criação */
  dateCreated?: string;

  /** Informações adicionais */
  [key: string]: any;
}

