import { Violation } from "../violation";

/**
 * Validador para campos do tipo string
 */
export class StringValidator {
  private violations: Violation[] = [];
  private isOptionalField: boolean = false;

  constructor(private readonly fieldName: string, private readonly value: string | null | undefined) {}

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

  notEmpty(): this {
    if (!this.isOptionalField && (this.value === null || this.value === undefined || this.value.trim() === "")) {
      this.violations.push(new Violation(this.fieldName, `${this.fieldName} cannot be empty.`));
    }
    return this;
  }

  maxLength(max: number): this {
    if (this.value !== null && this.value !== undefined && this.value.length > max) {
      this.violations.push(new Violation(this.fieldName, `${this.fieldName} exceeds maximum length of ${max}.`));
    }
    return this;
  }

  validate(): Violation[] {
    return this.violations;
  }
}

