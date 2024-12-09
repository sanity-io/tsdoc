import React from 'react'

/**
 * @public
 */
export interface ResponsiveMarginProps {
  margin?: number | number[]
}

/**
 * @public
 */
export type ButtonTone = 'positive' | 'caution' | 'critical'

/**
 * @public
 */
export type ButtonType = 'button' | 'submit' | 'reset'

/**
 * @public
 */
export interface ButtonProps extends ResponsiveMarginProps {
  tone?: ButtonTone
  type?: ButtonType
}

/**
 * @public
 *
 * A button component.
 *
 * @remarks
 * This component uses the `useButton` hook to handle button clicks and generate the `onClick` handler.
 *
 * @param props - Props to pass to the button element.
 */
export function Button(
  props: ButtonProps & Omit<React.HTMLProps<HTMLButtonElement>, 'type'>,
): React.ReactNode {
  const {children, margin = 0, tone, type = 'button', ...restProps} = props

  return (
    <button {...restProps} data-margin={JSON.stringify(margin)} data-tone={tone} type={type}>
      {children}
    </button>
  )
}
