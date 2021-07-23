import timeAge from "time-age"
import { useMemo, useState } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import Table from "@material-ui/core/Table"
import TableRow from "@material-ui/core/TableRow"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TablePagination from "@material-ui/core/TablePagination"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import useSWR from "swr"
import ProductList from "@/components/ProductList"
import useScreenSize from "@/hooks/usScreenSize"

const useStyles = makeStyles(theme =>
  createStyles({
    th: {
      fontFamily: theme.typography.h1.fontFamily,
      fontWeight: 600
    },
    tfoot: {
      alignItems: "center"
    }
  })
)

interface ITransaction {
  _id: string
  transactionID: string
  products: string[]
  amount: number
  createdAt: string
}

const History = () => {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const desktop = useScreenSize()

  const { data, isValidating } = useSWR<ITransaction[]>("/api/transactions")

  const [fields, transactions] = useMemo(() => {
    const fields = ["Transaction ID", "Product Name", "Amount", "Date"]

    const transactions = data?.map(transaction => ({
      "Transaction ID": transaction.transactionID,
      "Product Name": transaction.products,
      Amount: transaction.amount.toFixed(2),
      Date: timeAge(transaction.createdAt)
    }))

    return [fields, transactions]
  }, [data])

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <main id="transaction-history">
      {isValidating && !transactions ? (
        <CircularProgress />
      ) : (
        <Container maxWidth="md" disableGutters={desktop}>
          <Paper>
            <Toolbar>
              <Typography variant="h3" component="h1" align="center">
                Transaction history
              </Typography>
            </Toolbar>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    {fields.map((key, index, arr) => (
                      <TableCell
                        key={key}
                        className={classes.th}
                        align={index === arr.length - 1 ? "right" : "left"}
                      >
                        {key}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map(transaction => (
                      <TableRow key={transaction["Transaction ID"]}>
                        {Object.values(transaction).map((item, index, arr) => (
                          <TableCell
                            size="small"
                            key={item.toString()}
                            align={index === arr.length - 1 ? "right" : "left"}
                          >
                            {index === 1 ? (
                              <ProductList products={item as string[]} />
                            ) : index === 2 ? (
                              <span>&#8373; {item}</span>
                            ) : (
                              item
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={Number(transactions?.length)}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      )}
    </main>
  )
}

export default History
