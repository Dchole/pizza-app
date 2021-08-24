import { Field } from "formik"
import { TextField } from "formik-material-ui"

const PersonalDetails = () => {
  return (
    <>
      <Field
        component={TextField}
        id="account-name"
        name="displayName"
        label="Full Name"
        variant="outlined"
        margin="normal"
        autoComplete="name"
        autoCapitalize="word"
        aria-required
        autoFocus
        fullWidth
      />
      <Field
        component={TextField}
        id="phone-number"
        name="phoneNumber"
        type="tel"
        label="Phone Number"
        variant="outlined"
        margin="normal"
        placeholder="0240000000"
        autoComplete="tel"
        aria-required
        fullWidth
      />
      <Field
        component={TextField}
        id="location"
        name="location"
        label="Location"
        variant="outlined"
        margin="normal"
        placeholder="Takoradi"
        autoComplete="address-level2"
        autoCapitalize="word"
        aria-required
        fullWidth
      />
      <Field
        component={TextField}
        id="address"
        name="address"
        label="Home Address"
        variant="outlined"
        margin="normal"
        placeholder="Midwife, Asomdwee Street"
        autoComplete="street-address"
        aria-required
        fullWidth
      />
    </>
  )
}

export default PersonalDetails
