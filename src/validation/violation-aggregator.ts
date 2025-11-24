import { ValidationException } from "./exceptions/validation-exception";
import { Violation } from "./violation";

/**
 * Agregador de violações de validação
 */
export class ViolationAggregator {
  private violations: Violation[] = [];

  add(violations: Violation[]): this {
    this.violations.push(...violations);
    return this;
  }

  aggregate(): Violation[] {
    return this.violations;
  }

  validateAll(): void {
    if (this.violations.length > 0) {
      throw new ValidationException(this.violations);
    }
  }
}

