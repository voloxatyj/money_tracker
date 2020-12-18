import React, { useState, Fragment, useEffect } from "react";
import { Button } from "../components/layouts/Button";
import { Link } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Calendar } from "react-date-range";
import moment from "moment";
import categoryURL from "../utils/categoryURL";
import { CLOSE_ITEM, OPEN_ITEM } from "../redux/types";
import { addItem, updateItem } from "../redux/actions/dataActions";
// Redux
import { useSelector, useDispatch } from "react-redux";
// Material UI stuff
import {
  makeStyles,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  MenuItem,
  FormControl,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  container: {
    display: "grid",
    justifyContent: "center",
  },
  input: {
    background: "#eee",
    padding: "12px 15px",
    margin: "8px 0",
    border: "2px solid var(--third-color)",
    borderRadius: "5px",
    maxHeight: "5vh",
    fontFamily: ["Architects Daughter", "cursive"].join(","),
  },
  inputImg: {
    padding: "12px 15px",
    margin: "8px 0",
    border: "2px solid var(--third-color)",
    borderRadius: "5px",
  },
  title: {
    backgroundColor: "var(--background)",
    "&>h2": {
      fontFamily: ["Architects Daughter", "cursive"].join(","),
      fontSize: "1.7rem",
      letterSpacing: ".9em",
      textAlign: "center",
    },
  },
  menu: {
    fontFamily: ["Architects Daughter", "cursive"].join(","),
    background: "var(--background)",
    color: "var(--third-color)",
  },
});

export default function InformCard() {
  const classes = useStyles();
  const credentials = useSelector((state) => state.data.credentials);
  const openView = useSelector((state) => state.data.openView);
  const itemId = useSelector((state) => state.data.credentials.itemId);
  const dispatch = useDispatch();
  const [openCalendar, setOpenCalendar] = useState(false);

  const [form, setForm] = useState({
    description: credentials.description,
    category: credentials.category,
    createdAt: credentials.createdAt,
    imageUrl: credentials.imageUrl,
    profit: credentials.profit,
    price: credentials.price,
  });

  useEffect(() => {
    setForm({
      description: credentials.description,
      category: credentials.category,
      createdAt: credentials.createdAt,
      imageUrl: credentials.imageUrl,
      profit: credentials.profit,
      price: credentials.price,
    });
  }, [credentials]);

  return (
    credentials.length !== 0 && (
      <Fragment>
        <Link
          to="#"
          onClick={() => dispatch({ type: OPEN_ITEM })}
          className="animate__animated animate__flipInX animate__delay-.5s"
        >
          <i className="fas fa-info fa-2x"></i>
        </Link>
        <Dialog
          open={openView}
          onClose={() => dispatch({ type: CLOSE_ITEM })}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle className={classes.title}>Information</DialogTitle>
          <DialogContent
            style={{
              backgroundColor: "var(--background)",
              margin: ".3rem",
              borderRadius: "20px",
            }}
          >
            <FormControl className={classes.container}>
              <section className="form-field">
                <h3>description</h3>
                <input
                  type="text"
                  value={form.description}
                  name="description"
                  className={classes.input}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      [event.target.name]: event.target.value,
                    })
                  }
                />
              </section>
              <section className="form-field">
                <h3>category</h3>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={form.category}
                  name="category"
                  onChange={(event) =>
                    setForm({
                      ...form,
                      [event.target.name]: event.target.value,
                    })
                  }
                  label="Age"
                  className={classes.input}
                >
                  {categoryURL
                    .filter((item) => item.title === form.category)
                    .map((item) => (
                      <MenuItem
                        className={classes.menu}
                        key={item.title}
                        value={form.category}
                      >
                        <div className="select-menu">
                          <p>{form.category}</p>
                          <img
                            className="select-images"
                            src={item.url}
                            alt="icons"
                          />
                        </div>
                      </MenuItem>
                    ))}
                  {categoryURL
                    .filter((item) => item.title !== form.category)
                    .map((item) => (
                      <MenuItem
                        className={classes.menu}
                        key={item.title}
                        value={item.title}
                      >
                        <div className="select-menu">
                          <p>{item.title}</p>
                          <img
                            className="select-images"
                            src={item.url}
                            alt="icons"
                          />
                        </div>
                      </MenuItem>
                    ))}
                </Select>
              </section>
              <section className="form-field">
                <h3>date</h3>
                <div onClick={() => setOpenCalendar(true)}>
                  <input
                    type="text"
                    value={moment(form.createdAt).format("dddd MMM Do")}
                    className={classes.input}
                    name="createdAt"
                    disabled
                    style={{ cursor: "pointer" }}
                  />
                </div>
                <Dialog
                  open={openCalendar}
                  onClose={() => setOpenCalendar(false)}
                  fullWidth
                  maxWidth="sm"
                  style={{ display: "flex", justifyContent: "end" }}
                >
                  <DialogContent>
                    <Calendar
                      date={moment.utc(form.createdAt).toDate()}
                      onChange={(event) =>
                        setForm({ ...form, createdAt: event })
                      }
                    />
                  </DialogContent>
                </Dialog>
              </section>
              <section className="form-field">
                <h3>image</h3>
                <input
                  type="image"
                  alt="avatar"
                  name="imageUrl"
                  src={form.imageUrl}
                  className={classes.inputImg}
                  disabled
                  style={{ cursor: "pointer" }}
                />
              </section>
              <section className="form-field" name="price">
                <h3>price</h3>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  className={classes.input}
                  onChange={(event) =>
                    setForm({
                      ...form,
                      [event.target.name]: event.target.value,
                    })
                  }
                />
              </section>
              <section className="form-field" name="profit">
                <h3>profit</h3>
                <input
                  type="checkbox"
                  className="profit"
                  onChange={(event) =>
                    setForm({ ...form, [event.target.name]: !form.profit })
                  }
                />
              </section>
            </FormControl>
          </DialogContent>
          <DialogActions style={{ backgroundColor: "var(--background)" }}>
            <Button
              onClick={() => dispatch({ type: CLOSE_ITEM })}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (itemId === undefined) {
                  setForm({
                    ...form,
                    createdAt: Date.parse(form.createdAt) / 1000,
                  });
                  dispatch(addItem(form));
                } else {
                  dispatch(updateItem(form, itemId));
                }
              }}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  );
}
