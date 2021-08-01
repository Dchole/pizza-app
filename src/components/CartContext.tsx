import {
  Enum_Pizzas_Size,
  GetCartPizzasQuery,
  getSdk
} from "@/graphql/generated"
import { cmsLinks } from "cms"
import { GraphQLClient } from "graphql-request"
import { useEffect } from "react"
import { createContext, useContext, useState } from "react"
import { ICartItem, useUser } from "./UserContext"
import firebase from "@/lib/firebase"

type TCartItemDetails = ICartItem & GetCartPizzasQuery["pizzas"][0]

interface ICartContextProps {
  cart: TCartItemDetails[]
  totalAmount: number
  totalQuantity: number
  addItem: (pizza_id: string, size: Enum_Pizzas_Size) => void
  removeItem: (pizza_id: string) => void
  incrementItem: (pizza_id: string, size: Enum_Pizzas_Size) => void
  decrementItem: (pizza_id: string, size: Enum_Pizzas_Size) => void
  setQuantity: (
    pizza_id: string,
    size: Enum_Pizzas_Size,
    quantity: number
  ) => void
  clearCart: () => Promise<void>
}

const CartContext = createContext({} as ICartContextProps)

const CartContextProvider: React.FC = ({ children }) => {
  const { user } = useUser()
  const [cart, setCart] = useState<TCartItemDetails[]>([])
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    ;(async () => {
      const client = new GraphQLClient(cmsLinks.api)
      const sdk = getSdk(client)
      const { pizzas } = await sdk.getCartPizzas({
        filter: { id_in: user.cart.map(({ pizza_id }) => pizza_id) }
      })

      const result = pizzas?.map(pizza => ({
        ...user.cart.find(({ pizza_id }) => pizza_id === pizza?.id),
        ...pizza
      }))

      setCart(result)
    })()
  }, [user.cart])

  useEffect(() => {
    const totalAmount = cart.reduce((prev, curr) => {
      return (
        prev +
        (curr.price_of_small * curr.quantity.small +
          curr.price_of_medium * curr.quantity.medium +
          curr.price_of_large * curr.quantity.large)
      )
    }, 0)

    const totalQuantity = cart.reduce((prev, curr) => {
      return (
        prev + curr.quantity.small + curr.quantity.medium + curr.quantity.large
      )
    }, 0)

    setTotalAmount(totalAmount)
    setTotalQuantity(totalQuantity)
  }, [cart])

  const addItem = (pizza_id: string, size: Enum_Pizzas_Size) => {
    firebase
      .firestore()
      .doc(`users/${user.uid}`)
      .collection("cart")
      .add({ pizza_id, sizes: { [size]: 1 } })
  }

  const removeItem = (pizza_id: string) => {
    firebase.firestore().doc(`users/${user.uid}/cart/${pizza_id}`).delete()
  }

  const incrementItem = (pizza_id: string, size: Enum_Pizzas_Size) => {
    firebase
      .firestore()
      .doc(`users/${user.uid}/cart/${pizza_id}`)
      .set({ sizes: { [size]: firebase.firestore.FieldValue.increment(1) } })
  }

  const decrementItem = (pizza_id: string, size: Enum_Pizzas_Size) => {
    firebase
      .firestore()
      .doc(`users/${user.uid}/cart/${pizza_id}`)
      .set({ sizes: { [size]: firebase.firestore.FieldValue.increment(-1) } })
  }

  const setQuantity = (
    pizza_id: string,
    size: Enum_Pizzas_Size,
    quantity: number
  ) => {
    firebase
      .firestore()
      .doc(`users/${user.uid}/cart/${pizza_id}`)
      .set({ sizes: { [size]: quantity } })
  }

  const clearCart = async () => {
    const cart = await firebase
      .firestore()
      .collection(`users/${user.uid}/cart`)
      .get()
    const batch = firebase.firestore().batch()

    cart.forEach(doc => doc.exists && batch.delete(doc.ref))
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        totalAmount,
        totalQuantity,
        incrementItem,
        decrementItem,
        setQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}

export default CartContextProvider
