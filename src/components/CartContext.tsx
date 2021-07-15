import useUser from "@/hooks/useUser"
import { GetPizzasQuery, getSdk } from "@/graphql/generated"
import { cmsLinks } from "cms"
import { GraphQLClient } from "graphql-request"
import { createContext, useContext, useEffect, useRef, useState } from "react"
import { fetcher } from "@/utils/fetcher"
import CartDatabase, { ICartTable } from "@/indexedDB/cart"

type TPizza = GetPizzasQuery["pizzas"][0]
type TCart = Pick<ICartTable, "id" | "quantity">[]

interface ICartContextProps {
  cart: TCart
  totalAmount: number
  addItem: (pizza: TPizza) => () => void
  removeItem: (pizza: TPizza) => () => void
  increment: (event: React.MouseEvent<HTMLButtonElement>) => void
  decrement: (event: React.MouseEvent<HTMLButtonElement>) => void
  cartItems: ICartTable[]
  isItemInCart: (id: string) => boolean
}

const fetchCart = async (cart: TCart) => {
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
  const [cart, setCart] = useState<TCart>([])
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
    const { id } = event.currentTarget.dataset

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const decrement = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
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
        setCartItems(cachedCart)

        const cartData = user?.cart?.length
          ? user.cart
          : cachedCart.map(item => ({
              id: item.id,
              quantity: item.quantity ?? 1
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
        accumulator + currentValue.price * currentValue.quantity,
      0
    )

    setTotalAmount(amount)
  }, [cartItems])

  useEffect(() => {
    const updatedList = (c: ICartTable[]) =>
      c.map(item => ({ ...item, ...cart.find(({ id }) => id === item.id) }))

    setCartItems(updatedList)

    const { current: db } = dbRef

    db.getCart
      .toArray()
      .then(existingCart => db.getCart.bulkPut(updatedList(existingCart)))
  }, [cart])

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
