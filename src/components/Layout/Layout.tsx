import Link from "@material-ui/core/Link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PizzaContextProvider from "../PizzaContext"
import { useStyles } from "./useStyles"
import { useRouter } from "next/router"
import CartContextProvider from "../CartContext"
import PageBackdrop from "../PageBackdrop"
import UserContextComp from "../UserContext"

const Layout: React.FC = ({ children }) => {
  const classes = useStyles()
  const { pathname } = useRouter()
  const onAuthPage = [
    "/login",
    "/register",
    "/forgot-password",
    "/change-password"
  ].includes(pathname)
  const onContentSite = ["/", "/about", "/hiring"].includes(pathname)

  return (
    <UserContextComp>
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
            {onContentSite || onAuthPage ? (
              children
            ) : (
              <PageBackdrop>{children}</PageBackdrop>
            )}
            {onContentSite && <Footer />}
          </div>
        </CartContextProvider>
      </PizzaContextProvider>
    </UserContextComp>
  )
}

export default Layout
