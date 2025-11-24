/**
 * Parâmetros para simulação de cobrança de inadimplência
 */
export interface SimulateAPaymentDunningParameters {
  /** Identificador do pagamento */
  payment?: string | null;

  /** Corpo da requisição para simulação */
  requestBody?: any | null;
}

