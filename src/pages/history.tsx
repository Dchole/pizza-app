import timeAge from "time-age"
import { useMemo, useState } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
import CircularProgress from "@material-ui/core/CircularProgress"
import Container from "@material-ui/core/Container"
import Paper from "@material-ui/core/Paper"
import PageBackdrop from "@/components/PageBackdrop"
import Table from "@material-ui/core/Table"
import TableRow from "@material-ui/core/TableRow"
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableFooter from "@material-ui/core/TableFooter"
import TableContainer from "@material-ui/core/TableContainer"
import TablePagination from "@material-ui/core/TablePagination"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import useSWR from "swr"
import ProductList from "@/components/ProductList"

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

  const { data, isValidating } = useSWR<ITransaction[]>("/api/transactions")
  const transactions = useMemo(
    () =>
      data?.map(transaction => ({
        "Transaction ID": transaction.transactionID,
        "Product Name": transaction.products,
        Amount: transaction.amount.toFixed(2),
        Date: timeAge(transaction.createdAt)
      })),
    [data]
  )

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(event.target.value)
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <PageBackdrop>
      {isValidating && !transactions ? (
        <CircularProgress />
      ) : (
        <Container component="main" maxWidth="md">
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
                    {Object.keys(transactions[0]).map((key, index, arr) => (
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
                  {transactions.map(transaction => (
                    <TableRow key={transaction["transaction id"]}>
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
              count={transactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Container>
      )}
    </PageBackdrop>
  )
}

export default History
