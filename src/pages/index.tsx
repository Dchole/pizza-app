import Image from "next/image"
import { makeStyles, createStyles } from "@material-ui/core/styles"
import Header from "@/components/Header"
import cover from "../../public/cover.webp"

const useStyles = makeStyles(theme =>
  createStyles({
    cover: {
      transform: "scale(-1)"
    }
  })
)

export default function Home() {
  const classes = useStyles()

  return (
    <div>
      <Header />
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
    </div>
  )
}
