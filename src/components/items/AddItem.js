import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createItem } from "../../actions/items/items";
import { retrieveCategories } from "../../actions/categories/categories";

const AddItem = () => {
  const initialState = {
    id: null,
    amount: "",
    date: "",
    description: "",
    categoryId: ""
  };
  const [item, setItem] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories);

  useEffect(() => {
    dispatch(retrieveCategories());
  }, [dispatch]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  const saveItem = () => {
    const { amount, description, date, categoryId } = item;

    dispatch(createItem(amount, description, date, categoryId))
      .then(data => {
        setItem({
          id: data.id,
          amount: data.amount,
          description: data.description,
          categoryId: data.categoryId
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newItem = () => {
    setItem(initialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newItem}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              className="form-control"
              id="amount"
              required
              value={item.amount}
              onChange={handleInputChange}
              name="amount"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              required
              value={item.date}
              onChange={handleInputChange}
              name="date"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={item.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select className="form-control" name="categoryId" onChange={handleInputChange}>
              <option value="">Select Category</option>
              {categories && categories.map((category) => {
                return (<><option value={category.id}>{category.name}</option></>)
              })}
            </select>
          </div>

          <button onClick={saveItem} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddItem;
