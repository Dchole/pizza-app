import Image from "next/image"
import Typography from "@material-ui/core/Typography"
import ButtonBase from "@material-ui/core/ButtonBase"
import { Query } from "@/graphql/generated"

interface IPopularProps {
  pizzas: Query["pizzas"]
}

const loader = ({ src }: { src: string; width: number; quality: number }) =>
  `http://localhost:1337${src}`

const Popular: React.FC<IPopularProps> = ({ pizzas }) => {
  console.log({ pizzas })
  return (
    <section>
      <Typography variant="h2">Customer Favourites</Typography>
      <Typography variant="body1" color="textSecondary">
        Most purchased pizzas from our customers
      </Typography>
      <div>
        {pizzas.map(pizza => (
          <ButtonBase key={pizza.id}>
            <Image
              loader={loader}
              src={pizza.image.formats.small.url}
              alt={pizza.name}
              width={300}
              height={240}
            />
            <Typography align="center">{pizza.name}</Typography>
            <Typography align="center" variant="body2">
              {pizza.price}
            </Typography>
          </ButtonBase>
        ))}
      </div>
    </section>
  )
}

export default Popular
