import { useState, useEffect, createContext, useContext } from "react"
import { Enum_Pizzas_Size } from "@/graphql/generated"
import firebase from "@/lib/firebase"

export interface ICartItem {
  pizza_id: string
  quantity: {
    small: number
    medium: number
    large: number
  }
}

interface IUserData extends firebase.User {
  location: string
  address: string
  cart: ICartItem[]
  transactions: string[]
}

export type TUser = Partial<IUserData> | null

interface IContextProps {
  user: TUser
  updateUser: (user: TUser) => void
  loadingUser: boolean
  token: string
}

export const UserContext = createContext({} as IContextProps)

export default function UserContextComp({ children }) {
  const [user, setUser] = useState<TUser>(null)
  const [token, setToken] = useState("")
  const [loadingUser, setLoadingUser] = useState(true) // Helpful, to update the UI accordingly.

  useEffect(() => {
    let userSnapshotUnSubscriber: () => void
    let cartSnapshotUnSubscriber: () => void

    // Listen authenticated user
    const userUnsubscriber = firebase.auth().onAuthStateChanged(async user => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, phoneNumber, photoURL, isAnonymous } = user
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser({
            uid,
            displayName,
            phoneNumber,
            photoURL,
            isAnonymous
          })

          userSnapshotUnSubscriber = firebase
            .firestore()
            .doc(`users/${uid}`)
            .onSnapshot(doc => {
              return (
                doc.exists &&
                setUser(prevUser => ({ ...prevUser, ...doc.data() }))
              )
            })

          cartSnapshotUnSubscriber = firebase
            .firestore()
            .collection(`users/${uid}/cart`)
            .onSnapshot(doc => {
              const cartItems = doc.docs.map(item => {
                const cart = {
                  pizza_id: item.id,
                  ...item.data()
                } as ICartItem

                return cart
              })

              setUser(prevUser => ({ ...prevUser, cart: cartItems }))
            })
        } else {
          firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
              return firebase.auth().signInAnonymously()
            })
        }
      } catch (error) {
        console.log(error)
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false)
      }
    })

    const tokenUnsubscriber = firebase.auth().onIdTokenChanged(async res => {
      try {
        const token = await res?.getIdToken()
        setToken(token)
      } catch (error) {
        console.log(error)
      }
    })

    // Unsubscribe auth listener on unmount
    return () => {
      userUnsubscriber()
      tokenUnsubscriber()
      userSnapshotUnSubscriber?.()
      cartSnapshotUnSubscriber?.()
    }
  }, [])

  const updateUser = (user: firebase.User) =>
    setUser(prevUser => ({ ...prevUser, ...user }))

  return (
    <UserContext.Provider value={{ user, token, updateUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)
