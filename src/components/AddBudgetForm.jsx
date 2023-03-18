import { CurrencyRupeeIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useRef } from "react";
import { Form, useFetcher } from "react-router-dom";
const AddBudgetForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      inputRef.current.focus();
    }
  }, [isSubmitting]);
  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>

      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="mewBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            ref={inputRef}
            required
          />
        </div>
        <input type="hidden" name="_action" value="newBudget" />
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="amount"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="Rs 2000"
            required
            inputMode="decimal"
          />
        </div>
        <button className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Creating Budget..</span>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyRupeeIcon />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
