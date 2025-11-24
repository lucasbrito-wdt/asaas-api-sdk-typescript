/**
 * DTO de resposta para exclusão de parcela
 */
export interface InstallmentDeleteResponseDto {
  /** Indica se foi deletado com sucesso */
  deleted?: boolean | null;

  /** Informações adicionais */
  [key: string]: any;
}

