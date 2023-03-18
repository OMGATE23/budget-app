import React from "react";
import { useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import Intro from "../components/Intro";
import { createNewBudget, fetchData } from "../helper";

export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  return { userName, budgets };
}

export async function dashboardAction({ request }) {
  const data = await request.formData();
  console.log("hi");
  const actionType = data.get("_action")

  if(actionType === "newUser"){
    try {
      const userName = data.get("_userName")
      localStorage.setItem("userName", userName);
      return toast.success(`Welcome, ${userName}!`);
    } catch (err) {
      return toast.error("Log in Failed");
    }
  }

  if(actionType === "newBudget"){
    console.log(data)
    const name = data.get("newBudget")
    const amount = data.get("newBudgetAmount")
    console.log({name, amount})

    try{
      createNewBudget({name , amount})
      return toast.success('Budget created')
    } catch(err){
      throw new Error("Uh oh! A problem occured while creating budget")
    }


  }
  
}
const Dashboard = () => {
  const { userName, budgets } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>

          <div className="grid-sm">
            {/* {budgets ? () : ()} */}
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm/>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
