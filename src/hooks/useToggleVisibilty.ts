import { useState } from "react"

const useToggleVisibility = () => {
  const [showPassword, setShowPassword] = useState(false)

  const handleToggle = () => setShowPassword(!showPassword)

  return { showPassword, handleToggle }
}

export default useToggleVisibility
