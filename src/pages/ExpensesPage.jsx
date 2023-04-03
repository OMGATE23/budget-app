import React from "react";
import { useLoaderData } from "react-router-dom";
import { fetchData , deleteItem } from "../helper";
import Table from "../components/Table";
import { toast } from "react-toastify";

export function expensesLoader() {
  const expenses = JSON.parse(fetchData("expenses"));
  return { expenses };
}

export async function expensesAction({ request }) {
    const data = await request.formData();
  const actionType = data.get("_action");
  if (actionType === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: data.get("expenseId"),
      });
      return toast.success("Expense deleted!");
    } catch (err) {
      throw new Error("There was a problem deleting your expense");
    }
  }
}
const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table expenses={expenses}></Table>
        </div>
      ) : (
        <p>No expenses to show {":("} </p>
      )}
    </div>
  );
};

export default ExpensesPage;
