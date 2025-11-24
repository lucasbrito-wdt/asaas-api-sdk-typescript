import { PaymentDocumentType } from "./payment-document-save-request.dto";

/**
 * DTO para atualização de documento de pagamento
 */
export interface PaymentDocumentUpdateRequestDto {
  /** true para disponibilizar o arquivo apenas após recebimento do pagamento */
  availableAfterPayment: boolean;

  /** Tipo do documento */
  type: PaymentDocumentType;
}

