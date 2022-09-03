/** @public */
export class TestClass<T = any> {
  private $private: boolean

  _type?: T

  constructor() {
    this.$private = true
    this._type = {} as any
  }

  toString(): string {
    return `${this.$private}`
  }
}
