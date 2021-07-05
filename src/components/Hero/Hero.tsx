import Image from "next/image"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import BagIcon from "@material-ui/icons/LocalMall"
import useScreenSize from "@/hooks/usScreenSize"
import ButtonLink from "../ButtonLink"
import cover from "../../../public/cover.webp"
import { useStyles } from "./useStyles"

const Hero = () => {
  const classes = useStyles()
  const mobile = useScreenSize("sm")
  const tablet = useScreenSize("md")

  return (
    <Container
      id="hero"
      component="section"
      maxWidth="xl"
      className={classes.root}
      disableGutters={mobile}
    >
      <Image
        src={cover}
        alt=""
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        className={classes.cover}
        priority
        aria-hidden // Hiding from screen readers because it's just a background Image; no need to announce
      />
      <Typography variant="h1" align={mobile ? "center" : "left"}>
        Brighten your day with a delicious pizza
      </Typography>
      <div className={classes.buttons}>
        <ButtonLink
          href="/store"
          variant="contained"
          color="primary"
          endIcon={<BagIcon />}
        >
          Make an order
        </ButtonLink>
        <ButtonLink href="#contact" variant="outlined" color="primary">
          Contact us
        </ButtonLink>
      </div>
    </Container>
  )
}

export default Hero
