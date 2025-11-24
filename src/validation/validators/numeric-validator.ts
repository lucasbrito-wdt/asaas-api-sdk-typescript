import { Violation } from "../violation";

/**
 * Validador para campos numéricos
 */
export class NumericValidator {
  private violations: Violation[] = [];
  private isOptionalField: boolean = false;

  constructor(private readonly fieldName: string, private readonly value: number | null | undefined) {}

  optional(): this {
    this.isOptionalField = true;
    return this;
  }

  notNull(): this {
    if (!this.isOptionalField && (this.value === null || this.value === undefined)) {
      this.violations.push(new Violation(this.fieldName, `${this.fieldName} cannot be null or undefined.`));
    }
    return this;
  }

  min(minValue: number): this {
    if (this.value !== null && this.value !== undefined && this.value < minValue) {
      this.violations.push(new Violation(this.fieldName, `${this.fieldName} must be at least ${minValue}.`));
    }
    return this;
  }

  max(maxValue: number): this {
    if (this.value !== null && this.value !== undefined && this.value > maxValue) {
      this.violations.push(new Violation(this.fieldName, `${this.fieldName} cannot exceed ${maxValue}.`));
    }
    return this;
  }

  validate(): Violation[] {
    return this.violations;
  }
}

