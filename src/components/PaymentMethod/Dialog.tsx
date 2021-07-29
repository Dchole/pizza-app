import dynamic from "next/dynamic"
import ButtonBase from "@material-ui/core/ButtonBase"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import Typography from "@material-ui/core/Typography"
import { useDialogStyles } from "./useDialogStyles"
import useToastEvents from "./useToastEvents"

const Toast = dynamic(() => import("../Toast"))

interface IProps {
  open: boolean
  handleClose: () => void
}

const PaymentMethodDialog: React.FC<IProps> = ({ open, handleClose }) => {
  const classes = useDialogStyles()
  const {
    openToast,
    severity,
    message,
    handleMoMo,
    handleCash,
    onClose,
    handleCloseToast
  } = useToastEvents(handleClose)

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle className={classes.title}>
          Select Payment Method
        </DialogTitle>
        <DialogContent className={classes.content}>
          <ButtonBase className={classes.button} onClick={handleCash}>
            <Typography variant="h6" component="h3">
              Pay In Cash
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              perspiciatis.
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.button} onClick={handleMoMo}>
            <Typography variant="h6" component="h3">
              Pay With MoMo
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
              perspiciatis.
            </Typography>
          </ButtonBase>
        </DialogContent>
        {severity === "error" && (
          <Toast
            open={openToast}
            severity={severity}
            message={message}
            handleClose={handleCloseToast}
          />
        )}
      </Dialog>
      {severity === "success" && (
        <Toast
          open={openToast}
          severity={severity}
          message={message}
          handleClose={handleCloseToast}
        />
      )}
    </>
  )
}

export default PaymentMethodDialog
