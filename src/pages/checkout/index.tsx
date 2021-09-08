import Head from "next/head"
import { useCart } from "@/components/CartContext"
import useScreenSize from "@/hooks/usScreenSize"
import CheckoutDesktop from "@/components/Checkout/Desktop"
import MobileCheckout from "@/components/Checkout/Mobile"
import ConfirmationProvider from "@/components/Checkout/Context"

const Checkout = () => {
  const desktop = useScreenSize()
  const { totalAmount, totalQuantity } = useCart()

  return (
    <>
      <Head>
        <title>
          Checkout {totalQuantity} items for {totalAmount}
        </title>
      </Head>
      <ConfirmationProvider price={totalAmount}>
        {desktop ? <CheckoutDesktop /> : <MobileCheckout />}
      </ConfirmationProvider>
    </>
  )
}

export default Checkout
