export function fetchData(key){
    return localStorage.getItem(key)
}

export function deleteItem({key}){
    return localStorage.removeItem(key)
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

function generateRandomColor(){
    let existingBudgetLength = JSON.parse(fetchData('budgets'))?.length ?? 0;
    return `${existingBudgetLength * 34} 65% 50%`
}