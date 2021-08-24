import { TextField } from "@material-ui/core"
import { TFormikProps } from "./Form"

interface IProps {
  formik: TFormikProps
}

const PersonalDetails: React.FC<IProps> = ({ formik }) => {
  const { getFieldProps, errors, touched } = formik

  return (
    <form>
      <TextField
        {...getFieldProps("displayName")}
        error={errors.displayName && touched.displayName}
        helperText={errors.displayName}
        id="account-name"
        label="Full Name"
        variant="outlined"
        margin="normal"
        autoComplete="name"
        aria-required
        autoFocus
        fullWidth
      />
      <TextField
        {...getFieldProps("phoneNumber")}
        error={errors.phoneNumber && touched.phoneNumber}
        helperText={errors.phoneNumber}
        id="phone-number"
        label="Phone Number"
        variant="outlined"
        margin="normal"
        placeholder="0240000000"
        autoComplete="tel"
        aria-required
        fullWidth
      />
      <TextField
        {...getFieldProps("location")}
        error={errors.location && touched.location}
        helperText={errors.location}
        id="location"
        label="City/Town"
        variant="outlined"
        margin="normal"
        placeholder="Takoradi"
        autoComplete="address-level2"
        aria-required
        fullWidth
      />
      <TextField
        {...getFieldProps("address")}
        error={errors.address && touched.address}
        helperText={errors.address}
        id="address"
        label="Home Address/Street Name"
        variant="outlined"
        margin="normal"
        placeholder="Midwife, Asomdwee Street"
        autoComplete="street-address"
        aria-required
        fullWidth
      />
    </form>
  )
}

export default PersonalDetails
