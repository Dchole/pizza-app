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
  calculating: boolean
  fetchingDetails: boolean
  addItem: (pizza_id: string, size: string) => Promise<void>
  removeItem: (pizza_id: string) => Promise<void>
  incrementItem: (pizza_id: string, size: string) => Promise<void>
  decrementItem: (pizza_id: string, size: string) => Promise<void>
  setQuantity: (
    pizza_id: string,
    payload: ICartItem["quantity"]
  ) => Promise<void>
  clearCart: () => Promise<void>
  getItemPrice: (pizza_id: string) => number
  getItemQuantity: (pizza_id: string) => number
  isItemInCart: (pizza_id: string) => boolean
}

const CartContext = createContext({} as ICartContextProps)

const CartContextProvider: React.FC = ({ children }) => {
  const { user } = useUser()
  const cartLengthRef = useRef(0)
  const [calculating, setCalculating] = useState(false)
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
    if (user?.cart.length) {
      // If item length has been changed
      // Reassign the new length to the old length
      ;(async () => {
        try {
          console.log(user.cart.length !== cartLengthRef.current)
          if (user.cart.length !== cartLengthRef.current) {
            cartLengthRef.current = user.cart.length
            const client = new GraphQLClient(cmsLinks.api)
            const sdk = getSdk(client)
            const { pizzas } = await sdk.getCartPizzas({
              filter: { id_in: user.cart.map(({ pizza_id }) => pizza_id) }
            })

            const result = pizzas?.map(pizza => ({
              ...user.cart?.find(({ pizza_id }) => pizza_id === pizza?.id),
              ...pizza
            }))

            console.log(result)

            result && setCart(result)
          } else {
            setCart(prevCart =>
              prevCart.map(item => ({
                ...item,
                ...user.cart.find(({ pizza_id }) => item.id === pizza_id)
              }))
            )
          }
        } catch (error) {
          console.log(error.message)
        } finally {
          setFetchingDetails(false)
        }
      })()
    } else if (user?.cart?.length === 0) {
      setFetchingDetails(false)
    }
  }, [user?.cart])

  useEffect(() => {
    if (user?.cart.length) {
      setCalculating(true)
      const totalAmount = user?.cart.reduce((prev, curr) => {
        return prev + getItemPrice(curr.pizza_id)
      }, 0)

      const totalQuantity = user?.cart.reduce((prev, curr) => {
        return (
          prev +
          (curr.quantity.small ?? 0) +
          (curr.quantity.medium ?? 0) +
          (curr.quantity.large ?? 0)
        )
      }, 0)

      console.log(totalAmount, totalQuantity)

      setTotalAmount(totalAmount)
      setTotalQuantity(totalQuantity)
      setCalculating(false)
    }
  }, [user?.cart, getItemPrice])

  const addItem = async (pizza_id: string, size: string) => {
    firebase
      .firestore()
      .doc(`users/${user?.uid}/cart/${pizza_id}`)
      .set({ quantity: { [size]: 1 } })
  }

  const removeItem = async (pizza_id: string) => {
    firebase.firestore().doc(`users/${user?.uid}/cart/${pizza_id}`).delete()
  }

  const incrementItem = async (pizza_id: string, size: string) => {
    const item = user.cart.find(item => item.pizza_id === pizza_id)

    firebase
      .firestore()
      .doc(`users/${user?.uid}/cart/${pizza_id}`)
      .set({
        quantity: { ...item.quantity, [size]: (item.quantity[size] ?? 0) + 1 }
      })
  }

  const decrementItem = async (pizza_id: string, size: string) => {
    const item = user.cart.find(item => item.pizza_id === pizza_id)

    firebase
      .firestore()
      .doc(`users/${user?.uid}/cart/${pizza_id}`)
      .set({
        quantity: { ...item.quantity, [size]: (item.quantity[size] ?? 0) - 1 }
      })
  }

  const setQuantity = useCallback(
    async (pizza_id: string, quantity: ICartItem["quantity"]) => {
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
        calculating,
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
