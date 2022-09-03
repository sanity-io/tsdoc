/** @public */
export interface BaseInterface {
  id: string
  foo: string
}

/** @public */
export interface TestInterface extends BaseInterface {
  bar: string
}

/** @public */
export interface OmittingInterface extends Omit<BaseInterface, 'id'> {}
