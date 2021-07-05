import useSWR from "swr"

const useUser = () => {
  const { data: user, mutate } = useSWR("/api/user")

  return { user, mutate }
}

export default useUser
