import { useMemo, useState } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import EditIcon from "@material-ui/icons/Edit"
import IconButton from "@material-ui/core/IconButton"
import PageBackdrop from "@/components/PageBackdrop"
import Typography from "@material-ui/core/Typography"
import useUser from "@/hooks/useUser"
import { userAccountData } from "@/utils/user-account-data"
import { slugify } from "@/utils/slugify"

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      "& section": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: theme.spacing(3, 0)
      },

      "& .MuiTypography-h6": {
        fontFamily: theme.typography.h1.fontFamily
      }
    }
  })
)

const Profile = () => {
  const classes = useStyles()
  const { user } = useUser()
  const [edit, setEdit] = useState("")
  const userData = useMemo(() => user && userAccountData(user), [user])

  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { key } = event.currentTarget.dataset
    setEdit(key || "")
  }

  return (
    <PageBackdrop>
      <Container component="main" maxWidth="sm" className={classes.root}>
        <Typography variant="h2">Account Details</Typography>
        {userData?.map(({ key, value, caption }) => (
          <section id={slugify(key)} key={key}>
            <div>
              <Typography color="textSecondary" variant="caption">
                {caption}
              </Typography>
              <Typography component="h3" variant="h6">
                {value}
              </Typography>
            </div>
            <IconButton
              data-key={key}
              aria-label={`edit ${caption}`}
              onClick={handleEdit}
            >
              <EditIcon />
            </IconButton>
          </section>
        ))}
      </Container>
    </PageBackdrop>
  )
}

export default Profile
