import { usePaystackPayment } from "react-paystack"
import { useCart } from "@/components/CartContext"
import useUser from "./useUser"

const usePayment = (amount?: number) => {
  const { user } = useUser()
  const { totalAmount, clearCart } = useCart()

  const initializePayment = usePaystackPayment({
    reference: Date.now().toString(),
    amount: (amount ?? totalAmount) * 100,
    email: user?.email || "no-email@gmail.com",
    currency: "GHS",
    channels: ["mobile_money"],
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC,
    firstname: user?.firstName,
    lastname: user?.lastName
  })

  const handleCheckout = () => initializePayment(clearCart)

  return handleCheckout
}

export default usePayment
