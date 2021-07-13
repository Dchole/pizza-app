import useUser from "@/hooks/useUser"
import { GetPizzasQuery, getSdk } from "@/graphql/generated"
import { cmsLinks } from "cms"
import { GraphQLClient } from "graphql-request"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { fetcher } from "@/utils/fetcher"
import CartDatabase, { ICartTable } from "@/indexedDB/cart"

type TPizza = GetPizzasQuery["pizzas"][0]

interface ICart {
  id: string
  quantity: number
}

interface ICartContextProps {
  cart: ICart[]
  totalAmount: number
  addItem: (pizza: TPizza) => () => void
  removeItem: (pizza: TPizza) => () => void
  increment: (event: React.MouseEvent<HTMLButtonElement>) => void
  decrement: (event: React.MouseEvent<HTMLButtonElement>) => void
  cartItems: ICartTable[]
  isItemInCart: (id: string) => boolean
}

const fetchCart = async (cart: ICart[]) => {
  const client = new GraphQLClient(cmsLinks.api)
  const sdk = getSdk(client)
  const { pizzas } = await sdk.getCartPizzas({
    filter: { id_in: cart.map(({ id }) => id) }
  })

  const networkCart = pizzas.map(pizza => ({
    ...cart.find(({ id }) => id === pizza.id),
    ...pizza
  }))

  return networkCart
}

const CartContext = createContext({} as ICartContextProps)

const CartContextProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<ICart[]>([])
  const dbRef = useRef<CartDatabase>()
  const [totalAmount, setTotalAmount] = useState(0)
  const [cartItems, setCartItems] = useState<ICartTable[]>([])
  const { user, mutate } = useUser()

  const addItem = (pizza: TPizza) => () => {
    setCart(prevCart => [...prevCart, { id: pizza.id, quantity: 1 }])
    dbRef.current.getCart.add({ ...pizza, quantity: 1 })
  }

  const removeItem = (pizza: TPizza) => () => {
    setCart(prevCart => prevCart.filter(({ id }) => id !== pizza.id))
    dbRef.current.getCart.delete(pizza.id)
  }

  const increment = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === event.currentTarget.dataset.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }

  const decrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === event.currentTarget.dataset.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    )
  }

  const isItemInCart = (id: string) =>
    Boolean(cart.find(item => item.id === id))

  useEffect(() => {
    if (!cart.length) {
      ;(async () => {
        dbRef.current = new CartDatabase()

        const { current: db } = dbRef
        const cachedCart = await db.getCart.toArray()

        const cartData = user?.cart?.length
          ? user.cart
          : cachedCart.map(item => ({
              id: item.id,
              quantity: item.quantity ?? 0
            }))

        if (user?.cart?.length && !cachedCart.length) {
          const networkCart = await fetchCart(user.cart)
          setCartItems(networkCart)

          await db.getCart.bulkPut(networkCart)
        }

        setCart(cartData)
      })()
    }
  }, [user?.cart, cart.length])

  useEffect(() => {
    const amount = cartItems.reduce(
      (accumulator, currentValue) =>
        accumulator +
        currentValue.price *
          cart.find(({ id }) => id === currentValue.id)?.quantity,
      0
    )

    setTotalAmount(amount)
  }, [cart, cartItems])

  useEffect(() => {
    if (cart.length && user?.isLoggedIn) {
      fetcher("/api/add-to-cart", {
        method: "POST",
        body: JSON.stringify(cart)
      }).then(mutate)
    }
  }, [cart, user, mutate])

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        increment,
        decrement,
        cartItems,
        totalAmount,
        isItemInCart
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
