import http from "../http-common";

const getAll = () => {
  return http.get("/items");
};

const get = id => {
  return http.get(`/items/${id}`);
};

const create = data => {
  return http.post("/items", data);
};

const update = (id, data) => {
  return http.put(`/items/${id}`, data);
};

const remove = id => {
  return http.delete(`/items/${id}`);
};

const removeAll = () => {
  return http.delete(`/items`);
};

const ItemService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
};

export default ItemService;
