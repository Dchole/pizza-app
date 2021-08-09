import { GetPizzasQuery, getSdk } from "@/graphql/generated"
import { cmsLinks } from "cms"
import { GraphQLClient } from "graphql-request"
import { useEffect, useRef } from "react"
import { createContext, useContext, useState } from "react"
import { ICartItem, useUser } from "./UserContext"
import firebase from "@/lib/firebase"
import { useCallback } from "react"

export type TCartItemDetails = NonNullable<GetPizzasQuery["pizzas"]>[0] &
  ICartItem

interface ICartContextProps {
  cart: TCartItemDetails[]
  totalAmount: number
  totalQuantity: number
  fetchingDetails: boolean
  addItem: (pizza_id: string, size: string) => void
  removeItem: (pizza_id: string) => void
  incrementItem: (pizza_id: string, size: string) => void
  decrementItem: (pizza_id: string, size: string) => void
  setQuantity: (pizza_id: string, payload: ICartItem["quantity"]) => void
  clearCart: () => Promise<void>
  getItemPrice: (pizza_id: string) => number
  getItemQuantity: (pizza_id: string) => number
  isItemInCart: (pizza_id: string) => boolean
}

const CartContext = createContext({} as ICartContextProps)

const CartContextProvider: React.FC = ({ children }) => {
  const { user } = useUser()
  const cartLengthRef = useRef(0)
  const [fetchingDetails, setFetchingDetails] = useState(true)
  const [cart, setCart] = useState<TCartItemDetails[]>([])
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)

  const getItemPrice = useCallback(
    (pizza_id: string) => {
      const item = cart.find(item => pizza_id === item.pizza_id)

      return item
        ? Object.entries(item.quantity).reduce(
            (acc, [size, quantity]) =>
              acc + item[`price_of_${size}`] * quantity,
            0
          )
        : 0
    },
    [cart]
  )

  const getItemQuantity = (pizza_id: string) => {
    const item = cart.find(item => pizza_id === item.pizza_id)

    return item
      ? Object.values(item.quantity).reduce(
          (acc, quantity) => acc + quantity,
          0
        )
      : 0
  }

  useEffect(() => {
    // Check if new item has been added to cart
    // then fetch item details
    if (user?.cart && user?.cart?.length !== cartLengthRef.current) {
      // If item length has been changed
      // Reassign the new length to the old length
      cartLengthRef.current = user.cart.length
      ;(async () => {
        try {
          const client = new GraphQLClient(cmsLinks.api)
          const sdk = getSdk(client)
          const { pizzas } = await sdk.getCartPizzas({
            filter: { id_in: user.cart?.map(({ pizza_id }) => pizza_id) }
          })

          const result = pizzas?.map(pizza => ({
            ...user.cart?.find(({ pizza_id }) => pizza_id === pizza?.id),
            ...pizza
          }))

          result && setCart(result)
        } catch (error) {
          console.log(error.message)
        } finally {
          setFetchingDetails(false)
        }
      })()
    } else {
      setFetchingDetails(false)
    }
  }, [user?.cart])

  useEffect(() => {
    if (cart.length) {
      const totalAmount = cart.reduce((prev, curr) => {
        return prev + getItemPrice(curr.pizza_id)
      }, 0)

      const totalQuantity = cart.reduce((prev, curr) => {
        return (
          prev +
          curr.quantity.small +
          curr.quantity.medium +
          curr.quantity.large
        )
      }, 0)

      setTotalAmount(totalAmount)
      setTotalQuantity(totalQuantity)
    }
  }, [cart, getItemPrice])

  const addItem = (pizza_id: string, size: string) => {
    firebase
      .firestore()
      .doc(`users/${user?.uid}/cart/${pizza_id}`)
      .set({ quantity: { [size]: 1 } })
  }

  const removeItem = (pizza_id: string) => {
    firebase.firestore().doc(`users/${user?.uid}/cart/${pizza_id}`).delete()
  }

  const incrementItem = (pizza_id: string, size: string) => {
    const item = user.cart.find(item => item.pizza_id === pizza_id)

    firebase
      .firestore()
      .doc(`users/${user?.uid}/cart/${pizza_id}`)
      .set({
        quantity: { ...item.quantity, [size]: (item.quantity[size] ?? 0) + 1 }
      })
  }

  const decrementItem = (pizza_id: string, size: string) => {
    const item = user.cart.find(item => item.pizza_id === pizza_id)

    firebase
      .firestore()
      .doc(`users/${user?.uid}/cart/${pizza_id}`)
      .set({
        quantity: { ...item.quantity, [size]: (item.quantity[size] ?? 0) - 1 }
      })
  }

  const setQuantity = useCallback(
    (pizza_id: string, quantity: ICartItem["quantity"]) => {
      firebase
        .firestore()
        .doc(`users/${user?.uid}/cart/${pizza_id}`)
        .set({ quantity })
    },
    [user?.uid]
  )

  const clearCart = async () => {
    const cart = await firebase
      .firestore()
      .collection(`users/${user?.uid}/cart`)
      .get()
    const batch = firebase.firestore().batch()

    cart.forEach(doc => doc.exists && batch.delete(doc.ref))
  }

  const isItemInCart = (pizza_id: string) =>
    !!cart.find(({ id }) => pizza_id === id)

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        totalAmount,
        isItemInCart,
        getItemPrice,
        fetchingDetails,
        getItemQuantity,
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
