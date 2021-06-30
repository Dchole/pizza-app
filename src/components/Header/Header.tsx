import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"
import BagIcon from "@material-ui/icons/LocalMall"
import AccountIcon from "@material-ui/icons/AccountCircle"
import Link from "@/components/Link"
import { useStyles } from "./useStyle"
import { navLinks } from "./nav-links"

const Header = () => {
  const classes = useStyles()

  return (
    <AppBar elevation={0} classes={{ root: classes.root }}>
      <Toolbar>
        <div>
          <div>logo</div>
          <nav>
            <ul>
              {navLinks.map(({ label, path }) => (
                <li key={label}>
                  <Link href={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className={classes.account}>
          <IconButton
            aria-label="account"
            component={Link}
            href="/cart"
            naked
            role={undefined}
          >
            <BagIcon />
          </IconButton>
          <IconButton aria-label="account" onClick={() => {}}>
            <AccountIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Header
