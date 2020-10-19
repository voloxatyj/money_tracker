import { LOADING_DATA } from "../types";

const initialState = {
  data: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        data: action.payload.filter(item=>!item.email),
      };
    default:
      return state;
  }
}
