import { LOADING_DATA, UPDATE_DATA, DELETE_ITEM } from "../types";
import axios from "axios";

export const getData = () => (dispatch) => {
  axios
    .get("/items")
    .then((res) => {
      dispatch({
        type: LOADING_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const addItem = (item) => (dispatch) => {
  axios
    .post("/item", item)
    .then((res) => {
      dispatch({
        type: UPDATE_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const updateItem = (item, itemId) => (dispatch) => {
  axios
    .post(`/item/${itemId}`, item)
    .then((res) => {
      dispatch({
        type: UPDATE_DATA,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteItem = (itemId) => (dispatch) => {
  axios
    .delete(`/item/${itemId}`)
    .then(() => {
      dispatch({
        type: DELETE_ITEM,
        payload: itemId,
      });
    })
    .catch((err) => console.log(err));
};
