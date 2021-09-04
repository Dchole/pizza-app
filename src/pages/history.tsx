import clsx from "clsx"
import timeAge from "time-age"
import { useEffect, useState } from "react"
import { createStyles, makeStyles } from "@material-ui/core/styles"
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
import ProductList from "@/components/ProductList"
import useScreenSize from "@/hooks/usScreenSize"
import PageLoader from "@/components/PageLoader"
import firebase from "@/lib/firebase"
import { useUser } from "@/components/UserContext"

const useStyles = makeStyles(theme =>
  createStyles({
    wordWrap: {
      whiteSpace: "nowrap"
    },
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
  "Transaction ID": string
  "Product Name": string
  Amount: number
  Date: string
}

const History = () => {
  const classes = useStyles()
  const desktop = useScreenSize()
  const { user } = useUser()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(true)
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await firebase
          .firestore()
          .collection(`users/${user?.uid}/transactions`)
          .get()

        const transactions = res.docs.map(transaction => {
          const data = transaction.data()

          return {
            "Transaction ID": transaction.id,
            "Product Name": data.products,
            Amount: data.amount.toFixed(2),
            Date: timeAge(data.createdAt)
          }
        })

        setTransactions(transactions)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    })()
  }, [user?.uid])

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
      {loading ? (
        <PageLoader />
      ) : !transactions?.length ? (
        <Typography variant="h3" component="h1">
          No transactions yet
        </Typography>
      ) : (
        <Container maxWidth="md" disableGutters={!desktop}>
          <Paper>
            <Toolbar>
              <Typography variant="h4" component="h1" align="center">
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
                        className={clsx(classes.wordWrap, classes.th)}
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
                            className={classes.wordWrap}
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
