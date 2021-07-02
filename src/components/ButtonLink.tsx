import Button, { ButtonProps } from "@material-ui/core/Button"
import Link, { LinkProps } from "./Link"
import { forwardRef } from "react"

/**
 * We need to Omit from the MUI Button the {href} prop
 * as we have to handle routing with Next.js Router
 * so we block the possibility to specify an href.
 */

export type ButtonLinkProps = Omit<ButtonProps, "href"> &
  Pick<LinkProps, "href" | "as" | "prefetch">

const ButtonLink = forwardRef<ButtonLinkProps, any>((props, ref) => (
  <Button
    component={Link}
    ref={ref}
    {...props}
    role={undefined} // remove role given to the button by material UI
  />
))

ButtonLink.displayName = "ButtonLink"

export default ButtonLink
