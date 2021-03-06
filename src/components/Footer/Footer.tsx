import clsx from "clsx"
import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputAdornment from "@material-ui/core/InputAdornment"
import Button from "@material-ui/core/Button"
import Link from "@material-ui/core/Link"
import Fab from "@material-ui/core/Fab"
import ArrowUpWardIcon from "@material-ui/icons/ArrowUpward"
import ButtonLink from "../ButtonLink"
import { contacts } from "./contacts"
import { useStyles } from "./useStyles"
import { fetcher } from "@/utils/fetcher"
import { useRef } from "react"
import useScreenSize from "@/hooks/usScreenSize"

const Footer = () => {
  const classes = useStyles()
  const inputRef = useRef<HTMLInputElement>(null)
  const desktop = useScreenSize("lg")

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await fetcher("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: inputRef.current?.value })
      })
    } catch (error: any) {
      console.log(error.message)
    } finally {
      inputRef.current!.value = ""
    }
  }

  return (
    <footer className={classes.root}>
      <div>
        <div className={clsx(classes.centerAlign, classes.hiring)}>
          <Typography
            variant="h4"
            component="h3"
            align={desktop ? "left" : "center"}
          >
            We&apos;re hiring
          </Typography>
          <Typography variant="body2" align={desktop ? "left" : "center"}>
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
        <div className={clsx(classes.centerAlign, classes.contacts)}>
          <Typography
            variant="h4"
            component="h3"
            align={desktop ? "left" : "center"}
          >
            Contact Us
          </Typography>
          <List id="contacts" disablePadding dense>
            {contacts
              .slice(0, contacts.length - 1)
              .map(({ contact, icon, href }, index) => (
                <ListItem disableGutters key={index}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>
                    <Link href={href} color="inherit">
                      {contact}
                    </Link>
                  </ListItemText>
                </ListItem>
              ))}
            <ListItem disableGutters>
              <ListItemIcon>{contacts[contacts.length - 1].icon}</ListItemIcon>
              <ListItemText>
                {contacts[contacts.length - 1].contact}
              </ListItemText>
            </ListItem>
          </List>
        </div>
        <div className={clsx(classes.centerAlign, classes.newsletter)}>
          <Typography
            variant="h4"
            component="h3"
            align={desktop ? "left" : "center"}
          >
            Subscribe to our Newsletter
          </Typography>
          <Typography variant="body2" align={desktop ? "left" : "center"}>
            Get up to date with our services. Get notified with updates to our
            store and services
          </Typography>
          <form id="newsletter" onSubmit={handleSubscribe}>
            <OutlinedInput
              id="subscribe-input"
              name="email"
              type="email"
              placeholder="example@gmail.com"
              margin="dense"
              classes={{
                adornedEnd: classes.adornedEnd,
                inputMarginDense: classes.inputMarginDense
              }}
              endAdornment={
                <InputAdornment position="end">
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    disableElevation
                  >
                    Subscribe
                  </Button>
                </InputAdornment>
              }
              inputRef={inputRef}
              inputProps={{
                "aria-label": "Subscribe to newsletter"
              }}
              fullWidth
            />
          </form>
        </div>
      </div>
      <div className={classes.base}>
        <Typography color="textSecondary" align="center">
          &copy; Copyright by Moshood Pizza, 2021. All Rights reserved
        </Typography>
      </div>
      <Fab
        className={classes.fab}
        href="#top"
        title="scroll to top"
        aria-label="scroll to top"
        role={undefined}
      >
        <ArrowUpWardIcon />
      </Fab>
    </footer>
  )
}

export default Footer
