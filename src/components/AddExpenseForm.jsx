import React, { useRef , useEffect} from "react";
import { useFetcher } from "react-router-dom";

const AddExpenseForm = ({ budgets }) => {

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
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && budgets.map((budg) => budg.name)}
        </span>{" "}
      </h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense name: </label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="Eg: Chocolate etc."
              ref={inputRef}
              required
            />
          </div>

          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Expense Amount: </label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="Eg: 100Rs"
              ref={inputRef}
              required
            />
          </div>

          <div className="grid-xs" hidden={budgets.length === 1}>
            <label htmlFor="newExpenseBudget">Expense Budget: </label>
            <select name="newExpenseBudget" id="newExpenseBudget" required>
              {budgets
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((budget) => {
                  return (
                    <option key={budget.id} value={budget.id}>
                      {budget.name}
                    </option>
                  );
                })}
            </select>
          </div>

          <input hidden name="_action" defaultValue="createExpense" />
          <button className="btn btn--dark" disabled={isSubmitting}>
            {isSubmitting ? (
              <span>Creating Expense..</span>
            ) : (
              <>
                <span>Create Expense</span>
              </>
            )}
          </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
