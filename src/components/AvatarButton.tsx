import { useState } from "react"
import dynamic from "next/dynamic"
import IconButton from "@material-ui/core/IconButton"
import Avatar from "@material-ui/core/Avatar"
import Link from "./Link"
import useScreenSize from "@/hooks/usScreenSize"
import useUser from "@/hooks/useUser"

const AccountPopup = dynamic(() => import("./Header/AccountPopup"))

const AvatarButton: React.FC<{ className?: string }> = ({
  className = undefined
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement>(null)
  const mobile = useScreenSize()
  const { user } = useUser()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      {user?.isLoggedIn ? (
        <IconButton
          aria-label="open menu"
          className={className}
          onClick={handleClick}
        >
          <Avatar />
        </IconButton>
      ) : (
        <IconButton
          aria-label="sign up"
          component={Link}
          href={mobile ? "/register" : "#register"}
          role={undefined}
          className={className}
          naked
        >
          <Avatar />
        </IconButton>
      )}
      <AccountPopup anchorEl={anchorEl} handleClose={handleClose} />
    </>
  )
}

export default AvatarButton
