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
import { useMemo } from "react"
import { formatTime } from "@/utils/format-time"

interface ITransaction {
  _id: string
  transactionID: string
  products: string[]
  amount: number
  createdAt: string
}

const History = () => {
  const { data, isValidating } = useSWR<ITransaction[]>("/api/transactions")
  const transactions = useMemo(
    () =>
      data?.map(transaction => ({
        "Transaction ID": transaction.transactionID,
        "Product Name": transaction.products,
        Amount: transaction.amount.toFixed(2),
        Date: formatTime(transaction.createdAt)
      })),
    [data]
  )

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
                          key={item.toString()}
                          align={index === arr.length - 1 ? "right" : "left"}
                        >
                          {index === 2 ? <span>&#8373; {item}</span> : item}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  {/* <TablePagination rowsPerPageOptions={[10, 50]} /> */}
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      )}
    </PageBackdrop>
  )
}

export default History
