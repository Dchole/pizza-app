import Image from "next/image"
import Avatar from "@material-ui/core/Avatar"
import Chip from "@material-ui/core/Chip"
import Container from "@material-ui/core/Container"
import Divider from "@material-ui/core/Divider"
import FormSteps from "./CheckoutForm/FormSteps"
import Typography from "@material-ui/core/Typography"
import { loader } from "@/utils/imageLoader"
import { GetPizzasQuery } from "@/graphql/generated"
import { useDesktopStyles } from "./styles/useDesktopStyles"
import { capitalize } from "@material-ui/core/utils"
import useScreenSize from "@/hooks/usScreenSize"
import AvatarGroup from "@material-ui/lab/AvatarGroup"
import { useMobileStyles } from "./styles/useMobileStyles"
import { useMemo } from "react"

interface IProps {
  sizes: {
    small?: number
    medium?: number
    large?: number
  }
  pizza: GetPizzasQuery["pizzas"][0]
  price: number
}

const SingleItemDesktop: React.FC<IProps> = ({ sizes, pizza, price }) => {
  const classes = useDesktopStyles()
  const tabletClasses = useMobileStyles()
  const desktop = useScreenSize("lg")

  const quantities = useMemo(() => {
    const res = Object.entries(sizes).map(([size, quantity]) =>
      quantity ? [size, quantity] : null
    )

    console.log(Object.fromEntries(res.filter(Boolean)))

    return Object.fromEntries(res.filter(Boolean))
  }, [sizes])

  return (
    <>
      {!desktop && (
        <div className={tabletClasses.header} style={{ maxWidth: "50%" }}>
          <div className="header-title">
            <AvatarGroup max={3}>
              <Avatar
                variant="rounded"
                key={pizza.id}
                alt={pizza.name}
                src={pizza.image.formats?.thumbnail.url}
                className={tabletClasses.avatar}
              />
            </AvatarGroup>
            <Typography variant="h6" component="p">
              {pizza.name}
            </Typography>
          </div>
          <Typography className={tabletClasses.price}>
            <small>₵</small>
            {price}
          </Typography>
        </div>
      )}
      <Container
        maxWidth={desktop ? "lg" : "md"}
        component="main"
        className={classes.root}
        disableGutters={desktop}
      >
        {desktop && (
          <>
            <div className={classes.item}>
              <div className={classes.imageWrapper}>
                <Image
                  loader={loader}
                  src={pizza.image.formats.medium.url}
                  alt={pizza.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className={classes.itemText}>
                <Typography variant="h5" component="p" align="center">
                  {pizza.name}
                </Typography>
                <Typography>
                  <Typography
                    variant="body2"
                    component="span"
                    color="textSecondary"
                  >
                    ₵
                  </Typography>{" "}
                  {price}
                </Typography>
              </div>
              <div className={classes.quantity}>
                {Object.entries(quantities).map(([size, quantity]) => (
                  <Chip
                    key={size}
                    label={capitalize(size)}
                    avatar={<Avatar>{quantity}</Avatar>}
                    title={`${quantity} ${size} ${
                      quantity === 1 ? "size" : "sizes"
                    }`}
                  />
                ))}
              </div>
            </div>
            <Divider orientation="vertical" className={classes.divider} light />
          </>
        )}
        <FormSteps />
      </Container>
    </>
  )
}

export default SingleItemDesktop
