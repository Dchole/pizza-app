import Chip from "@material-ui/core/Chip"
import { createStyles, makeStyles } from "@material-ui/core/styles"

export const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  })
)

interface IProductListProps {
  products: string[]
}

const ProductList: React.FC<IProductListProps> = ({ products }) => {
  const classes = useStyles()

  return (
    <div className={classes.root} title={products.join(", ")}>
      {products.slice(0, 2).map(product => (
        <Chip key={product} label={product} />
      ))}
      {products.slice(2).length ? (
        <span>+{products.slice(2).length}</span>
      ) : null}
    </div>
  )
}

export default ProductList
