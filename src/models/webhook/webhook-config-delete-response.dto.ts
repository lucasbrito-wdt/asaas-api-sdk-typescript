/**
 * DTO de resposta para exclusão de configuração de webhook
 */
export interface WebhookConfigDeleteResponseDto {
  /** Indica se foi deletado com sucesso */
  deleted?: boolean | null;

  /** Informações adicionais */
  [key: string]: any;
}

