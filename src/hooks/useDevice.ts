import { useEffect, useState } from "react"

type TDevice = "desktop" | "mobile"

const useDevice = () => {
  const [device, setDevice] = useState<TDevice>("mobile")

  useEffect(() => {
    const { userAgent } = navigator
    setDevice(userAgent.toLowerCase().includes("mobi") ? "mobile" : "desktop")
  }, [])

  return device
}

export default useDevice
