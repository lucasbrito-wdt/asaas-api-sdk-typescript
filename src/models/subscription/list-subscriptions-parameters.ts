/**
 * Parâmetros para listagem de assinaturas
 */
export interface ListSubscriptionsParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;

  /** Filtro por identificador único do cliente */
  customer?: string | null;

  /** Filtro por nome do grupo de clientes */
  customerGroupName?: string | null;

  /** Filtro por tipo de cobrança */
  billingType?: string | null;

  /** Filtro por status */
  status?: string | null;

  /** Enviar true para retornar apenas assinaturas removidas */
  deletedOnly?: string | null;

  /** Enviar true para também recuperar assinaturas removidas */
  includeDeleted?: string | null;

  /** Filtro por identificador do seu sistema */
  externalReference?: string | null;

  /** Ordem ascendente ou descendente */
  order?: string | null;

  /** Campo pelo qual será ordenado */
  sort?: string | null;
}

