import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputAdornment from "@material-ui/core/InputAdornment"
import Button from "@material-ui/core/Button"
import ButtonLink from "../ButtonLink"
import { contacts } from "./contacts"
import { useStyles } from "./useStyles"

const Footer = () => {
  const classes = useStyles()

  return (
    <footer className={classes.root}>
      <div>
        <div className={classes.hiring}>
          <Typography variant="h4" component="h3">
            We&apos;re hiring
          </Typography>
          <Typography variant="body2">
            We are looking for delivery men to expand our network. Learn more or
            apply now
          </Typography>
          <ButtonLink
            href="/career"
            variant="contained"
            color="primary"
            disableElevation
          >
            Apply now
          </ButtonLink>
        </div>
        <div className={classes.contacts}>
          <Typography variant="h4" component="h3">
            Contact Us
          </Typography>
          <List disablePadding dense>
            {contacts.map(({ contact, icon }, index) => (
              <ListItem disableGutters key={index}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{contact}</ListItemText>
              </ListItem>
            ))}
          </List>
        </div>
        <div className={classes.newsletter}>
          <Typography variant="h4" component="h3">
            Subscribe to our Newsletter
          </Typography>
          <Typography variant="body2">
            Get up to date with our services. Get notified with updates to our
            store and services
          </Typography>
          <OutlinedInput
            id="subscribe-input"
            name="subscribe"
            type="email"
            placeholder="example@gmail.com"
            margin="dense"
            classes={{
              root: classes.input,
              adornedEnd: classes.adornedEnd,
              inputMarginDense: classes.inputMarginDense
            }}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.inputButton}
                  disableElevation
                >
                  Subscribe
                </Button>
              </InputAdornment>
            }
          />
        </div>
      </div>
      <div className={classes.base}>
        <Typography color="textSecondary">
          &copy; Copyright by [Company Name], 2021. All Rights reserved
        </Typography>
      </div>
    </footer>
  )
}

export default Footer
