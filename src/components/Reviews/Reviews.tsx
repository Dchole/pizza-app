import Typography from "@material-ui/core/Typography"
import { useStyles } from "./useStyles"

const Reviews = () => {
  const classes = useStyles()

  return (
    <section className={classes.root}>
      <Typography variant="h2" align="center">
        Customers say
      </Typography>
      <div>
        <Typography align="center" color="textSecondary">
          <em>
            &ldquo;Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum
            quos doloribus, id sed in voluptatibus unde, eligendi dolorum
            aperiam aut minus accusamus assumenda! Dignissimos sint odio unde
            ipsum ipsam. Rem.&rdquo;
          </em>
        </Typography>
        <Typography align="right">
          &mdash;&nbsp;
          <span>John Doe</span>
        </Typography>
      </div>
    </section>
  )
}

export default Reviews
