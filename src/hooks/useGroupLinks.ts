import { sidebarLinks } from "@/components/Sidebar/links"
import { useRef } from "react"
import useUser from "./useUser"

export type TLink = typeof sidebarLinks

const useGroupLinks = () => {
  const linksGroups = useRef<TLink>([])
  const { user } = useUser()

  linksGroups.current = sidebarLinks.map((links, index) => {
    if (index === 0 && !user?.isLoggedIn) {
      return links.filter((_, index) => index > 1)
    }

    return links
  })

  return linksGroups.current
}

export default useGroupLinks
