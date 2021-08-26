import dynamic from "next/dynamic"
import Head from "next/head"
import Avatar from "@material-ui/core/Avatar"
import AvatarGroup from "@material-ui/lab/AvatarGroup"
import Typography from "@material-ui/core/Typography"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import { useState } from "react"
import { useCart } from "@/components/CartContext"
import MobileForm from "@/components/CheckoutForm/MobileForm"

const CheckoutDrawer = dynamic(() => import("@/components/CheckoutDrawer"))

const useStyles = makeStyles(theme =>
  createStyles({
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 12
    },
    price: {
      fontSize: theme.typography.h3.fontSize,

      "& small": {
        color: theme.palette.text.secondary
      }
    }
  })
)

const MobileCheckout = () => {
  const classes = useStyles()
  const { cart, totalAmount, totalQuantity } = useCart()
  const [openList, setOpenList] = useState(false)

  const handleOpen = () => setOpenList(true)
  const handleClose = () => setOpenList(false)

  return (
    <>
      <Head>
        <title>
          Checkout {totalQuantity} items for {totalAmount}
        </title>
      </Head>

      <main>
        <div className={classes.header}>
          <AvatarGroup max={3} onClick={handleOpen}>
            {cart.map(item => (
              <Avatar
                key={item.id}
                variant="rounded"
                alt={item.name}
                src={item.image.formats?.thumbnail.url}
                className={classes.avatar}
              />
            ))}
          </AvatarGroup>
          <Typography className={classes.price}>
            <small>₵</small>
            {totalAmount}
          </Typography>
        </div>
        <MobileForm />
      </main>
      <CheckoutDrawer open={openList} handleClose={handleClose} />
    </>
  )
}

export default MobileCheckout
