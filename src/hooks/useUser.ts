import useSWR from "swr"

interface IUser {
  firstName: string
  lastName: string
  phoneNumber?: string
  email?: string
  imageUrl?: string
  isLoggedIn: boolean
}

const useUser = () => {
  const { data: user, mutate } = useSWR<IUser>("/api/user")
  return { user, mutate }
}

export default useUser
