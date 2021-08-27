import Head from "next/head"
import { useCart } from "@/components/CartContext"
import useScreenSize from "@/hooks/usScreenSize"
import CheckoutDesktop from "@/components/Checkout/Desktop"
import MobileCheckout from "@/components/Checkout/Mobile"

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
      {desktop ? <CheckoutDesktop /> : <MobileCheckout />}
    </>
  )
}

export default Checkout
