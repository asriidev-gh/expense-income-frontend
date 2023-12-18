import {
  CREATE_ITEM,
  RETRIEVE_ITEMS,
  UPDATE_ITEM,
  DELETE_ITEM,
  DELETE_ALL_ITEMS,
} from "./types";

import ItemDataService from "../../services/ItemService";

export const createItem = (amount, description, date, categoryId) => async (dispatch) => {
  try {
    const res = await ItemDataService.create({ amount, description, date, categoryId });

    dispatch({
      type: CREATE_ITEM,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const retrieveItems = () => async (dispatch) => {
  try {
    const res = await ItemDataService.getAll();
    console.log('retrieveItems: ',res.data);
    dispatch({
      type: RETRIEVE_ITEMS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateItem = (id, data) => async (dispatch) => {
  try {
    const res = await ItemDataService.update(id, data);

    dispatch({
      type: UPDATE_ITEM,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteItem = (id) => async (dispatch) => {
  try {
    await ItemDataService.remove(id);

    dispatch({
      type: DELETE_ITEM,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllItems = () => async (dispatch) => {
  try {
    const res = await ItemDataService.removeAll();

    dispatch({
      type: DELETE_ALL_ITEMS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
