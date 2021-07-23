import { useState } from "react"
import { useRouter } from "next/router"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import PersonIcon from "@material-ui/icons/Person"
import HistoryIcon from "@material-ui/icons/History"
import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import Link from "./Link"
import useScreenSize from "@/hooks/usScreenSize"

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: "fit-content"
    },
    tabs: {
      marginBottom: 24
    }
  })
)

const ToggleNav = () => {
  const classes = useStyles()
  const { pathname } = useRouter()
  const [value, setValue] = useState(pathname === "/profile" ? 0 : 1)
  const desktop = useScreenSize()

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container maxWidth="xs" className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="Toggle between account profile and transaction history"
        className={classes.tabs}
      >
        <Tab
          component={Link}
          href="/profile"
          label={desktop ? "Account Profile" : "Account"}
          icon={desktop ? <PersonIcon /> : undefined}
          aria-controls="account-profile"
          naked
        />
        <Tab
          component={Link}
          href="/history"
          label={desktop ? "Transaction History" : "Transactions"}
          icon={desktop ? <HistoryIcon /> : undefined}
          aria-controls="transaction-history"
          naked
        />
      </Tabs>
    </Container>
  )
}

export default ToggleNav
