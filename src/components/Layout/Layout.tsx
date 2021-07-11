import Link from "@material-ui/core/Link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PizzaContextProvider from "../PizzaContext"
import { useStyles } from "./useStyles"
import { useRouter } from "next/router"
import CartContextProvider from "../CartContext"

const Layout: React.FC = ({ children }) => {
  const classes = useStyles()
  const { pathname } = useRouter()
  const onAuthPage = pathname === "/login" || pathname === "/register"

  return (
    <PizzaContextProvider>
      <CartContextProvider>
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
      </CartContextProvider>
    </PizzaContextProvider>
  )
}

export default Layout
