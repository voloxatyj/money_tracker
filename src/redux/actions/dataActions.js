import { LOADING_DATA, SET_ERRORS } from "../types";
import axios from "axios";

export const getData = () => dispatch => {
	axios
    .get("/items")
    .then((res) => {
      dispatch({
        type: LOADING_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
}

export const addItem = item => dispatch => {
  axios
    .post('/item')
    .then((res) => {
      dispatch({
        type: LOADING_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
}

export const updateItem = item => dispatch => {
  axios
    .post(`/item/${item.itemId}`)
    .then((res) => {
      dispatch({
        type: LOADING_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
}