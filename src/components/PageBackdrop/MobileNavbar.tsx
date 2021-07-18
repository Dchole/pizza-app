import Image from "next/image"
import Toolbar from "@material-ui/core/Toolbar"
import Grid from "@material-ui/core/Grid"
import Zoom from "@material-ui/core/Zoom"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import SearchIcon from "@material-ui/icons/Search"
import MoreIcon from "@material-ui/icons/MoreVert"
import CloseIcon from "@material-ui/icons/Close"
import ButtonLink from "../ButtonLink"
import { useEffect, useState } from "react"
import { useMobileNavStyles } from "./useMobileNavStyles"
import useUser from "@/hooks/useUser"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

const AccountPopup = dynamic(() => import("../Header/AccountPopup"))

interface IMobileNavbarProps {
  open: boolean
  handleClose: () => void
  handleOpen: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const MobileNavbar: React.FC<IMobileNavbarProps> = ({
  open,
  handleOpen,
  handleClose
}) => {
  const classes = useMobileNavStyles()
  const { user } = useUser()
  const { pathname } = useRouter()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [navElTransition, setNavElTransition] = useState(false)
  const [closeBtnTransition, setCloseBtnTransition] = useState(false)

  const openPopup = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget)
  const closePopup = () => setAnchorEl(null)

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (open) {
      timeout = setTimeout(() => setNavElTransition(open), 150)
      setCloseBtnTransition(open)
    } else {
      timeout = setTimeout(() => setCloseBtnTransition(open), 150)
      setNavElTransition(open)
    }

    return () => clearTimeout(timeout)
  }, [open])

  return (
    <Toolbar component="header" className={classes.toolbar}>
      <Grid alignItems="center" container>
        <Zoom in={!closeBtnTransition} timeout={150} unmountOnExit mountOnEnter>
          <IconButton
            data-direction="left"
            aria-label="open navigation menu"
            onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>
        </Zoom>
        <Zoom in={!closeBtnTransition} timeout={150} unmountOnExit mountOnEnter>
          <div>
            <Image
              src="/logo-placeholder.svg"
              alt="logo"
              width={35}
              height={58}
            />
          </div>
        </Zoom>
      </Grid>
      {!user?.isLoggedIn && (
        <Zoom in={!closeBtnTransition} timeout={150} unmountOnExit mountOnEnter>
          <ButtonLink href="/login" variant="outlined">
            Login
          </ButtonLink>
        </Zoom>
      )}
      <Zoom
        in={!closeBtnTransition && pathname === "/store"}
        timeout={150}
        unmountOnExit
        mountOnEnter
      >
        <IconButton
          data-direction="right"
          aria-label="open search and filter options"
          onClick={handleOpen}
          style={{ marginLeft: 8 }}
        >
          <SearchIcon />
        </IconButton>
      </Zoom>
      {user?.isLoggedIn && (
        <Zoom in={!closeBtnTransition} timeout={150} unmountOnExit mountOnEnter>
          <IconButton
            data-direction="right"
            aria-label="open account options"
            onClick={openPopup}
          >
            <MoreIcon />
          </IconButton>
        </Zoom>
      )}
      <Zoom unmountOnExit mountOnEnter in={navElTransition} timeout={150}>
        <IconButton aria-label="close menu" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Zoom>
      <AccountPopup anchorEl={anchorEl} handleClose={closePopup} />
    </Toolbar>
  )
}

export default MobileNavbar
