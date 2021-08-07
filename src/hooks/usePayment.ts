import firebase from "@/lib/firebase"
import { usePaystackPayment } from "react-paystack"
import { useCart } from "@/components/CartContext"
import { useUser } from "@/components/UserContext"

const usePayment = (product?: string, amount?: number) => {
  const { user } = useUser()
  const { cart, totalAmount, clearCart } = useCart()

  const initializePayment = usePaystackPayment({
    reference: Date.now().toString(),
    amount: (amount ?? totalAmount) * 100,
    email: user?.email || "no-email@gmail.com",
    currency: "GHS",
    channels: ["mobile_money"],
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC,
    firstname: user?.displayName?.split(" ")[0],
    lastname: user?.displayName?.split(" ")[1]
  })

  const handleCheckout = () =>
    initializePayment(async (res: any) => {
      firebase
        .firestore()
        .collection(`users/${user?.uid}/transactions`)
        .add({
          transactionID: res.transaction,
          products: product ? [product] : cart.map(item => item.name),
          amount: amount ?? totalAmount
        })

      clearCart()
    })

  return handleCheckout
}

export default usePayment
