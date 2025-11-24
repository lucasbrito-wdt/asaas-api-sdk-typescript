/**
 * DTO para criação de transferência interna (entre contas Asaas)
 */
export interface TransferSaveInternalTransferRequestDto {
  /** Valor a ser transferido */
  value: number;

  /** WalletId da conta de destino */
  walletId: string;

  /** Identificador da transferência no seu sistema */
  externalReference?: string | null;
}

