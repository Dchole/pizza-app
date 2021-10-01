import { forwardRef, useRef } from "react"
import { Field, Form, Formik } from "formik"
import { TextField } from "formik-material-ui"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import InputAdornment from "@material-ui/core/InputAdornment"
import Slide from "@material-ui/core/Slide"
import { TransitionProps } from "@material-ui/core/transitions"
import { useConfirm } from "@/components/Checkout/Context"
import useScreenSize from "@/hooks/usScreenSize"

interface IProps {
  open: boolean
  title: string
  handleClose: () => void
  handleResend?: () => Promise<void>
  confirmCode: (code: string) => Promise<void>
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const ConfirmationDialog: React.FC<IProps> = ({
  open,
  title,
  confirmCode,
  handleClose,
  handleResend
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const desktop = useScreenSize()
  const { handleResend: resend, handleComplete } = useConfirm()

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-describedby="dialog-title"
      fullScreen={!desktop}
    >
      <DialogTitle id="dialog-title">{title}</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ code: "" }}
          onSubmit={(values, actions) => {
            if (confirmCode) {
              confirmCode(values.code).then(handleClose)
            } else {
              handleComplete(values, actions)
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                inputRef={inputRef}
                id="confirmation-code-input"
                component={TextField}
                name="code"
                margin="normal"
                variant="outlined"
                label="Confirmation Code"
                autoComplete="off"
                maxLength={6}
                minLength={6}
                aria-required
                fullWidth
                autoFocus
                inputProps={{ inputMode: "numeric" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        color="secondary"
                        onClick={handleResend || resend}
                      >
                        Resend Code
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={isSubmitting}
                disableElevation={isSubmitting}
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

export default ConfirmationDialog
