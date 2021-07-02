import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import { useStyles } from "./useStyles"

const Reviews = () => {
  const classes = useStyles()

  return (
    <section id="reviews" className={classes.root}>
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
        <div>
          <IconButton aria-label="previous review">
            <ArrowBackIcon />
          </IconButton>
          <IconButton aria-label="next review">
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </div>
    </section>
  )
}

export default Reviews
