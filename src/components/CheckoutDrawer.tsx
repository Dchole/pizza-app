import Avatar from "@material-ui/core/Avatar"
import Drawer from "@material-ui/core/Drawer"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemAvatar from "@material-ui/core/ListItemAvatar"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { useCart } from "./CartContext"

const useStyles = makeStyles(theme =>
  createStyles({
    heading: {
      margin: theme.spacing(1.5, 1)
    },
    listItem: {
      marginBottom: 16
    },
    avatar: {
      borderRadius: 4,
      width: 50,
      height: 50
    },
    listText: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",

      "& .MuiTypography-root": {
        "&:first-child": {
          fontSize: theme.typography.h4.fontSize
        },

        "&:last-child": {
          fontSize: theme.typography.h5.fontSize
        }
      }
    }
  })
)

interface ICheckoutDrawerProps {
  open: boolean
  handleClose: () => void
}

const CheckoutDrawer: React.FC<ICheckoutDrawerProps> = ({
  open,
  handleClose
}) => {
  const classes = useStyles()
  const { cart, getItemPrice, getItemQuantity } = useCart()

  return (
    <Drawer open={open} anchor="bottom" onClose={handleClose}>
      <Typography variant="h3" component="h2" className={classes.heading}>
        Cart Item List
      </Typography>
      <List>
        {cart.map(item => (
          <ListItem key={item.id} className={classes.listItem}>
            <ListItemAvatar>
              <Avatar
                alt={item.name}
                src={item.image.formats.thumbnail.url}
                className={classes.avatar}
              />
            </ListItemAvatar>
            <div className={classes.listText}>
              <Typography>{item.name}</Typography>
              <Typography>
                <span>
                  {getItemQuantity(item.id)} <small>pcs</small>
                </span>
                &nbsp;&mdash;&nbsp;
                <span>
                  <small>₵</small>
                  {getItemPrice(item.id)}
                </span>
              </Typography>
            </div>
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}

export default CheckoutDrawer
