import Link from "@material-ui/core/Link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useStyles } from "./useStyles"

const Layout: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <div id="top">
      <Link
        id="skip-navigation"
        href="#main-content"
        className={classes.link}
        variant="srOnly"
      >
        skip navigation
      </Link>
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
