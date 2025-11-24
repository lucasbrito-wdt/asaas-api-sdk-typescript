import { Violation } from "../violation";

/**
 * Exceção lançada quando há violações de validação
 */
export class ValidationException extends Error {
  public readonly violations: Violation[];

  constructor(violations: Violation[]) {
    super("Validation failed with the following violations: " + ValidationException.buildViolationsString(violations));
    this.name = "ValidationException";
    this.violations = violations;
    Object.setPrototypeOf(this, ValidationException.prototype);
  }

  private static buildViolationsString(violations: Violation[]): string {
    return violations.map((v) => v.toString()).join("\n");
  }
}

