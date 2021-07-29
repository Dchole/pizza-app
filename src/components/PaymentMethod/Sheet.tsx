import dynamic from "next/dynamic"
import ButtonBase from "@material-ui/core/ButtonBase"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { useDialogStyles } from "./useDialogStyles"
import { useSheetStyles } from "./useSheetStyles"
import useToastEvents from "./useToastEvents"

const Toast = dynamic(() => import("../Toast"))

interface IProps {
  open: boolean
  handleClose: () => void
}

const Sheet: React.FC<IProps> = ({ open, handleClose }) => {
  const { button } = useDialogStyles()
  const classes = useSheetStyles()
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
      <Drawer open={open} anchor="bottom" onClose={onClose}>
        <Typography variant="h4" className={classes.title}>
          Select Payment Method
        </Typography>
        <Divider />
        <Grid container className={classes.spacing}>
          <ButtonBase className={button} onClick={handleCash}>
            <Typography variant="h6">Pay in Cash</Typography>
            <Typography variant="body2" color="textSecondary">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit,
              asperiores!
            </Typography>
          </ButtonBase>
          <ButtonBase className={button} onClick={handleMoMo}>
            <Typography variant="h6">Pay with MoMo</Typography>
            <Typography variant="body2" color="textSecondary">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit,
              asperiores!
            </Typography>
          </ButtonBase>
        </Grid>
        {severity === "error" && (
          <Toast
            open={openToast}
            severity={severity}
            message={message}
            handleClose={handleCloseToast}
          />
        )}
      </Drawer>
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

export default Sheet
