/**
 * DTO para criação/atualização de informações fiscais
 */
export interface FiscalInfoSaveRequestDto {
  /** Arquivo (Buffer, ArrayBuffer ou Uint8Array) */
  file?: Buffer | ArrayBuffer | Uint8Array | null;

  /** Informações adicionais */
  [key: string]: any;
}

