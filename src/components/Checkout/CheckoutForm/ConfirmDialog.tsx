import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import Slide from "@material-ui/core/Slide"
import Confirm from "./Confirm"
import { Form, Formik } from "formik"
import { forwardRef } from "react"
import { TransitionProps } from "@material-ui/core/transitions"
import { useConfirm } from "../Context"

interface IProps {
  open: boolean
  handleClose: () => void
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ConfirmDialog: React.FC<IProps> = ({ open, handleClose }) => {
  const { handleComplete } = useConfirm()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-describedby="dialog-title"
      fullScreen
    >
      <DialogTitle id="dialog-title">
        Enter confirmation code to complete checkout
      </DialogTitle>
      <DialogContent>
        <Formik initialValues={{ code: "" }} onSubmit={handleComplete}>
          {({ isSubmitting }) => (
            <Form>
              <Confirm />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting}
              >
                Confirm
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
