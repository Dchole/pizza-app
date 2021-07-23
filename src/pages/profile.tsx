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
import PageBackdrop from "@/components/PageBackdrop"
import Typography from "@material-ui/core/Typography"
import useUser, { IUser } from "@/hooks/useUser"
import { userAccountData } from "@/utils/user-account-data"
import { slugify } from "@/utils/slugify"
import { green, red } from "@material-ui/core/colors"
import { fetcher } from "@/utils/fetcher"
import useScreenSize from "@/hooks/usScreenSize"

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
  const { user, mutate } = useUser()
  const [edit, setEdit] = useState("")
  const [updating, setUpdating] = useState(false)
  const userData = useMemo(() => user && userAccountData(user), [user])

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
      const updatedUser = await fetcher<IUser>("/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ [edit]: value })
      })

      mutate(updatedUser)
      setEdit("")
    } catch (error) {
      console.log(error.message)
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
    </main>
  )
}

export default Profile
