/**
 * DTO para consulta de relatório de crédito
 */
export interface CreditBureauReportSaveRequestDto {
  /** CPF ou CNPJ */
  cpfCnpj: string;

  /** Informações adicionais */
  [key: string]: any;
}

