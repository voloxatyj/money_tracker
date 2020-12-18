import {
  CLEAR_ERRORS,
  LOADING_UI,
  SET_ERRORS,
  STOP_LOADING_UI,
} from "../types";

const initialState = {
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_ERRORS:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: {},
      };
    case LOADING_UI:
      return {
        ...state,
        loading: true,
        error: {},
      };
    case STOP_LOADING_UI:
      return {
        ...state,
        loading: false,
        error: {},
      };
    default:
      return state;
  }
}
