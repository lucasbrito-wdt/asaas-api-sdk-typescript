/**
 * Parâmetros para listagem de serviços municipais
 */
export interface ListMunicipalServicesParameters {
  /** Elemento inicial da lista */
  offset?: number | null;

  /** Número de elementos da lista (máx: 100) */
  limit?: number | null;
}

