import { Color } from "@material-ui/lab/Alert"
import { useState } from "react"

const useToastEvents = (handleClose: () => void) => {
  const [openToast, setOpenToast] = useState(false)
  const [severity, setSeverity] = useState<Extract<
    Color,
    "success" | "error"
  > | null>(null)
  const [message, setMessage] = useState("")

  const handleMoMo = () => {
    setOpenToast(true)
    setSeverity("error")
    setMessage("MoMo option isn't available yet")
  }

  const handleCash = () => {
    setOpenToast(true)
    setSeverity("success")
    setMessage("Order taken in. You'll receive package soon")
    handleClose()
  }

  const onClose = () => {
    if (severity === "success") {
      handleCash()
    }

    handleClose()
  }

  const handleCloseToast = () => setOpenToast(false)

  return {
    openToast,
    severity,
    message,
    handleMoMo,
    handleCash,
    onClose,
    handleCloseToast
  }
}

export default useToastEvents
