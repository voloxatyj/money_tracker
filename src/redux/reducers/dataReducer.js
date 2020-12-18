import {
  LOADING_DATA,
  SET_ITEM,
  ADD_ITEM,
  CLOSE_ITEM,
  OPEN_ITEM,
  UPDATE_DATA,
  DELETE_ITEM,
  FILTER_DATA,
} from "../types";
import categoryURL from "../../utils/categoryURL";

const initialState = {
  data: [],
  credentials: {},
  openView: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        data: action.payload.filter((item) => !item.email),
      };
    case UPDATE_DATA:
      const index = state.data.findIndex(
        (item) => item.itemId === action.payload.itemId
      );
      if (index === -1) {
        state.data.push(action.payload);
      } else {
        state.data[index] = action.payload;
      }
      return {
        ...state,
        credentials: action.payload,
        openView: false,
      };
    case FILTER_DATA:
      const newData = state.data.filter((item) =>
        item.description.toLowerCase().startsWith(action.payload)
      );
      return {
        ...state,
        data: newData,
      };
    case SET_ITEM:
      return {
        ...state,
        credentials: action.payload,
      };
    case ADD_ITEM:
      return {
        ...state,
        credentials: {
          description: "",
          category: categoryURL[0].title,
          imageUrl: categoryURL[0].url,
          price: "",
          profit: false,
          createdAt: Date.now(),
        },
        openView: action.payload,
      };
    case OPEN_ITEM:
      return {
        ...state,
        openView: true,
      };
    case CLOSE_ITEM:
      return {
        ...state,
        openView: false,
      };
    case DELETE_ITEM:
      const result = state.data.filter(
        (item) => item.itemId !== action.payload
      );
      return {
        ...state,
        data: result,
      };
    default:
      return state;
  }
}
