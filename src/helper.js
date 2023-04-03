export function fetchData(key){
    return localStorage.getItem(key)
}

export function createNewBudget({name , amount}){
    const newItem = {
        id : crypto.randomUUID(),
        name : name,
        createdAt : Date.now(),
        amount : +amount,
        color : generateRandomColor()
    }

    const existingBudgets = JSON.parse(fetchData('budgets')) ?? [];
    return localStorage.setItem("budgets",
    JSON.stringify([...existingBudgets, newItem]))
}

export function createNewExpense({name , amount , budgetId}){
    const newItem = {
        id : crypto.randomUUID(),
        name : name,
        createdAt : Date.now(),
        amount : +amount,
        budgetId
    }

    const existingExpenses = JSON.parse(fetchData('expenses')) ?? [];
    return localStorage.setItem("expenses",
    JSON.stringify([...existingExpenses, newItem]))
}

function generateRandomColor(){
    let existingBudgetLength = JSON.parse(fetchData('budgets'))?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}