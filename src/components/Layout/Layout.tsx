import Link from "@material-ui/core/Link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useStyles } from "./useStyles"
import { useRouter } from "next/router"

const Layout: React.FC = ({ children }) => {
  const classes = useStyles()
  const { pathname } = useRouter()
  const onAuthPage = pathname === "/login" || pathname === "/register"

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
      {pathname === "/" && <Header />}
      {children}
      {!onAuthPage && <Footer />}
    </div>
  )
}

export default Layout
