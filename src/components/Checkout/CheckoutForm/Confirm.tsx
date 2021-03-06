import { useRef } from "react"
import { Field } from "formik"
import { TextField } from "formik-material-ui"
import { useConfirm } from "../Context"
import Button from "@material-ui/core/Button"
import InputAdornment from "@material-ui/core/InputAdornment"

const Confirm = () => {
  const { handleResend } = useConfirm()
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
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
              <Button color="secondary" onClick={handleResend}>
                Resend Code
              </Button>
            </InputAdornment>
          )
        }}
      />
    </>
  )
}

export default Confirm
