import { Fragment } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import useGroupLinks from "@/hooks/useGroupLinks"
import Link from "../Link"

const useStyles = makeStyles(
  createStyles({
    link: {
      margin: "auto",
      fontSize: "1.6rem",
      textDecoration: "none"
    }
  })
)

const SideNav = () => {
  const linksGroups = useGroupLinks()
  const classes = useStyles()

  return (
    <>
      <aside>
        {linksGroups.map((links, index) => (
          <Fragment key={index}>
            <List>
              {links.map(({ path, label }, index) => (
                <ListItem key={index}>
                  <Link
                    href={path}
                    className={classes.link}
                    color="textPrimary"
                    align="center"
                  >
                    {label}
                  </Link>
                </ListItem>
              ))}
            </List>
          </Fragment>
        ))}
      </aside>
    </>
  )
}

export default SideNav
