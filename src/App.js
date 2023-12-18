import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddItem from "./components/items/AddItem";
import ItemsList from "./components/items/ItemsList";
import Item from "./components/items/Item";
import CategoriesList from "./components/categories/CategoriesList";
import Category from "./components/categories/Category";
import AddCategory from "./components/categories/AddCategory";
import { ExpenseIncomeGraph } from "./components/graph/ExpenseIncomeGraph";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/items" className="navbar-brand">
          ExpenseIncomeApp
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/items"} className="nav-link">
              Items
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/categories"} className="nav-link">
              Category
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/monthlygraph"} className="nav-link">
              Monthly Graph
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/items"]} component={ItemsList} />
          <Route path="/items/:id" component={Item} />
          <Route exact path="/add" component={AddItem} />

          <Route exact path={["/categories", "/categories"]} component={CategoriesList} />
          <Route path="/categories/:id" component={Category} />
          <Route exact path="/addCategory" component={AddCategory} />

          <Route exact path={["/monthlygraph", "/monthlygraph"]} component={ExpenseIncomeGraph} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
