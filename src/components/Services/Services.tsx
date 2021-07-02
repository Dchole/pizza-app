import Image from "next/image"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import { reasons } from "./reasons"
import { useStyles } from "./useStyles"

const Services = () => {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      <Typography variant="h2" align="center">
        Why choose our food
      </Typography>
      <Grid justify="center" wrap="nowrap" container>
        {reasons.map(({ title, icon, description }) => (
          <div key={title}>
            <Image src={icon} alt={title} width={66} height={94} />
            <Typography variant="h4" component="h3">
              {title}
            </Typography>
            <Typography color="textSecondary">{description}</Typography>
          </div>
        ))}
      </Grid>
    </section>
  )
}

export default Services
