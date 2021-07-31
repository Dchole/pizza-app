import { useState, useEffect, createContext, useContext } from "react"
import firebase from "@/lib/firebase"
import { useRef } from "react"

type TUser = Partial<firebase.User> | null

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
    // Listen authenticated user
    const userUnsubscriber = firebase.auth().onAuthStateChanged(async user => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = user
          console.log(user)
          // You could also look for the user doc in your Firestore (if you have one):
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          setUser({ uid, displayName, email, photoURL })
        } else setUser(null)
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingUser(false)
      }
    })

    const tokenUnsubscriber = firebase.auth().onIdTokenChanged(async res => {
      try {
        const token = await res.getIdToken()
        setToken(token)
      } catch (error) {
        console.log(error)
      }
    })

    // Unsubscribe auth listener on unmount
    return () => {
      userUnsubscriber()
      tokenUnsubscriber()
    }
  }, [])

  const updateUser = (user: firebase.User) => setUser(user)

  return (
    <UserContext.Provider value={{ user, token, updateUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  )
}

// Custom hook that shorthands the context!
export const useUser = () => useContext(UserContext)
