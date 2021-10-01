import dynamic from "next/dynamic"
import Avatar from "@material-ui/core/Avatar"
import AvatarGroup from "@material-ui/lab/AvatarGroup"
import Typography from "@material-ui/core/Typography"
import MobileForm from "@/components/Checkout/CheckoutForm/MobileForm"
import { useState } from "react"
import { useCart } from "@/components/CartContext"
import { useMobileStyles } from "./styles/useMobileStyles"

const CheckoutDrawer = dynamic(() => import("@/components/CheckoutDrawer"))

const MobileCheckout = () => {
  const classes = useMobileStyles()
  const { cart, totalAmount } = useCart()
  const [openList, setOpenList] = useState(false)

  const handleOpen = () => setOpenList(true)
  const handleClose = () => setOpenList(false)

  return (
    <>
      <main>
        <div className={classes.header}>
          <AvatarGroup max={3} onClick={handleOpen}>
            {cart.map(item => (
              <Avatar
                variant="rounded"
                key={item.id}
                alt={item.name}
                src={item.image?.formats.thumbnail.url}
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
