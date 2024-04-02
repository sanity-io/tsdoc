import React, {forwardRef} from 'react'

/**
 * Props for the ForwardingRefComponent.
 *
 * @public
 */
export interface LinkProps {
  /**
   * The name to display in the component.
   */
  name: string
}

/**
 * A component that creates an HTML anchor element.
 *
 * @public
 *
 * @param props - Props to pass to the anchor element.
 * @param ref - A ref to the anchor element.
 * @returns The created anchor element.
 *
 * @remarks
 * This component uses the `useLink` hook to handle link clicks and generate the `onClick` handler.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   return (
 *    <Link href="https://www.sanity.io" target="_blank" replace>
 *      Go to Sanity
 *    </Link>
 *   )
 * }
 * ```
 */
export const Link = forwardRef(function Link(
  props: LinkProps & React.HTMLProps<HTMLAnchorElement>,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  const {onClick, href, target, ...restProps} = props

  return <a {...restProps} onClick={onClick} href={href} target={target} ref={ref} />
})
