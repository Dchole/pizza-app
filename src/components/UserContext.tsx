import { useState, useEffect, createContext, useContext } from "react"
import {
  browserSessionPersistence,
  getAuth,
  signInAnonymously,
  User
} from "firebase/auth"
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore"

export interface ICartItem {
  pizza_id: string
  quantity: {
    small: number
    medium: number
    large: number
  }
}

interface IUserData extends User {
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

const UserContextComp: React.FC = ({ children }) => {
  const [user, setUser] = useState<TUser>(null)
  const [token, setToken] = useState("")
  const [loadingUser, setLoadingUser] = useState(true) // Helpful, to update the UI accordingly.

  useEffect(() => {
    let userSnapshotUnSubscriber: () => void
    let cartSnapshotUnSubscriber: () => void

    // Listen authenticated user
    const userUnsubscriber = getAuth().onAuthStateChanged(async user => {
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

          userSnapshotUnSubscriber = onSnapshot(
            doc(getFirestore(), `users/${uid}`),
            doc => {
              return (
                doc.exists() &&
                setUser(prevUser => ({ ...prevUser, ...doc.data() }))
              )
            }
          )

          cartSnapshotUnSubscriber = onSnapshot(
            collection(getFirestore(), `users/${uid}/cart`),
            doc => {
              const cartItems = doc.docs.map(item => {
                const cart = {
                  pizza_id: item.id,
                  ...item.data()
                } as ICartItem

                return cart
              })

              setUser(prevUser => ({ ...prevUser, cart: cartItems }))
            }
          )
        } else {
          getAuth()
            .setPersistence(browserSessionPersistence)
            .then(() => {
              return signInAnonymously(getAuth())
            })
        }
      } catch (error) {
        console.log(error)
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false)
      }
    })

    const tokenUnsubscriber = getAuth().onIdTokenChanged(async res => {
      try {
        const token = (await res?.getIdToken()) || ""
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

  const updateUser = (user: TUser) =>
    setUser(prevUser => ({ ...prevUser, ...user }))

  return (
    <UserContext.Provider value={{ user, token, updateUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)

export default UserContextComp
