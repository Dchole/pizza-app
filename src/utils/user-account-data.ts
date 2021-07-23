import { IUser } from "@/hooks/useUser"
import { keyToText } from "./key-to-text"

export const userAccountData = (user: IUser) => {
  const { _id, isLoggedIn, authMethod, cart, transactions, ...account } = user

  return Object.entries(account).map(([key, value]) => ({
    key,
    value: value || "Unknown",
    heading: keyToText(key)
  }))
}
