import Image from "next/image"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import BagIcon from "@material-ui/icons/LocalMall"
import cover from "../../../public/cover.webp"
import { useStyles } from "./useStyles"

const Hero = () => {
  const classes = useStyles()

  return (
    <Container component="section">
      <Image
        src={cover}
        alt=""
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        className={classes.cover}
        priority
        aria-hidden
      />
      <Typography variant="h1">
        Brighten your day with a delicious pizza
      </Typography>
      <div className={classes.buttons}>
        <Button variant="contained" color="primary" endIcon={<BagIcon />}>
          Make an order
        </Button>
        <Button variant="outlined" color="primary">
          Contact us
        </Button>
      </div>
    </Container>
  )
}

export default Hero
