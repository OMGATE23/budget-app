import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Intro from "../components/Intro";
import Table from "../components/Table";
import { createNewBudget, createNewExpense, fetchData , deleteItem } from "../helper";

export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = JSON.parse(fetchData("budgets"));
  const expenses = JSON.parse(fetchData('expenses'))
  return { userName, budgets , expenses };
}

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const actionType = data.get("_action");

  if (actionType === "newUser") {
    try {
      const userName = data.get("userName");
      localStorage.setItem("userName", userName);
      return toast.success(`Welcome, ${userName}!`);
    } catch (err) {
      return toast.error("Log in Failed");
    }
  }

  if (actionType === "newBudget") {
    const name = data.get("newBudget");
    const amount = data.get("newBudgetAmount");

    try {
      createNewBudget({ name, amount });
      return toast.success("Budget created");
    } catch (err) {
      throw new Error("Uh oh! A problem occured while creating budget");
    }
  }

  if (actionType === "createExpense") {
    try {
      const name = data.get("newExpense");
      const amount = data.get("newExpenseAmount");
      const budgetId = data.get("newExpenseBudget");
      
      createNewExpense({ name, amount, budgetId });
      return toast.success("Expense Created!");
    } catch (err) {
      throw new Error("Error occured during creating expense: ", err.message);
    }
  }

  if(actionType === "deleteExpense"){
    try {
      deleteItem({
        key : "expenses",
        id : data.get("expenseId")
      })
      return toast.success("Expense deleted!");
    } catch(err) {
      throw new Error("There was a problem deleting your expense")
    }
  }
}
const Dashboard = () => {
  const { userName, budgets , expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>

          <div className="grid-sm">
            {budgets ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2 >Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {
                  expenses && expenses.length > 0 && (
                    <div className="grid-md">
                      <h2>Recent Expenses</h2>
                        <Table expenses = {expenses.sort((a , b) => (b.createdAt - a.createdAt)).slice(0,8)} />
                        {expenses.length > 8 && (
                          <Link to = "expenses" className="btn btn--dark">View all expenses</Link>
                        )}
                    </div>
                  )
                }
              </div>
            ) : (
              <div className="grid-sm">
                <p>Create budgets to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
