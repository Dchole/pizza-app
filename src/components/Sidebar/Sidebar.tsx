import { Fragment } from "react"
import Drawer from "@material-ui/core/Drawer"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import Divider from "@material-ui/core/Divider"
import CloseIcon from "@material-ui/icons/Close"
import useGroupLinks from "@/hooks/useGroupLinks"
import Link from "../Link"
import { useStyles } from "./useStyles"

interface ISidebarProps {
  open: boolean
  handleClose: () => void
}

const Sidebar: React.FC<ISidebarProps> = ({ open, handleClose }) => {
  const classes = useStyles()
  const linksGroups = useGroupLinks()

  return (
    <Drawer
      open={open}
      onClose={handleClose}
      classes={{ paper: classes.paper }}
    >
      <div className={classes.close}>
        <IconButton onClick={handleClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </div>
      {linksGroups.map((links, index) => (
        <Fragment key={index}>
          {index !== 0 && <Divider />}
          <List className={classes.list}>
            {links.map(({ path, icon, label }, index) => (
              <ListItem
                key={index}
                component={Link}
                href={path}
                onClick={handleClose}
                role={undefined} // remove button role
                button
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>{label}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Fragment>
      ))}
    </Drawer>
  )
}

export default Sidebar
