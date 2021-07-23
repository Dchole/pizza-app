import { IUser } from "@/hooks/useUser"
import { keyToText } from "./key-to-text"

export const userAccountData = (user: IUser) => {
  const { _id, isLoggedIn, authMethod, cart, transactions, ...account } = user

  return Object.entries(account).map(([key, value]) => ({
    key,
    value,
    caption:
      key === "location"
        ? "City/Town"
        : key === "address"
        ? "Home Address"
        : keyToText(key),
    placeholder:
      key === "location"
        ? "Ex. Takoradi"
        : key === "address"
        ? "Ex. Shama, Beach Road"
        : undefined
  }))
}
