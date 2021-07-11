import useUser from "@/hooks/useUser"
import { getSdk } from "@/graphql/generated"
import { cms } from "cms"
import { GraphQLClient } from "graphql-request"
import { createContext, useContext, useEffect, useState } from "react"
import Cart, { IPayload } from "../indexedDB/cart"

interface ICartContextProps {
  cart: ICart[]
  totalAmount: number
  addItem: (id: string) => void
  removeItem: (id: string) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  cartItems: IPayload[]
}

interface ICart {
  id: string
  quantity: number
}

const CartContext = createContext({} as ICartContextProps)

const CartContextProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<ICart[]>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [cartItems, setCartItems] = useState<IPayload[]>([])
  const { user } = useUser()

  const addItem = (id: string) => {
    setCart(prevCart => [...prevCart, { id, quantity: 1 }])
  }

  const removeItem = (id: string) => {
    setCart(prevCart => prevCart.filter(pizza => pizza.id !== id))
  }

  const increment = (id: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decrement = (id: string) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    )
  }

  useEffect(() => {
    ;(async () => {
      const cache = new Cart()
      const cachedCart = await cache.getCart()

      const cartData = user?.cart.length
        ? user.cart
        : cachedCart.map(item => ({
            id: item.id,
            quantity: item.quantity
          }))

      if (user?.cart.length && !cachedCart.length) {
        const client = new GraphQLClient(`${cms}/graphql`)
        const sdk = getSdk(client)
        const { pizzas } = await sdk.getCartPizzas({
          filter: { id_in: user.cart.map(({ id }) => id) }
        })

        const networkCart = pizzas.map(pizza => ({
          ...user.cart.find(({ id }) => id === pizza.id),
          ...pizza
        }))

        setCartItems(networkCart)
        await cache.saveCart(networkCart)
      }

      setCartItems(cachedCart)
      setCart(cartData)
    })()
  }, [user?.cart])

  useEffect(() => {
    const amount = cartItems.reduce(
      (accumulator, currentValue) =>
        accumulator +
        currentValue.price *
          cart.find(({ id }) => id === currentValue.id).quantity,
      0
    )

    setTotalAmount(amount)
  }, [cart, cartItems])

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        increment,
        decrement,
        cartItems,
        totalAmount
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
