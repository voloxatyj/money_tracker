import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types";

const initialState = {
  info: {},
  authenticated: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        info: action.payload,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    default:
      return state;
  }
}
