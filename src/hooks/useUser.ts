import { Enum_Pizzas_Size } from "@/graphql/generated"
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
  cart?: {
    id: string
    size: Enum_Pizzas_Size
    quantity: number
  }[]
  transactions?: string[]
}

const useUser = () => {
  const { data: user, ...rest } = useSWR<Partial<IUser>>("/api/user")
  return { user, ...rest }
}

export default useUser
