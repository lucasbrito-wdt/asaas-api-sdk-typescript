/**
 * DTO para criação de disputa de estorno
 */
export interface ChargebackSaveDisputeRequestDto {
  /** Arquivo(s) para a disputa (Buffer, ArrayBuffer ou Uint8Array) */
  files?: Buffer | ArrayBuffer | Uint8Array | null;

  /** Informações adicionais */
  [key: string]: any;
}

