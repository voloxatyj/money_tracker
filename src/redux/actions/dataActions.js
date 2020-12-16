import { LOADING_DATA, SET_ITEM, UPDATE_DATA } from "../types";
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
    .then(res => {
      dispatch({
        type: LOADING_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
}

export const updateItem = (item, itemId) => dispatch => {
  axios
    .post(`/item/${itemId}`, item)
    .then(res => {
      dispatch({
        type: UPDATE_DATA,
        payload: res.data,
      });
      dispatch({
        type: SET_ITEM,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
}