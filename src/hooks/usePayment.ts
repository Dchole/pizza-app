import { usePaystackPayment } from "react-paystack"
import { useCart } from "@/components/CartContext"
import useUser from "./useUser"
import { fetcher } from "@/utils/fetcher"

const usePayment = (product?: string, amount?: number) => {
  const { user } = useUser()
  const { cartItems, totalAmount, clearCart } = useCart()

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

  const handleCheckout = () =>
    initializePayment(async res => {
      await fetcher("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          transactionID: res.transaction,
          products: product ? [product] : cartItems.map(item => item.name),
          amount: amount ?? totalAmount
        })
      })

      clearCart()
    })

  return handleCheckout
}

export default usePayment
