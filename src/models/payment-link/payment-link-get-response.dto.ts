/**
 * DTO de resposta para obtenção de link de pagamento
 */
export interface PaymentLinkGetResponseDto {
  /** Identificador único do link no Asaas */
  id?: string | null;

  /** Nome do link */
  name?: string | null;

  /** Valor do link */
  value?: number | null;

  /** Se o link está ativo */
  active?: boolean | null;

  /** Tipo de cobrança */
  chargeType?: string | null;

  /** URL de acesso do link */
  url?: string | null;

  /** Método de pagamento permitido */
  billingType?: string | null;

  /** Frequência de cobrança */
  subscriptionCycle?: string | null;

  /** Descrição */
  description?: string | null;

  /** Data de término */
  endDate?: string | null;

  /** Se foi removido */
  deleted?: boolean | null;

  /** Número de visualizações */
  viewCount?: number | null;

  /** Número máximo de parcelas */
  maxInstallmentCount?: number | null;

  /** Informações adicionais */
  [key: string]: any;
}

