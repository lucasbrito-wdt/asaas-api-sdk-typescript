import { Violation } from "../violation";

/**
 * Validador para campos do tipo lista/array
 */
export class ListValidator<T> {
  private violations: Violation[] = [];
  private isOptionalField: boolean = false;

  constructor(private readonly fieldName: string, private readonly value: T[] | null | undefined) {}

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
    if (!this.isOptionalField && (this.value === null || this.value === undefined || this.value.length === 0)) {
      this.violations.push(new Violation(this.fieldName, `${this.fieldName} cannot be empty.`));
    }
    return this;
  }

  maxSize(max: number): this {
    if (this.value !== null && this.value !== undefined && this.value.length > max) {
      this.violations.push(new Violation(this.fieldName, `${this.fieldName} cannot contain more than ${max} elements.`));
    }
    return this;
  }

  validate(): Violation[] {
    return this.violations;
  }
}

