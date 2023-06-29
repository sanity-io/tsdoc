/** @public */
export class TestClass<T = any> {
  private $private: boolean

  /**
   * @internal
   */
  _type?: T

  /**
   * public type
   */
  publicType?: T

  constructor() {
    this.$private = true
    this._type = {} as any
    this.publicType = {} as any
  }

  /** Set Component ID
   * @param id - component ID
   * @param shouldShow - should show the id
   * @returns component builder based on ID provided
   */
  toString(id: string, shouldShow?: boolean): string {
    return `${shouldShow ? id : ''} ${this.$private}`
  }

  /**
   * @param id - string
   * @returns id as number or number 0
   */
  toNumber(id: string): number {
    return isNaN(Number(id)) ? 0 : Number(id)
  }
}
