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
        {userData?.map(({ key, value, heading }) => (
          <section id={slugify(key)} key={key}>
            <div>
              <Typography component="h3" variant="h6">
                {heading}
              </Typography>
              <Typography color="textSecondary">{value}</Typography>
            </div>
            <IconButton
              data-key={key}
              aria-label={`edit ${heading}`}
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
