import Header from "@/components/Header"
import Footer from "@/components/Footer"

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default Layout
