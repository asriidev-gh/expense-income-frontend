import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  retrieveCategories,
  findCategoriesByCategory,
} from "../../actions/categories/categories";
import { Link } from "react-router-dom";

const CategoriesList = () => {
  const [currentCategory, setCurrentCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchCategory, setSearchCategory] = useState("");

  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveCategories());
  }, [dispatch]);

  const onChangeSearchCategory = e => {
    const searchCategory = e.target.value;
    setSearchCategory(searchCategory);
  };

  const refreshData = () => {
    setCurrentCategory(null);
    setCurrentIndex(-1);
  };

  const setActiveCategory = (item, index) => {
    setCurrentCategory(item);
    setCurrentIndex(index);
  };

  const findByCategory = () => {
    refreshData();
    dispatch(findCategoriesByCategory(searchCategory));
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
            <Link to={"/addCategory"} className="btn btn-sm btn-primary">
              Add Category
            </Link>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by category"
            value={searchCategory}
            onChange={onChangeSearchCategory}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByCategory}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Categories List</h4>

        <ul className="list-group">
          {categories &&
            categories.map((category, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveCategory(category, index)}
                key={index}
              >
                {category.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentCategory && (
          <div>
            <h4>Categories</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentCategory.name}
            </div>

            <Link
              to={"/categories/" + currentCategory.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
