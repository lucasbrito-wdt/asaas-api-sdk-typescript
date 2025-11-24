/**
 * DTO de resposta para exclusão de cliente
 */
export interface CustomerDeleteResponseDto {
  /** Indica se foi deletado */
  deleted?: boolean | null;

  /** Identificador único do cliente */
  id?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

