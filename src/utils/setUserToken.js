import axios from "axios";
import jwt from "jsonwebtoken";
import { logOutUser, getUser } from "../redux/actions/userActions";
import { getData } from "../redux/actions/dataActions";
import store from "../redux/store";

export const setUserToken = () => {
  // axios.defaults.baseURL = `${process.env.REACT_APP_PRODUCTION_URL}`
  axios.defaults.baseURL = `${process.env.REACT_APP_DEVELOPMENT_URL}`;
  const token = localStorage.getItem("DBAuthToken") || null;
  try {
    if (token) {
      const decodedToken = jwt.decode(token.split(" ")[1]);
      if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logOutUser());
        window.location.href = "/authform";
      }
      axios.defaults.headers.common["Authorization"] = token;
      store.dispatch(getUser());
      store.dispatch(getData());
    }
  } catch (error) {
    console.log(error);
  }
};
