import { combineReducers } from "redux";
import items from "./items";
import categories from "./categories";

export default combineReducers({
  items,
  categories,
});
