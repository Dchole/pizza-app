import useSWR from "swr"

export interface IUser {
  _id: string
  firstName: string
  lastName: string
  phoneNumber?: string
  email?: string
  imageUrl?: string
  isLoggedIn: boolean
  authMethod: "google" | "local"
  cart: {
    id: string
    quantity: number
  }[]
}

const useUser = () => {
  const { data: user, ...rest } = useSWR<Partial<IUser>>("/api/user")
  return { user, ...rest }
}

export default useUser
