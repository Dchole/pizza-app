import Typography from "@material-ui/core/Typography"
import IconButton from "@material-ui/core/IconButton"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"
import ArrowForwardIcon from "@material-ui/icons/ArrowForward"
import { useStyles } from "./useStyles"
import { GetReviewsQuery } from "@/graphql/generated"
import { useState } from "react"

interface IReviewsProps {
  reviews: NonNullable<NonNullable<GetReviewsQuery["reviews"]>[0]>[]
}

const offScreen = {
  transform: "translateX(100vw)",
  opacity: 0
}
const enteredScreen = {
  transform: "translateX(-50%)",
  opacity: 1
}
const exitedScreen = {
  transform: "translateX(-100vw)",
  opacity: 0
}

const Reviews: React.FC<IReviewsProps> = ({ reviews }) => {
  const classes = useStyles()
  const [currentReview, setCurrentReview] = useState(0)

  const handleNextReview = () =>
    currentReview < reviews.length - 1 && setCurrentReview(currentReview + 1)
  const handlePrevReview = () =>
    currentReview && setCurrentReview(currentReview - 1)

  return (
    <section id="reviews" className={classes.root}>
      <Typography variant="h2" align="center">
        Customers say
      </Typography>
      <div>
        <div className={classes.reviews}>
          {reviews.map(({ customer_name, review }, index) => (
            <div
              key={review}
              style={
                index === currentReview
                  ? enteredScreen
                  : index < currentReview
                  ? exitedScreen
                  : offScreen
              }
            >
              <Typography align="center" color="textSecondary">
                <em>&ldquo;{review}&rdquo;</em>
              </Typography>
              <Typography align="right">
                &mdash;&nbsp;
                <span>{customer_name}</span>
              </Typography>
            </div>
          ))}
        </div>
        <div>
          <IconButton
            aria-label="previous review"
            onClick={handlePrevReview}
            disabled={!currentReview}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            aria-label="next review"
            onClick={handleNextReview}
            disabled={currentReview >= reviews.length - 1}
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </div>
    </section>
  )
}

export default Reviews
