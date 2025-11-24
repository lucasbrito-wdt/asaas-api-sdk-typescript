/**
 * Representa uma violação de validação
 */
export class Violation {
  constructor(public readonly path: string, public readonly message: string) {}

  toString(): string {
    return `${this.path}: ${this.message}`;
  }
}

