import { toast } from "react-toastify"
import { deleteItem, getAllMatchingItems } from "../helper"
import { redirect } from "react-router-dom"

export const deleteBudget = ({params}) => {
    try {
        deleteItem({
            key : "budgets",
            id : params.id
        })
        const budgetExpenses = getAllMatchingItems({
            category : "expenses",
            key : "budgetId",
            value : params.id
        })

        budgetExpenses.forEach(expenses => {
            deleteItem({
                key : "expenses",
                id : expenses.id
            })
        });

        toast.success("Budget deleted!")
    } catch (err){
        throw new Error("There was a problem deleting your budget")
    }
    return redirect('/')
}