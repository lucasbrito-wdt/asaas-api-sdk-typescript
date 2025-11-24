/**
 * DTO de resposta para exclusão de documento da conta
 */
export interface AccountDocumentDeleteResponseDto {
  /** Indica se foi deletado com sucesso */
  deleted?: boolean | null;

  /** Informações adicionais */
  [key: string]: any;
}

