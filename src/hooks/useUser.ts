import useSWR from "swr"
import { google } from "googleapis"

const useUser = () => {
  const { data: user, mutate } = useSWR("/api/user")

  const loginWithGoogle = () => {}

  return { user, mutate }
}

export default useUser
