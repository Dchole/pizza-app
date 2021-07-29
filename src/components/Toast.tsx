import Snackbar from "@material-ui/core/Snackbar"
import Alert, { Color } from "@material-ui/lab/Alert"

interface IToastProps {
  open: boolean
  severity: Color
  message: string
  handleClose: () => void
}

const Toast: React.FC<IToastProps> = ({
  open,
  severity,
  message,
  handleClose
}) => {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  )
}

export default Toast
