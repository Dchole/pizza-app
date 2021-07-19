import Image from "next/image"
import {
  createMuiTheme,
  ThemeProvider,
  useTheme
} from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import BagIcon from "@material-ui/icons/LocalMall"
import useScreenSize from "@/hooks/usScreenSize"
import ButtonLink from "../ButtonLink"
import cover from "../../../public/cover.webp"
import mobileCover from "../../../public/mobile-cover.webp"
import { useStyles } from "./useStyles"
import { useMemo } from "react"

const Hero = () => {
  const classes = useStyles()
  const desktop = useScreenSize("md")
  const theme = useTheme()

  const buttonTheme = useMemo(
    () =>
      createMuiTheme({
        ...theme,
        palette: {
          primary: {
            main: desktop ? theme.palette.primary.main : "#fff"
          }
        }
      }),
    [theme, desktop]
  )

  return (
    <Container
      id="hero"
      component="section"
      maxWidth="xl"
      className={classes.root}
      disableGutters={!desktop}
    >
      {desktop ? (
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
      ) : (
        <Image
          src={mobileCover}
          alt=""
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          className={classes.cover}
          priority
          aria-hidden // Hiding from screen readers because it's just a background Image; no need to announce
        />
      )}
      <Typography variant="h1" align={desktop ? "left" : "center"}>
        Brighten your day with a delicious pizza
      </Typography>
      <ThemeProvider theme={buttonTheme}>
        <div className={classes.buttons}>
          <ButtonLink
            href="/store"
            variant="contained"
            color="primary"
            endIcon={<BagIcon />}
            disableElevation={!desktop}
          >
            Make an order
          </ButtonLink>
          {desktop && (
            <ButtonLink href="#contact" variant="outlined" color="primary">
              Contact us
            </ButtonLink>
          )}
        </div>
      </ThemeProvider>
    </Container>
  )
}

export default Hero
