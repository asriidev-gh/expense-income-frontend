import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createCategory } from "../../actions/categories/categories";

const AddCategory = () => {
  const initialState = {
    id: null,
    name: "",
  };
  const [categoryItem, setCategoryItem] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCategoryItem({ ...categoryItem, [name]: value });
  };

  const saveCategory = () => {
    const { name } = categoryItem;

    dispatch(createCategory(name))
      .then(data => {
        setCategoryItem({
          id: data.id,
          name: data.name
        });
        setSubmitted(true);

        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newCategory = () => {
    setCategoryItem(initialState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newCategory}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required 
              value={categoryItem.name}
              onChange={handleInputChange}
              name="name"
            />
          </div>

          <button onClick={saveCategory} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddCategory;
