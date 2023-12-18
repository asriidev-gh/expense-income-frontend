import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateCategory, deleteCategory } from "../../actions/categories/categories";
import CategoryDataService from "../../services/CategoryService";

const Category = (props) => {
  const initialCategoryState = {
    id: null,
    name: "",
  };
  const [currentCategory, setCurrentCategory] = useState(initialCategoryState);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const getCategory = id => {
    CategoryDataService.get(id)
      .then(response => {
        setCurrentCategory(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getCategory(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentCategory({ ...currentCategory, [name]: value });
  };

  const updateContent = () => {
    dispatch(updateCategory(currentCategory.id, currentCategory))
      .then(response => {
        console.log(response);

        setMessage("The category was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeCategory = () => {
    dispatch(deleteCategory(currentCategory.id))
      .then(() => {
        props.history.push("/categories");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentCategory && (
        <div className="edit-form">
          <h4>Category</h4>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={currentCategory.name}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={removeCategory}>
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
      )}
    </div>
  );
};

export default Category;
