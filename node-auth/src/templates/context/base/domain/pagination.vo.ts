import { DomainException } from '../../error/domain/domain.error';

export class NaturalNumber {
  private value: number;
  constructor(value: number) {
    if (value < 0) throw new DomainException('Invalid natural number');
    this.value = value;
  }
  public get() {
    return this.value;
  }
}
