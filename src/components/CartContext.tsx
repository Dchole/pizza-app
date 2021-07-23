import useUser from "@/hooks/useUser"
import {
  CardFragment,
  Enum_Pizzas_Size,
  getSdk,
  Maybe
} from "@/graphql/generated"
import { cmsLinks } from "cms"
import { GraphQLClient } from "graphql-request"
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react"
import { fetcher } from "@/utils/fetcher"
import CartDatabase, { ICartTable } from "@/indexedDB/cart"

type TPizza = Maybe<{ __typename?: "Pizzas" } & CardFragment>
type TCart = Pick<ICartTable, "id" | "quantity" | "size">[]

interface ICartContextProps {
  cart: TCart
  totalAmount: number
  clearCart: () => void
  addItem: (pizza: TPizza) => () => void
  removeItem: (pizza: TPizza) => () => void
  increment: (event: React.MouseEvent<HTMLButtonElement>) => void
  decrement: (event: React.MouseEvent<HTMLButtonElement>) => void
  selectSize: (event: React.MouseEvent<HTMLButtonElement>) => void
  cartItems: ICartTable[]
  isItemInCart: (id: string) => boolean
  getItemSize: (id: string) => Enum_Pizzas_Size
  getItemPrice: (
    item: Pick<
      ICartTable,
      "size" | "price_of_small" | "price_of_medium" | "price_of_large"
    >
  ) => number
}

const fetchCart = async (cart: TCart) => {
  const client = new GraphQLClient(cmsLinks.api)
  const sdk = getSdk(client)
  const { pizzas } = await sdk.getCartPizzas({
    filter: { id_in: cart.map(({ id }) => id) }
  })

  const networkCart = pizzas?.map(pizza => ({
    ...cart.find(({ id }) => id === pizza?.id)!,
    ...pizza!
  }))

  return networkCart
}

const CartContext = createContext({} as ICartContextProps)

const CartContextProvider: React.FC = ({ children }) => {
  const dbRef = useRef<CartDatabase>()
  const [cart, setCart] = useState<TCart>([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [cartItems, setCartItems] = useState<ICartTable[]>([])
  const { user, mutate } = useUser()

  const addItem = (pizza: TPizza) => () => {
    setCart(prevCart => [
      ...prevCart,
      { id: pizza!.id, size: Enum_Pizzas_Size["Medium"], quantity: 1 }
    ])

    setCartItems(prevCartItems => [
      ...prevCartItems,
      { ...pizza!, quantity: 1 }
    ])
  }

  const removeItem = (pizza: TPizza) => () => {
    setCart(prevCart => prevCart.filter(({ id }) => id !== pizza?.id))
    setCartItems(prevCart => prevCart.filter(({ id }) => id !== pizza?.id))
  }

  const increment = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )

    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
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
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
    )
  }

  const selectSize = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.parentElement!.dataset
    // @ts-ignore
    const size = Enum_Pizzas_Size[event.currentTarget.textContent]

    setCart(prevCart =>
      prevCart.map(item => (item.id === id ? { ...item, size } : item))
    )

    setCartItems(prevCartItems =>
      prevCartItems.map(item => (item.id === id ? { ...item, size } : item))
    )
  }

  const clearCart = async () => {
    setCart([])
    setCartItems([])

    fetcher("/api/clear-cart")
  }

  const isItemInCart = (id: string) =>
    Boolean(cart.find(item => item.id === id))

  const getItemSize = (id: string) => cart.find(item => item.id === id)!.size!
  const getItemPrice = useCallback(
    (
      item: Pick<
        ICartTable,
        "size" | "price_of_small" | "price_of_medium" | "price_of_large"
      >
    ) => {
      switch (item.size) {
        case "small":
          return item.price_of_small
        case "medium":
          return item.price_of_medium!
        case "large":
          return item.price_of_large!
        default:
          return item.price_of_medium!
      }
    },
    []
  )

  useEffect(() => {
    ;(async () => {
      dbRef.current = new CartDatabase()

      const { current: db } = dbRef
      const cachedCart = await db.getCart.toArray()
      setCartItems(cachedCart)

      const cartData = user?.cart?.length
        ? user.cart
        : cachedCart.map(item => ({
            id: item.id,
            size: item.size,
            quantity: item.quantity ?? 1
          }))

      if (user?.cart?.length && !cachedCart.length) {
        const networkCart = await fetchCart(user.cart)

        if (networkCart) {
          setCartItems(networkCart)
          db.getCart.bulkPut(networkCart)
        }
      }

      setCart(cartData)
    })()
  }, [user?.cart])

  useEffect(() => {
    const amount = cartItems.reduce(
      (accumulator, currentValue) =>
        // @ts-ignore
        accumulator + getItemPrice(currentValue) * currentValue.quantity,
      0
    )

    setTotalAmount(amount)

    const { current: db } = dbRef
    cartItems.length ? db?.getCart.bulkPut(cartItems) : db?.getCart.clear()
  }, [cartItems, getItemPrice])

  useEffect(() => {
    if (cart.length && user?.isLoggedIn) {
      fetcher("/api/add-to-cart", {
        method: "POST",
        body: JSON.stringify(cart)
      }).then(() => mutate())
    }
  }, [cart, user?.isLoggedIn, mutate])

  useEffect(() => {
    if (cart.some(item => item.quantity === 0)) {
      setCart(prevCart => prevCart.filter(item => item.quantity !== 0))
      setCartItems(prevCart => prevCart.filter(item => item.quantity !== 0))
    }
  }, [cart])

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        clearCart,
        selectSize,
        removeItem,
        increment,
        decrement,
        cartItems,
        totalAmount,
        isItemInCart,
        getItemSize,
        getItemPrice
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
