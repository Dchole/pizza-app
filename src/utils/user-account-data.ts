import { TUser } from "@/components/UserContext"
import { keyToText } from "./key-to-text"

export const userAccountData = (user: TUser) => {
  const account = {
    displayName: user?.displayName || "",
    phoneNumber: user?.phoneNumber || "",
    location: user?.location || "",
    address: user?.address || ""
  }

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
