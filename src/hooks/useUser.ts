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
}

const useUser = () => {
  const { data: user, mutate } = useSWR<IUser>("/api/user")
  return { user, mutate }
}

export default useUser
