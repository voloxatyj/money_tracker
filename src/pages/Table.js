import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_ITEM } from '../redux/types'
import moment from 'moment'
import { Button } from '../components/layouts/Button'
import { 
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  AppBar,
  Toolbar,
  Typography,
  InputBase
 } from "@material-ui/core";
import { Link } from 'react-router-dom';
import Informcard from '../components/InformCard'

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: ".5rem",
    display: "grid",
    justifyContent: "space-around",
  },
  container: {
    height: "100%",
    minWidth: "90vw",
    fontFamily: ["Architects Daughter", "cursive"].join(","),
    fontSize: "1.1rem",
  },
  bar: {
    backgroundColor: "var(--background)",
    margin: "1.5rem",
    width: "95vw",
    minHeight: "5rem",
    display: "inline-flex",
    justifyContent: "center",
  },
  button: {
    color: "whitesmoke",
    alignItems: "center",
    padding: "1rem",
    marginLeft: "2rem",
  },
  balance: {
    color: "var(--main-color)",
    fontFamily: ["Architects Daughter", "cursive"].join(","),
  },
  toolbar: {
    display: "inline-flex",
    justifyContent: "space-between",
  },
  search: {
    display: "inline-flex",
    justifyContent: "start",
    alignItems: "center",
    width: "50%",
  },
  input: {
    display: "inline-flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "60%",
    marginLeft: "1rem",
  },
  inputInput: {
    border: "2px solid var(--main-color)",
    borderRadius: "20px",
    background: "white",
    padding: ".5rem",
  },
  inputRoot: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    fontFamily: ["Architects Daughter", "cursive"].join(","),
    fontSize: "1.1rem",
  },
  cell: {
    fontFamily: ["Architects Daughter", "cursive"].join(","),
    fontSize: "1.1rem",
  },
  row: {
    cursor: "pointer", 
    transition: "transform ease-in-out .3s",
    "&:hover": {
      boxShadow: "inset 4px 4px 6px -1px rgba(0,0,0,0.2)",
      border: "1px solid var(--second-color)",
      transform: "scale(.97) translateY(2px)",
      borderRadius: "10px"
    },
    '&:nth-child(even)': {
      backgroundColor: "var(--background)"
    }
  },
  tableImg: {
    width: "75px",
    borderRadius: "15px",
    border: "1px solid var(--third-color)"
  },
  headTable: {
    fontFamily: ["Architects Daughter", "cursive"].join(","),
    fontSize: "1.5rem",
    backgroundColor: 'var(--background)',
    color: 'var(--main-color)'
  },
  addTable: {
    backgroundColor: 'var(--background)'
  },
  input: {
    width: "60%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export const StickyHeadTable = () => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const state = useSelector(state => state.data.data)
  const [id, setId] = useState(null)
  const [toolBtn, setToolBtn] = useState(false)
  const dispatch = useDispatch()

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function* formatDate(state) {
  yield state.map(item=>item.createdAt=moment(item.createdAt).format("DD/MM/YYYY"))
  yield state.map(item=>item.createdAt=moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss"))
  yield state.map(item=>item.createdAt=moment(item.createdAt).format("dddd of MMMM"))
  yield state.map(item=>item.createdAt=moment(item.createdAt).fromNow())
}

  return (
    <>
      <AppBar position="static" className={classes.bar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.search}>
            <Button className={classes.button}>
              Add
              <i
                className="fas fa-plus-circle"
                style={{ marginLeft: ".5rem" }}
              />
            </Button>
            <div className={classes.input}>
              <i
                className="fas fa-search-dollar fa-2x"
                style={{ color: "var(--main-color)" }}
              />
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
          <Typography className={classes.balance} variant="h5" noWrap>
            balance:
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {['description', 'category', 'date', 'image', 'cost'].map((item, index) => (
                  <TableCell
                    key={index}
                    align="left"
                    style={{ minWidth: 170 }}
                    className={classes.headTable}
                    variant='head'
                  >
                    {item}
                  </TableCell>
                ))}
                <TableCell style={{backgroundColor: "var(--background)"}} className="tools">
                {toolBtn && <Informcard />}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {state
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(item => 
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={item.itemId}
                      data-id={item.itemId}
                      className={classes.row}
                      onClick={(e)=>{
                        setToolBtn(true)
                        setId(e.target.parentNode.getAttribute("data-id"))
                        dispatch({type: SET_ITEM, payload: item})
                      }}
                    >
                      <TableCell align="justify" className={classes.cell}>
                        {item.description}
                      </TableCell>
                      <TableCell align="left" className={classes.cell}>
                        {item.category}
                      </TableCell>
                      <TableCell align="left" className={classes.cell}>
                        {moment(item.createdAt).format('dddd MMM Do')}
                      </TableCell>
                      <TableCell align="left" className={classes.cell}>
                        <img src={item.imageUrl} alt="image" className={classes.tableImg} />
                      </TableCell>
                      <TableCell align="left" className={classes.cell} 
                        style={{color: item.profit?'var(--third-color)':'var(--second-color)', maxWidth: 100}}>
                        {item.price}
                      </TableCell>
                      <TableCell className="tools">
                        {toolBtn && id === item.itemId &&
                        <Link to="#" id="recycle" className="animate__animated animate__flipInX animate__delay-.5s">
                          <i className="fas fa-recycle fa-2x"></i>
                        </Link>}
                      </TableCell>
                    </TableRow>
                  )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={state.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}