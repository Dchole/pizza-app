import Typography from "@material-ui/core/Typography"
import { useStyles } from "./useStyles"

const Brief = () => {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      <div>
        <Typography variant="h2" align="center">
          Our delivery service
        </Typography>
        <Typography variant="h6" component="p" align="center">
          No need to walk to walk to a restaurant to place an order. Just order
          with some few clicks or contact us to place an order. Your pizza will
          be delivered right on your doorstep.
        </Typography>
        <br />
        <Typography variant="h6" component="p" align="center">
          Our service is available at <strong>Sekondi-Takoradi</strong>. We are
          constantly growing our network so if you’re outside our location hold
          on tight, we’ll reach your location soon.
        </Typography>
      </div>
    </section>
  )
}

export default Brief
