import dynamic from "next/dynamic"
import { useMemo, useState } from "react"
import {
  createStyles,
  createTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles"
import CheckIcon from "@material-ui/icons/Check"
import CircularProgress from "@material-ui/core/CircularProgress"
import CloseIcon from "@material-ui/icons/Close"
import Container from "@material-ui/core/Container"
import EditIcon from "@material-ui/icons/Edit"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import Typography from "@material-ui/core/Typography"
import { userAccountData } from "@/utils/user-account-data"
import { slugify } from "@/utils/slugify"
import { green, red } from "@material-ui/core/colors"
import { useUser } from "@/components/UserContext"
import { doc, getFirestore, setDoc } from "@firebase/firestore"
import useScreenSize from "@/hooks/usScreenSize"
import useConfirmation from "@/hooks/useConfirmation"

const ConfirmationDialog = dynamic(
  () => import("@/components/ConfirmationDialog")
)

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      "& section": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: theme.spacing(3, 0),

        "& > div": {
          width: "100%"
        }
      },

      "& .MuiTypography-h6": {
        fontFamily: theme.typography.h1.fontFamily
      }
    },
    adornedEnd: {
      paddingRight: 0
    }
  })
)

const theme = createTheme({
  palette: {
    primary: {
      main: green[400]
    },
    secondary: {
      main: red[400]
    }
  }
})

const Profile = () => {
  const classes = useStyles()
  const desktop = useScreenSize()
  const { user } = useUser()
  const [edit, setEdit] = useState("")
  const [open, setOpen] = useState(false)
  const [updating, setUpdating] = useState(false)
  const { sendCode, confirmCode, handleResend } = useConfirmation()
  const userData = useMemo(() => user && userAccountData(user), [user])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { key } = event.currentTarget.dataset
    setEdit(key || "")
  }

  const saveEdit = async () => {
    const { value } = document.querySelector<HTMLInputElement>(
      `#${edit}-input`
    )!

    try {
      setUpdating(true)

      await setDoc(doc(getFirestore(), `users/${user?.uid}`), {
        [edit]: value
      })

      setEdit("")
      if (edit === "phoneNumber") {
        await sendCode(value)
        handleOpen()
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    } finally {
      setUpdating(false)
    }
  }

  const cancelEdit = () => setEdit("")

  return (
    <main id="account-profile">
      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h2">Account Details</Typography>
        {userData?.map(({ key, value, caption, placeholder }) => (
          <section id={slugify(key)} key={key}>
            <div>
              <Typography
                id={`${key}-id`}
                color="textSecondary"
                variant="caption"
              >
                {caption}
              </Typography>
              {edit === key ? (
                <OutlinedInput
                  id={`${key}-input`}
                  defaultValue={value}
                  placeholder={placeholder}
                  disabled={updating}
                  fullWidth
                  classes={{
                    adornedEnd:
                      updating || desktop ? undefined : classes.adornedEnd
                  }}
                  inputProps={{
                    "aria-labelledby": `${key}-id`,
                    "aria-describedby": `${key}-progress`,
                    "aria-busy": updating,
                    autoComplete: false
                  }}
                  endAdornment={
                    updating ? (
                      <InputAdornment position="end">
                        <CircularProgress id={`${key}-progress`} size={20} />
                      </InputAdornment>
                    ) : (
                      <ThemeProvider
                        theme={appTheme => ({ ...appTheme, ...theme })}
                      >
                        <InputAdornment position="end">
                          <IconButton color="primary" onClick={saveEdit}>
                            <CheckIcon />
                          </IconButton>
                          <IconButton color="secondary" onClick={cancelEdit}>
                            <CloseIcon />
                          </IconButton>
                        </InputAdornment>
                      </ThemeProvider>
                    )
                  }
                />
              ) : (
                <Typography component="p" variant="h6">
                  {value || "Unknown"}
                </Typography>
              )}
            </div>
            {edit !== key && (
              <IconButton
                data-key={key}
                aria-label={`edit ${caption}`}
                onClick={handleEdit}
              >
                <EditIcon />
              </IconButton>
            )}
          </section>
        ))}
      </Container>
      <div id="checkout"></div>
      <ConfirmationDialog
        open={open}
        handleClose={handleClose}
        title="Enter confirmation code to verify phone number"
        confirmCode={confirmCode}
        handleResend={handleResend}
      />
    </main>
  )
}

export default Profile
