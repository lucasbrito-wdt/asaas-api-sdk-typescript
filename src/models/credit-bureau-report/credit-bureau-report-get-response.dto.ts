/**
 * DTO de resposta para obtenção de relatório de crédito
 */
export interface CreditBureauReportGetResponseDto {
  /** Identificador único do relatório */
  id?: string | null;

  /** CPF ou CNPJ */
  cpfCnpj?: string | null;

  /** Status do relatório */
  status?: string | null;

  /** Dados do relatório */
  data?: any | null;

  /** Informações adicionais */
  [key: string]: any;
}

