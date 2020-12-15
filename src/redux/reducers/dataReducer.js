import { LOADING_DATA, SET_ITEM, ADD_ITEM, CLOSE_ITEM, OPEN_ITEM } from "../types";

const initialState = {
  data: [],
  credentials: [],
  openView: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        data: action.payload.filter(item=>!item.email),
      };
    case SET_ITEM: 
      return {
        ...state,
        credentials: action.payload
      }
    case ADD_ITEM: 
      return {
        ...state,
        credentials: action.payload.createdAt,
        openView: action.payload.open
      }
    case OPEN_ITEM: 
      return {
        ...state,
        openView: true
      }
    case CLOSE_ITEM: 
      return {
        ...state,
        openView: false
      }
    default:
      return state;
  }
}
