import { LOADING_DATA, SET_ITEM } from "../types";

const initialState = {
  data: [],
  credentials: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        data: action.payload.filter(item=>!item.email),
      };
    case SET_ITEM: 
    console.log('OUTPUT: action.payload', action.payload)
      return {
        ...state,
        credentials: action.payload
      }
    default:
      return state;
  }
}
