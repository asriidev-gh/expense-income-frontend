import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateItem, deleteItem } from "../../actions/items/items";
import ItemDataService from "../../services/ItemService";
import { retrieveCategories } from "../../actions/categories/categories";

const Item = (props) => {
  const initialItemState = {
    id: null,
    amount: "",
    date: "",
    description: "",
    categoryId: ""
  };
  const [currentItem, setCurrentItem] = useState(initialItemState);
  const [message, setMessage] = useState("");

  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveCategories());
  }, [dispatch])
  

  const getItem = id => {
    ItemDataService.get(id)
      .then(response => {
        setCurrentItem(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getItem(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  const updateContent = () => {
    dispatch(updateItem(currentItem.id, currentItem))
      .then(response => {
        console.log(response);

        setMessage("The item was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeItem = () => {
    dispatch(deleteItem(currentItem.id))
      .then(() => {
        props.history.push("/items");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentItem ? (
        <div className="edit-form">
          <h4>Item</h4>
          <form>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                name="amount"
                value={currentItem.amount}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentItem.description}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoryId">Category</label>
              {
                currentItem && 
                <select className="form-control" name="categoryId" onChange={handleInputChange}>
                  <option value="">Select Category</option>
                  {categories && categories.map((category) => {
                    return (<><option value={category.id} selected={category.id === currentItem.categoryId}>{category.name}</option></>)
                  })}
                </select>
              }
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={currentItem.date}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={removeItem}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateContent}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Item...</p>
        </div>
      )}
    </div>
  );
};

export default Item;
