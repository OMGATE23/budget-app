import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import React from "react";
import { Form } from "react-router-dom";
const AddBudgetForm = () => {
  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>

      <Form method="post" className="grid-sm">
        <div className="grid-xs">
          <label htmlFor="mewBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
          />
        </div>
        <input type = "hidden" name = "_action" value = "newBudget"/>
        <div className="grid-xs"> 
            <label htmlFor="newBudgetAmount">Amount</label>
            <input
                type = "amount"
                step = "0.01"
                name = "newBudgetAmount"
                id = "newBudgetAmount"
                placeholder="Rs 2000"
                required
                inputMode="decimal"
            />
        </div>
        <button className="btn btn--dark">
            <span>Create Budget</span>
            <CurrencyRupeeIcon/>
        </button>
      </Form>
    </div>
  );
};

export default AddBudgetForm;
