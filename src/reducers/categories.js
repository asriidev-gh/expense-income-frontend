import {
    CREATE_CATEGORY,
    RETRIEVE_CATEGORIES,
    UPDATE_CATEGORY,
    DELETE_CATEGORY,
    DELETE_ALL_CATEGORIES,
  } from "../actions/categories/types";
  
  const initialState = [];
  
  const categoryReducer = (categories = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_CATEGORY:
        return [...categories, payload];
  
      case RETRIEVE_CATEGORIES:
        return payload;
  
      case UPDATE_CATEGORY:
        return categories.map((categoryItem) => {
          if (categoryItem.id === payload.id) {
            return {
              ...categoryItem,
              ...payload,
            };
          } else {
            return categoryItem;
          }
        });
  
      case DELETE_CATEGORY:
        return categories.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_CATEGORIES:
        return [];
  
      default:
        return categories;
    }
  };
  
  export default categoryReducer;