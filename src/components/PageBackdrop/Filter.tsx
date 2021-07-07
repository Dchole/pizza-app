import { createStyles, makeStyles } from "@material-ui/core"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import IconButton from "@material-ui/core/IconButton"
import InputAdornment from "@material-ui/core/InputAdornment"
import SearchIcon from "@material-ui/icons/Search"
import useAutocomplete from "@material-ui/lab/useAutocomplete"
import { IPizzaProps } from "../Popular"
import { useMemo, useState } from "react"

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      padding: theme.spacing(0, 1)
    },
    input: {
      backgroundColor: "#fffc"
    },
    itemText: {
      fontSize: theme.typography.h4.fontSize,
      fontFamily: theme.typography.h1.fontFamily,
      fontWeight: 500
    },
    item: {
      padding: theme.spacing(2, 1)
    },
    listPadding: {
      padding: theme.spacing(3, 1, 0)
    }
  })
)

interface IFilterProps extends IPizzaProps {
  handleClose: () => void
}

const Filter: React.FC<IFilterProps> = ({ pizzas, handleClose }) => {
  const classes = useStyles()

  const {
    value,
    groupedOptions,
    getOptionProps,
    getInputProps,
    getListboxProps
  } = useAutocomplete({
    id: "pizza-autocomplete",
    options: pizzas,
    getOptionLabel: option => option.name
  })

  useMemo(() => value && handleClose(), [value, handleClose])

  return (
    <aside className={classes.root}>
      <OutlinedInput
        id="search-input"
        name="search"
        type="search"
        placeholder="Search Pizza"
        classes={{ input: classes.input }}
        inputProps={{ "aria-label": "Search pizza" }}
        fullWidth
        {...getInputProps()}
      />
      {groupedOptions.length > 0 && (
        <List {...getListboxProps()} classes={{ padding: classes.listPadding }}>
          {groupedOptions.map((option, index) => (
            <ListItem
              {...getOptionProps({ option, index })}
              key={option.id}
              className={classes.item}
            >
              <span className={classes.itemText}>{option.name}</span>
            </ListItem>
          ))}
        </List>
      )}
    </aside>
  )
}

export default Filter
