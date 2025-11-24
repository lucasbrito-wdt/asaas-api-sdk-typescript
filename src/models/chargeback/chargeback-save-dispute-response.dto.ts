/**
 * DTO de resposta para criação de disputa de estorno
 */
export interface ChargebackSaveDisputeResponseDto {
  /** Identificador único da disputa */
  id?: string | null;

  /** Status da disputa */
  status?: string | null;

  /** Informações adicionais */
  [key: string]: any;
}

