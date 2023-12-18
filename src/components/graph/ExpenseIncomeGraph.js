import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { retrieveCategories } from "../../actions/categories/categories";
import { useDispatch, useSelector } from "react-redux";
import { retrieveItems } from "../../actions/items/items";


// export const data = [
//   ["Year", "Income", "Expenses"],
//   ["Jan", 0, 0],
//   ["Feb", 0, 0],
//   ["March", 0, 0],
//   ["April", 0, 0],
// ];

export const options = {
  title: "Income/Expense",
  curveType: "function",
  legend: { position: "bottom" },
};

export function ExpenseIncomeGraph() {
  const [expenseIncomeData, setExpenseIncomeData] = useState([
    ["Year", "Income", "Expenses"],
    ["Jan", 0, 0],
    ["Feb", 0, 0],
    ["March", 0, 0],
    ["April", 0, 0],
]);

  const items = useSelector(state => state.items);
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(retrieveItems());
    dispatch(retrieveCategories());
  }, [dispatch]);

  const handleSelectChange = event => {
    const { value: selectedCategoryId } = event.target;
    const incomeExpenseItems = items.filter((item) => {
        if(Number(item.categoryId) === Number(selectedCategoryId)) {
            return item;
        }
    });

    const totals = {};
    incomeExpenseItems.forEach(item => {
        const amount = item.amount;
        const date = new Date(item.date);
        const month = date.toLocaleString('default', { month: 'short' });

        if (!totals[month]) {
            totals[month] = [0, 0];
        }

        if (amount >= 0) {
            totals[month][0] += amount; // Income
        } else {
            totals[month][1] += Math.abs(amount); // Expense
        }
    });

    const result = Object.keys(totals).map(month => [month, ...totals[month]]);
    setExpenseIncomeData([["Year", "Income", "Expenses"],...result]);
  };

  return (
    <>
        <div className="form-group">
            <label htmlFor="categoryId">Category</label>
            <select className="form-control" name="categoryId" onChange={handleSelectChange}>
              <option value="">Select Category</option>
              {categories && categories.map((category) => {
                return (<><option value={category.id}>{category.name}</option></>)
              })}
            </select>
        </div>
        <Chart
          chartType="LineChart"
          width="100%"
          height="400px"
          data={expenseIncomeData}
          options={options}
        />
    </>
    
  );
}